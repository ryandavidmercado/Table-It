import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { validateDateAndTime } from "../utils/validation/validateDateAndTime";
import { normalizeISODate } from "../utils/parse-dateTime";
import { editReservation, readReservation } from "../utils/api";

import ReservationForm from "./ReservationForm";
import useDocumentTitle from "../utils/useTitle";

function EditReservation() {
  useDocumentTitle("Edit Reservation - Table-It!");

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
      form.reservation_id && (
        <ReservationForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          err={err}
        />
    )
  );
}

export default EditReservation;
