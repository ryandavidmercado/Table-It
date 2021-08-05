import { useState } from "react";
import { useHistory } from "react-router-dom";

import { validateDateAndTime } from "../utils/validation/validateDateAndTime";
import { normalizeISODate } from "../utils/parse-dateTime";
import { createReservation } from "../utils/api";

import useDocumentTitle from "../utils/useTitle";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  useDocumentTitle("New Reservation - Table-It!")

  const [err, setErr] = useState(null);
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
    if (validationErrs.length) return setErr({ message: validationErrs });

    const submit = async () => {
      setErr(null);
      try {
        const { reservation_date } = await createReservation({
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
    <ReservationForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      err={err}
    />
  );
}

export default NewReservation;
