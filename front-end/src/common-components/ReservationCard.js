import { formatAsTimeTwelve } from "../utils/date-time";
import { updateStatus } from "../utils/api";
import titleCaser from "../utils/titleCaser";

import {  useHistory } from "react-router-dom";
import {
  Box,
  ButtonGroup,
  Button,
  Text,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

function ReservationCard({ reservation, refreshReservations, setErr, hideButtons = false }) {
  const cancelHandler = (e) => {
    e.preventDefault();
    const reservation_id = e.target.getAttribute("data-reservation-id-cancel");

    const cancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (!cancel) return;

    updateStatus(reservation_id, "cancelled")
      .then(() => refreshReservations())
      .catch(setErr);
  };

  const history = useHistory();

  const { status } = reservation;
  const statusColor =
    status === "cancelled"
      ? "red.500"
      : status === "seated"
      ? "orange.400"
      : status === "finished"
      ? "green.500"
      : "black"
  const statusWeight = status === "booked" ? "normal" : "bold";

  return (
    <Flex
      boxShadow="0px 2px 3px rgba(0,0,0,.2)"
      border="1px solid rgba(0,0,0,.2)"
      width="300px"
      direction="column"
      align="center"
      justify="center"
    >
      <Box w="100%" textAlign="center" py="15px">
        <VStack py="15px">
          <Text fontSize="2.5rem" lineHeight="25px">
            {formatAsTimeTwelve(reservation.reservation_time)}
          </Text>
          <Text
            fontSize="1.1rem"
            fontWeight={statusWeight}
            textColor={statusColor}
            data-reservation-id-status={reservation.reservation_id}
          >
            {titleCaser(reservation.status)}
          </Text>
        </VStack>
        <Text>
          <Icon as={IoPerson} boxSize=".8em" /> {reservation.first_name}{" "}
          {reservation.last_name}
        </Text>
        <Text>
          <Icon as={FaPhone} boxSize=".8em" /> {reservation.mobile_number}
        </Text>
        <Text>
          <Icon as={BsPeopleFill} boxSize=".8em" /> {reservation.people}{" "}
          {reservation.people > 1 ? "people" : "person"}
        </Text>
      </Box>
      {reservation.status === "booked" && !hideButtons && (
        <ButtonGroup isAttached size="sm" variant="solid">
          <Button roundedBottom="0" onClick={() => history.push(`/reservations/${reservation.reservation_id}/seat`)}>
              Seat
          </Button>
          <Button roundedBottom="0" borderLeft="1px solid rgba(0,0,0,.2)" onClick={() => history.push(`/reservations/${reservation.reservation_id}/edit`)}>
              Edit
          </Button>
          <Button
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={cancelHandler}
            roundedBottom="0"
            colorScheme="red"
          >
            Cancel
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
}

export default ReservationCard;
