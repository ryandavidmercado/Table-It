import { VscDashboard } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { SimpleGrid, Button } from "@chakra-ui/react";

function NavItems() {
  return (
    <SimpleGrid
      color="gray.100"
      align="center"
      mx="5%"
      columns={[1, 2, 4]}
      pb="10px"
      spacing="-4px"
    >
      <Link to="/dashboard">
        <Button
          leftIcon={<VscDashboard />}
          colorScheme="whiteAlpha"
          variant="ghost"
          color="white"
          size="lg"
          w="100%"
        >
          Dashboard
        </Button>
      </Link>
      <Link to="/search">
        <Button
          leftIcon={<HiOutlineSearch />}
          colorScheme="whiteAlpha"
          variant="ghost"
          color="white"
          size="lg"
          w="100%"
        >
          Search
        </Button>
      </Link>
      <Link to="/reservations/new">
        <Button
          leftIcon={<IoAddCircleOutline />}
          colorScheme="whiteAlpha"
          variant="ghost"
          color="white"
          size="lg"
          w="100%"
        >
          New Reservation
        </Button>
      </Link>
      <Link to="/tables/new">
        <Button
          leftIcon={<IoAddCircleOutline />}
          colorScheme="whiteAlpha"
          variant="ghost"
          color="white"
          size="lg"
          w="100%"
        >
          New Table
        </Button>
      </Link>
    </SimpleGrid>
  );
}

export default NavItems;
