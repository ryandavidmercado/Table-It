import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"
import useDocumentTitle from "../utils/useTitle"
import { Center, Stack, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, ButtonGroup } from "@chakra-ui/react"


function NewTable() {
  useDocumentTitle("New Table - Table-It!");

  const history = useHistory();
  const [form, setForm] = useState({
    table_name: "",
    capacity: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const submit = async () => {
      try {
        await createTable({ ...form, capacity: Number(form.capacity) });
        history.push("/dashboard");
      } catch (e) {
        setErr(e);
      }
    };
    submit();
  };

  return (
    <Center minHeight="100%" py="20px">
      <form onSubmit={handleSumbit}>
        <Stack spacing="2" w={["85vw", "400px"]}>
          <ErrorAlert error={err} />
          <label htmlFor="table_name">
            Table Name
            <Input
              type="text"
              name="table_name"
              minLength="2"
              value={form.table_name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="capacity">
            Capacity
            <NumberInput name="capacity" min={1} value={form.capacity} onChange={(value) => handleChange({target: {name: "capacity", value}})} required>
              <NumberInputField  />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </label>
          <ButtonGroup>
            <Button type="submit" colorScheme="blue">Submit</Button>
            <Button type="button" colorScheme="red" onClick={history.goBack}>
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Center>
  );
}

export default NewTable;
