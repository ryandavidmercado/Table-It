import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { listTables, readReservation, seatReservation } from "../utils/api";
import { normalizeISODate } from "../utils/parse-dateTime";

import ErrorAlert from "../layout/ErrorAlert";
import { Button, ButtonGroup, Center, Select, Stack } from "@chakra-ui/react";
import ReservationCard from "../common-components/ReservationCard";
import useDocumentTitle from "../utils/useTitle";

function SeatReservation() {
  useDocumentTitle("Seat Reservation - Table-It!");

  const [tableId, setTableId] = useState("none");
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [err, setErr] = useState(null);

  const history = useHistory();
  const { reservationId } = useParams();

  const loadTables = () => {
    const abortController = new AbortController();
    setErr(null);

    const load = async () => {
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (e) {
        setErr(e);
      }
    };
    load();

    return () => abortController.abort();
  };
  useEffect(loadTables, []);

  const loadReservation = () => {
    const abortController = new AbortController();

    const load = async () => {
      try {
        const reservation = await readReservation(
          Number(reservationId),
          abortController.signal
        );
        setReservation(reservation);
      } catch (e) {
        setErr(e);
      }
    };
    load();

    return () => abortController.abort();
  };
  useEffect(loadReservation, [reservationId]);

  const validateTable = () => {
    const tableToSeat = tables.find(
      (table) => table.table_id === Number(tableId)
    );

    let err = null;

    if (!tableToSeat) err = "Please select a table to seat.";
    if (tableToSeat.reservation_id !== null) err = "Table is already occupied.";
    if (tableToSeat.capacity < reservation.people)
      err = `Cannot sit party of ${reservation.people} at a table of ${tableToSeat.capacity}.`;

    if (err) {
      setErr({ message: err });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTable()) return;

    const submit = async () => {
      try {
        await seatReservation(Number(reservationId), Number(tableId));
        history.push(
          `/dashboard?date=${normalizeISODate(reservation.reservation_date)}`
        );
      } catch (e) {
        setErr(e);
      }
    };
    submit();
  };

  return (
      tables.length && reservation && (
        <Center minHeight="100%" py="15px">
          <Stack spacing="2" w={["85vw", "400px"]}>
            <ErrorAlert error={err} />
            <Center pb="15px">
              <ReservationCard reservation={reservation} hideButtons={true} />
            </Center>
            <form onSubmit={handleSubmit}>
              <Select
                name="table_id"
                onChange={(e) => setTableId(e.target.value)}
                value={tableId}
                required
              >
                <option value="none" disabled hidden>
                  Select a Table
                </option>
                {tables.map((table) => (
                  <option value={table.table_id} key={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </Select>
              <ButtonGroup mt="10px">
                <Button type="submit" colorScheme="blue">Submit</Button>
                <Button type="button" colorScheme="red" onClick={history.goBack}>
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          </Stack>
        </Center>
      )
  );
}

export default SeatReservation;
