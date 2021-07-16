import { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Box, Grid, Text, Center, Divider } from "@chakra-ui/react";

function Tables({ updateAll, setUpdateAll, visible }) {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadTables, [updateAll]);

  function loadTables() {
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  function finishHandler(e) {
    const finish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (!finish) return;

    finishTable(e.target.getAttribute("data-table-id-finish"))
      .then(() => setUpdateAll((updateAll) => !updateAll))
      .catch(setErr);
  }

  const openSeats =
    tables.length &&
    tables.reduce(
      (acc, table) =>
        acc + (table.reservation_id === null ? table.capacity : 0),
      0
    );

  const seatColor = openSeats ? "green.500" : "red.500";

  const openTables = tables.filter(
    (table) => table.reservation_id === null
  ).length;

  const tableColor = openTables ? "green.500" : "red.500";

  return (
    <Grid
      overflowY="hidden"
      pt={["50px", "60px"]}
      templateRows="auto 1fr"
      display={visible ? "block" : "none"}
    >
      <Box py="15px" boxShadow="0px 2px 3px rgba(0,0,0,.2)" zIndex="2">
        <Center>
          <Text fontSize="1.2rem">Tables</Text>
        </Center>
        <Center mt="15px" mb="3px">
          {tables.length && (
            <>
              Open Seats:{" "}
              <Text color={seatColor} ml="3px" mr="15px" fontWeight="bold">
                {openSeats}
              </Text>
              Open Tables:{" "}
              <Text color={tableColor} ml="3px" fontWeight="bold">
                {openTables}
              </Text>
            </>
          )}
        </Center>
        <ErrorAlert error={err} />
      </Box>
    </Grid>
  );
  // return (
  //   <div>
  //     <ErrorAlert error={err} />
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th>Table Name</th>
  //           <th>Capacity</th>
  //           <th>Occupied?</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tables.map((table) => (
  //           <tr key={table.table_id}>
  //             <td>{table.table_name}</td>
  //             <td>{table.capacity}</td>
  //             <td data-table-id-status={table.table_id}>
  //               {table.reservation_id === null ? "Free" : "Occupied"}
  //             </td>
  //             <td>
  //               {table.reservation_id === null ? null : (
  //                 <button
  //                   data-table-id-finish={table.table_id}
  //                   onClick={finishHandler}
  //                 >
  //                   Finish
  //                 </button>
  //               )}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

export default Tables;
