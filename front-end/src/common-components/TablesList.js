import { Box, Flex, Grid, SlideFade } from "@chakra-ui/react";
import TableCard from "./TableCard";

function TablesList({ tables, loadTables, setErr, visible }) {
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
            {tables.map(
              (table, idx) =>
                table.status !== "finished" && (
                  <TableCard
                    key={idx}
                    table={table}
                    setErr={setErr}
                    refreshTab={loadReservations}
                  />
                )
            )}
          </Grid>
        </Flex>
      </SlideFade>
    </Box>
  );
}

export default TablesList;
