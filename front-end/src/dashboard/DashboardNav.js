import { SimpleGrid, Center } from "@chakra-ui/react";

function DashboardNav({ selection, setSelection }) {
  const isReservations = selection === "reservations";
  const isTables = selection === "tables";

  return (
    <SimpleGrid
      columns={2}
      height="8vh"
      boxShadow="0px 0px 3px rgba(0,0,0,.2)"
      zIndex="2"
    >
      <Center
        fontWeight={isReservations ? "bold" : "normal"}
        boxShadow={isReservations && "1px 0px 3px rgba(0,0,0,.1)"}
        pt="2px"
        onClick={() => setSelection("reservations")}
      >
        Reservations
      </Center>
      <Center
        pt="2px"
        fontWeight={isTables ? "bold" : "normal"}
        boxShadow={isTables && "-1px 0px 3px rgba(0,0,0,.1)"}
        onClick={() => setSelection("tables")}
      >
        Tables
      </Center>
    </SimpleGrid>
  );
}

export default DashboardNav;
