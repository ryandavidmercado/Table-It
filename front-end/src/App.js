import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout/Layout";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
