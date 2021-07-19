import React, { useEffect, useState } from "react";

import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  // holds the current screen dimensions as state.
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // gets the current screen dimensions whenever the window changes.
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid">
      <div
        className="row h-100"
        // forces the sidebar to full height on desktop, fixing a glaring layout bug.
        style={{
          minHeight: dimensions.width < 768 ? 0 : `${dimensions.height}px`,
        }}
      >
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col py-3">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
