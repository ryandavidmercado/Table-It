import { useHistory } from "react-router-dom";
import { NumberInput, Input, Stack, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Center, Button, ButtonGroup } from "@chakra-ui/react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ form, handleChange, handleSubmit, err }) {
  const history = useHistory();

  return (
    <Center minHeight="100%" py="10px">
      <form onSubmit={handleSubmit}>
        <Stack spacing="2" w={["85vw", "400px"]}>
          <ErrorAlert error={err} />
          <label htmlFor="first_name">
            First Name
            <Input
              type="text"
              name="first_name"
              value={form.first_name || ""}
              placeholder="John"
              onChange={handleChange}
              required
              />
          </label>
          <label htmlFor="last_name">
            Last Name
            <Input
              type="text"
              name="last_name"
              placeholder="Smith"
              value={form.last_name || ""}
              onChange={handleChange}
              required
              />
          </label>
          <label htmlFor="mobile_number">
            Phone Number
            <Input
              type="tel"
              name="mobile_number"
              placeholder="123-456-7890"
              value={form.mobile_number || ""}
              onChange={handleChange}
              required
              />
          </label>
          <label htmlFor="reservation_date">
            Reservation Date
            <Input
              type="date"
              name="reservation_date"
              pattern="\d{4}-d{2}-d{2}"
              value={form.reservation_date || ""}
              onChange={handleChange}
              required
              />
          </label>
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
            <NumberInput name="people" min={1} value={form.people} onChange={(value) => handleChange({target: {name: "people", value}})} required>
              <NumberInputField  />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </label>
          <ButtonGroup>
            <Button type="submit" colorScheme="blue">Submit</Button>
            <Button type="button" colorScheme="red" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Center>
  );
}

export default ReservationForm;
