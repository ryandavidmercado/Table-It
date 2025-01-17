import { useState } from "react";
import dayjs from "dayjs";

import useQuery from "../utils/useQuery";

import Reservations from "./Reservations";
import Tables from "./Tables";
import { Grid } from "@chakra-ui/react";
import DashboardNav from "./DashboardNav";
import useDocumentTitle from "../utils/useTitle";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  useDocumentTitle("Table-It!");
  
  const query = useQuery();
  const date = query.get("date") || dayjs().format("YYYY-MM-DD");

  // an update trigger that allows children to call a reload for the entire dashboard.
  // to trigger an update, toggle updateAll using setUpdateAll.
  // to hook a component into global updates, add updateAll to its useEffect dependencies.
  const [updateAll, setUpdateAll] = useState(false);
  const [selection, setSelection] = useState("reservations");
  const isReservations = selection === "reservations";
  const isTables = selection === "tables";

  return (
    <Grid
      as="main"
      h="100%"
      templateColumns="1fr"
      templateRows="1fr auto"
      overflowY="hidden"
    >
      <Reservations
        date={date}
        updateAll={updateAll}
        visible={isReservations}
      />
      <Tables
        setUpdateAll={setUpdateAll}
        updateAll={updateAll}
        visible={isTables}
      />
      <DashboardNav selection={selection} setSelection={setSelection} />
    </Grid>
  );
}

export default Dashboard;
