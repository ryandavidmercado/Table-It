import { useState } from "react";

import { listReservations } from "../utils/api";
import { Box, Button, ButtonGroup, Center, Input } from "@chakra-ui/react"
import useDocumentTitle from "../utils/useTitle";
import ReservationsList from "../common-components/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";

function Search() {
  useDocumentTitle("Search - Table-It!");
  const history = useHistory();

  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  const loadSearchResults = (mobile_number) => {
    setErr(null);

    const load = async () => {
      try {
        const reservations = await listReservations({ mobile_number });

        if (!reservations.length) setErr({ message: "No reservations found" });
        setReservations(reservations);
      } catch (e) {
        setErr(e);
      }
    };
    load();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loadSearchResults(number);
  };

  const changeHandler = (e) => {
    setNumber(e.target.value);
  };

  return (
    <>
      <Center>
        <Box width={["85vw", "400px"]} py="20px">
          <form onSubmit={submitHandler}>
            <Box mr="15px">
            <label htmlFor="mobile_number">
            Search by Phone
            <Input
              type="text"
              name="mobile_number"
              onChange={changeHandler}
              value={number}
              placeholder="Enter a customer's phone number"
            />
            </label>
            </Box>
            <ButtonGroup mt="10px">
              <Button type="submit" colorScheme="blue">Find</Button>
              <Button type="button" onClick={() => history.goBack()} colorScheme="red">Cancel</Button>
            </ButtonGroup>
          </form>
        <ErrorAlert error={err} />
        </Box>
      </Center>
      <ReservationsList reservations={reservations} visible={!!reservations.length} showFinished={true}/>
    </>
  );
}

export default Search;
