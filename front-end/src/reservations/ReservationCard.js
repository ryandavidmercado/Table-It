import { Link } from "react-router-dom";

import { formatAsTime } from "../utils/date-time";
import { updateStatus } from "../utils/api";
import titleCaser from "../utils/titleCaser";

function ReservationCard({
  reservation,
  refreshReservations,
  setErr,
  hideControls = false,
}) {
  const cancelHandler = (e) => {
    e.preventDefault();
    const reservation_id = e.target.getAttribute("data-reservation-id-cancel");

    const cancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (!cancel) return;

    const update = async () => {
      try {
        await updateStatus(reservation_id, "cancelled");
        await refreshReservations();
      } catch (e) {
        setErr(e);
      }
    };
    update();
  };

  const marginSpacer = { marginRight: "5px" };

  return (
    <div className="card mb-3">
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
        {reservation.status === "booked" && !hideControls && (
          <div className="card-footer">
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary" style={marginSpacer}>
                Seat
              </button>
            </Link>
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-secondary" style={marginSpacer}>
                Edit
              </button>
            </Link>
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={cancelHandler}
              className="btn btn-danger"
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
