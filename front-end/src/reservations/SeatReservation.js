import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { listTables, readReservation, seatReservation } from "../utils/api";
import { normalizeISODate } from "../utils/parse-dateTime";

import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "./ReservationCard";

function SeatReservation() {
  const [tableId, setTableId] = useState("none");
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [err, setErr] = useState(null);

  const history = useHistory();
  const { reservationId } = useParams();

  useEffect(loadTables, []);
  useEffect(loadReservation, [reservationId]);

  function loadTables() {
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  function loadReservation() {
    const abortController = new AbortController();
    readReservation(Number(reservationId), abortController.signal)
      .then(setReservation)
      .catch(setErr);
    return () => abortController.abort();
  }

  function validateTable() {
    const tableToSeat = tables.find(
      (table) => table.table_id === Number(tableId)
    );

    let err = null;

    if (!tableToSeat) err = "Please select a table to seat.";
    if (tableToSeat.reservation_id !== null) err = "Table is already occupied.";
    if (tableToSeat.capacity < reservation.people)
      err = `Cannot sit party of ${reservation.people} at table of ${tableToSeat.capacity}.`;

    if (err) {
      setErr({ message: err });
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateTable()) return;

    seatReservation(Number(reservationId), Number(tableId))
      .then(() =>
        history.push(
          `/dashboard?date=${normalizeISODate(reservation.reservation_date)}`
        )
      )
      .catch(setErr);
  }

  console.log(reservation);

  return (
    <div>
      {tables.length && reservation && (
        <div className="container">
          <h1>Seat Reservation</h1>
          <hr />
          <ReservationCard reservation={reservation} hideControls={true} />
          <ErrorAlert error={err} />
          <form onSubmit={handleSubmit}>
            <select
              name="table_id"
              className="form-control mb-2 mt-3"
              onChange={(e) => setTableId(e.target.value)}
              value={tableId}
              required
            >
              <option value="none" disabled hidden>
                Select a Table
              </option>
              {tables.map((table) => (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
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
        </div>
      )}
    </div>
  );
}

export default SeatReservation;
