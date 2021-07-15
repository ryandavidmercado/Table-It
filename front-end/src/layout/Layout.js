import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import { Box } from "@chakra-ui/react";
import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <Menu />
      <Box height={height}>
        <Routes />
      </Box>
    </>
  );
}

export default Layout;
