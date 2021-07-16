import React from "react";
import { Box, Center } from "@chakra-ui/react";
/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <Center>
        <Box
          className="alert alert-danger m-2"
          p="20px"
          bgColor="red.200"
          w="80%"
          mt="15px"
        >
          Error: {error.message}
        </Box>
      </Center>
    )
  );
}

export default ErrorAlert;
