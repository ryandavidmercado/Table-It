import { formatAsTime } from "../utils/date-time";
import { Link } from "react-router-dom";
import { updateStatus } from "../utils/api";
import titleCaser from "../utils/titleCaser";

function ReservationCard({ reservation, refreshReservations, setErr }) {
  const cancelHandler = (e) => {
    e.preventDefault();
    const reservation_id = e.target.getAttribute("data-reservation-id-cancel");

    const cancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (!cancel) return;

    updateStatus(reservation_id, "cancelled")
      .then(() => refreshReservations())
      .catch(setErr);
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {reservation.first_name} {reservation.last_name}
        </h5>
        <ul>
          <li>Phone: {reservation.mobile_number}</li>
          <li>Time: {formatAsTime(reservation.reservation_time)}</li>
          <li>People: {reservation.people}</li>
          <li data-reservation-id-status={reservation.reservation_id}>
            Status: {titleCaser(reservation.status)}
          </li>
        </ul>
        {reservation.status === "booked" && (
          <div className="card-footer">
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button>Seat</button>
            </Link>
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button>Edit</button>
            </Link>
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
