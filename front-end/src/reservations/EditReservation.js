import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { validateDateAndTime } from "../utils/validation/validateDateAndTime";
import { normalizeISODate } from "../utils/parse-dateTime";
import { editReservation, readReservation } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const [err, setErr] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    reservation_id: "",
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  const history = useHistory();
  const { reservationId } = useParams();

  const loadReservation = () => {
    const abortController = new AbortController();

    const load = async () => {
      try {
        const reservation = await readReservation(
          reservationId,
          abortController.signal
        );
        setForm(reservation);
        setHasLoaded(true);
      } catch (e) {
        setErr(e);
      }
    };

    load();
    return () => abortController.abort();
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
    if (validationErrs.length) return setErr({ message: validationErrs });

    const submit = async () => {
      setErr(null);
      try {
        const { reservation_date } = await editReservation({
          ...form,
          people: Number(form.people),
        });
        history.push(`/dashboard?date=${normalizeISODate(reservation_date)}`);
      } catch (e) {
        setErr(e);
      }
    };

    submit();
  };

  return (
    <div className="container">
      <h1>Edit Reservation</h1>
      <hr />
      {hasLoaded && (
        <ReservationForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <ErrorAlert error={err} />
    </div>
  );
}

export default EditReservation;
