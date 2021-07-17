import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { validateDateAndTime } from "../utils/validation/validateDateAndTime";
import { normalizeISODate } from "../utils/parse-dateTime";
import { editReservation, readReservation } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    reservation_id: "",
  });

  const history = useHistory();
  const { reservationId } = useParams();

  const loadReservation = () => {
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal)
      .then(setForm)
      .catch(setError);
  };

  useEffect(loadReservation, [reservationId]);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { reservation_date: date, reservation_time: time } = form;

    const validationErrs = validateDateAndTime(date, time);
    if (validationErrs.length) return setError({ message: validationErrs });

    setError(null);
    editReservation({ ...form, people: Number(form.people) })
      .then((reservation) => {
        const { reservation_date } = reservation;
        history.push(`/dashboard?date=${normalizeISODate(reservation_date)}`);
      })
      .catch(setError);
  };

  return (
    <div className="container">
      <h1>Edit Reservation</h1>
      <hr />
      {form.reservation_id && (
        <ReservationForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <ErrorAlert error={error} />
    </div>
  );
}

export default EditReservation;
