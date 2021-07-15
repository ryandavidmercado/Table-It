import { useHistory } from "react-router-dom";
import {
  NumberInput,
  Input,
  Stack,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function ReservationForm({ form, handleChange, handleSubmit }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="2">
        <Input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name || ""}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name || ""}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="mobile_number"
          placeholder="Phone Number"
          value={form.mobile_number || ""}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="reservation_date"
          placeholder="Reservation Date"
          pattern="\d{4}-d{2}-d{2}"
          value={form.reservation_date || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="reservation_time">
          Reservation Time
          <Input
            type="time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="\d{2}:\d{2}"
            value={form.reservation_time || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="people">
          Party Size
          <NumberInput name="people" min={1} value={form.people || ""} required>
            <NumberInputField onChange={handleChange} />
          </NumberInput>
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={history.goBack}>
          Cancel
        </button>
      </Stack>
    </form>
  );
}

export default ReservationForm;
