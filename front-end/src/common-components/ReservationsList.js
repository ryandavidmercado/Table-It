import { Flex, SlideFade } from "@chakra-ui/react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations, loadReservations, setErr }) {
  return (
    <Flex direction="column" align="center" overflowY="auto" pt="10px">
      <SlideFade in={!!reservations.length} offsetY="20px">
        {reservations.map(
          (reservation, idx) =>
            reservation.status !== "finished" && (
              <ReservationCard
                key={idx}
                reservation={reservation}
                setErr={setErr}
                refreshReservations={loadReservations}
              />
            )
        )}
      </SlideFade>
    </Flex>
  );
}

export default ReservationsList;
