import { useState } from "react";
import { useHistory } from "react-router-dom";
import { validateDateAndTime } from "../utils/validation/validateDateAndTime";
import { normalizeISODate } from "../utils/parse-dateTime";
import { createReservation } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const history = useHistory();

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
    createReservation({ ...form, people: Number(form.people) })
      .then((reservation) => {
        const { reservation_date } = reservation;
        history.push(`/dashboard?date=${normalizeISODate(reservation_date)}`);
      })
      .catch(setError);
  };

  return (
    <div className="container">
      <h1>New Reservation</h1>
      <hr />
      <ReservationForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ErrorAlert error={error} />
    </div>
  );
}

export default NewReservation;
