import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [form, setForm] = useState({
    table_name: "",
    capacity: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    createTable({ ...form, capacity: Number(form.capacity) })
      .then(() => history.push("/dashboard"))
      .catch(setErr);
  };

  return (
    <div className="container">
      <h1>New Table</h1>
      <hr />
      <form onSubmit={handleSumbit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input
            type="text"
            name="table_name"
            className="form-control"
            minLength="2"
            value={form.table_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            className="form-control"
            value={form.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={history.goBack}
        >
          Cancel
        </button>
      </form>
      <ErrorAlert error={err} />
    </div>
  );
}

export default NewTable;
