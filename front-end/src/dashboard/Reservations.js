import { useState, useEffect } from "react";

import { listReservations } from "../utils/api";

import ReservationCard from "../reservations/ReservationCard";
import DateHandler from "./DateHandler";
import ErrorAlert from "../layout/ErrorAlert";

function Reservations({ date, updateAll }) {
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  const loadReservations = () => {
    const abortController = new AbortController();

    const load = async () => {
      setErr(null);
      try {
        const reservations = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(reservations);
      } catch (e) {
        setErr(e);
      }
    };
    load();

    return () => abortController.abort();
  };
  useEffect(loadReservations, [date, updateAll]);

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
