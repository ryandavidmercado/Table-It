import { listReservations } from "../utils/api";
import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import DateHandler from "./DateHandler";
import { Box, Grid, Text, Center } from "@chakra-ui/react";
import ReservationsList from "../common-components/ReservationsList";

function Reservations({ date, updateAll, visible }) {
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(loadReservations, [date, updateAll]);

  function loadReservations() {
    setReservations([]);
    setKey((key) => key + 1);
    const abortController = new AbortController();
    setErr(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setErr);
    return () => abortController.abort();
  }

  return (
    <Grid
      overflowY="hidden"
      pt={["50px", "60px"]}
      templateRows="auto 1fr"
      display={visible ? "grid" : "none"}
    >
      <Box py="15px" boxShadow="0px 2px 3px rgba(0,0,0,.2)" zIndex="2">
        <Center>
          <Text fontSize="1.2rem">Reservations</Text>
          <Text mx="10px" fontSize="1.2rem">
            -
          </Text>
          <Text textColor="gray.600">{date}</Text>
        </Center>
        <DateHandler date={date} />
        <ErrorAlert error={err} />
      </Box>
      <ReservationsList
        key={key}
        reservations={reservations}
        loadReservations={loadReservations}
        setErr={setErr}
        visible={visible}
      />
    </Grid>
  );
}

export default Reservations;
