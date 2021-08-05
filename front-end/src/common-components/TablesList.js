import { Box, Flex, Grid, SlideFade } from "@chakra-ui/react";
import TableCard from "./TableCard";

function TablesList({ tables, visible, finishHandler }) {
  return (
    <Box overflowY="auto" py="15px" px="20px">
      <SlideFade in={visible && tables.length} offsetY="20px">
        <Flex align="center" justfiy="center" minHeight="100%">
          <Grid
            templateColumns="repeat(auto-fit, 300px)"
            gap="15px"
            px="10px"
            justifyContent="center"
            w="100%"
          >
            {tables.map(table => <TableCard table={table} finishHandler={finishHandler} />)}
          </Grid>
        </Flex>
      </SlideFade>
    </Box>
  )
}

export default TablesList;
