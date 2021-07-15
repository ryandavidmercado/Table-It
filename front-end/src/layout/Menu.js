import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Portal,
  Collapse,
  Button,
  useDisclosure,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { VscDashboard } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import Hamburger from "hamburger-react";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Portal>
      <Box
        w="100%"
        bg="gray.700"
        transition="all .5s linear"
        roundedBottom="10px"
        overflowY="hidden"
        position="fixed"
        top="0"
        zIndex={9999}
      >
        <Flex
          justify="space-between"
          align="center"
          px="5vw"
          height={["50px", "60px"]}
        >
          <Text
            color="gray.100"
            as="h1"
            fontSize="clamp(1.4rem, 4vw, 2.5rem)"
            fontWeight="bold"
            fontStyle="italic"
            ml="10px"
          >
            Table-It!
          </Text>
          <Box m="0">
            <Hamburger
              toggled={isOpen}
              toggle={onToggle}
              size={20}
              color="white"
              width="20px"
            />
          </Box>
        </Flex>
        <Collapse in={isOpen}>
          <SimpleGrid
            color="gray.100"
            align="center"
            mx="5%"
            columns={[1, 2, 4]}
            pb="2%"
          >
            <Link to="/dashboard">
              <Button
                leftIcon={<VscDashboard />}
                colorScheme="whiteAlpha"
                variant="ghost"
                color="white"
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
              >
                New Table
              </Button>
            </Link>
          </SimpleGrid>
        </Collapse>
      </Box>
    </Portal>
  );
}

export default Menu;
