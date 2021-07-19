import { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";

function Tables({ updateAll, setUpdateAll }) {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  const loadTables = () => {
    const abortController = new AbortController();
    setErr(null);

    const load = async () => {
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (e) {
        setErr(e);
      }
    };
    load();

    return () => abortController.abort();
  };
  useEffect(loadTables, [updateAll]);

  const finishHandler = (e) => {
    const finish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (!finish) return;

    const tableId = e.target.getAttribute("data-table-id-finish");
    const runFinish = async () => {
      try {
        await finishTable(tableId);
        setUpdateAll((updateAll) => !updateAll);
      } catch (e) {
        setErr(e);
      }
    };
    runFinish();
  };

  return (
    <div>
      <ErrorAlert error={err} />
      <div className="table-responsive">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Occupied?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, idx) => (
              <tr key={table.table_id}>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>
                  {table.reservation_id === null ? "Free" : "Occupied"}
                </td>
                <td>
                  {table.reservation_id === null ? null : (
                    <button
                      data-table-id-finish={table.table_id}
                      onClick={finishHandler}
                      className="btn btn-primary"
                    >
                      Finish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tables;
