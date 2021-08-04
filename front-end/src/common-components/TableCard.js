
import { FaChair } from "react-icons/fa"
import {
  Box,
  Button,
  Text,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";


function TableCard({ table, finishHandler }) {
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
            {table.table_name}
          </Text>
          <Text
            fontSize="1.1rem"
            color={table.reservation_id === null ? "green.500" : "orange.400"}
            fontWeight="bold"
          >
            {table.reservation_id === null ? "Free" : "Occupied"}
          </Text>
        </VStack>
        <Text>
          <Icon as={FaChair} boxSize="1em" /> {table.capacity} {table.capacity === 1 ? "seat" : "seats"}
        </Text>
      </Box>
      {table.reservation_id !== null &&
        <Button
          data-table-id-finish={table.table_id}
          onClick={finishHandler}
          roundedBottom="0"
          colorScheme="green"
          size="sm"
        >
          Finish
        </Button>
      }
    </Flex>
  );
}


export default TableCard;
