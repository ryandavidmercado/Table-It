import { Box, Flex, Grid, SlideFade } from "@chakra-ui/react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations, loadReservations, setErr, visible }) {
  return (
    <Box overflowY="auto" py="15px">
      <SlideFade in={visible} offsetY="20px">
        <Flex align="center" justify="center" minHeight="100%">
          <Grid
            templateColumns="repeat(auto-fit, 300px)"
            gap="15px"
            px="10px"
            justifyContent="center"
            w="100%"
          >
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
          </Grid>
        </Flex>
      </SlideFade>
    </Box>
  );
}

export default ReservationsList;
