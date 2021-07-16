import React from "react";
import { useMediaQuery } from "react-responsive";

import {
  Box,
  Flex,
  Portal,
  Collapse,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import Hamburger from "hamburger-react";
import NavItems from "./NavItems";

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
          <Hamburger
            toggled={isOpen}
            toggle={onToggle}
            size={20}
            color="white"
            width="20px"
          />
        </Flex>
        <Collapse in={isOpen}>
          <NavItems />
        </Collapse>
      </Box>
    </Portal>
  );
}

export default Menu;
