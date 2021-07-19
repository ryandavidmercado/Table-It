import { useState, useEffect } from "react";

import { listReservations } from "../utils/api";

import ReservationCard from "../reservations/ReservationCard";
import DateHandler from "./DateHandler";
import ErrorAlert from "../layout/ErrorAlert";

function Reservations({ date, updateAll }) {
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadReservations, [date, updateAll]);

  function loadReservations() {
    const abortController = new AbortController();
    setErr(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setErr);
    return () => abortController.abort();
  }

  return (
    <div>
      <div className="md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date}</h4>
      </div>
      <DateHandler date={date} />
      <ErrorAlert error={err} />
      <hr />
      {reservations.map(
        (reservation) =>
          reservation.status !== "finished" && (
            <ReservationCard
              key={reservation.reservation_id}
              reservation={reservation}
              setErr={setErr}
              refreshReservations={loadReservations}
            />
          )
      )}
    </div>
  );
}

export default Reservations;
