import { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import { Box, Grid, Text, Center } from "@chakra-ui/react";
import TablesList from "../common-components/TablesList";

function Tables({ updateAll, setUpdateAll, visible }) {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  const loadTables = () => {
    const abortController = new AbortController();
    setErr(null);

    const load = async () => {
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (e) {
        setErr(e);
      }
    };
    load();

    return () => abortController.abort();
  };
  useEffect(loadTables, [updateAll]);

  const finishHandler = (e) => {
    const finish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (!finish) return;

    const tableId = e.target.getAttribute("data-table-id-finish");
    const runFinish = async () => {
      try {
        await finishTable(tableId);
        setUpdateAll((updateAll) => !updateAll);
      } catch (e) {
        setErr(e);
      }
    };
    runFinish();
  };

  const openSeats =
    tables.length &&
    tables.reduce(
      (acc, table) =>
        acc + (table.reservation_id === null ? table.capacity : 0),
      0
    );

  const seatColor = openSeats ? "green.500" : "red.500";

  const openTables = tables.filter(
    (table) => table.reservation_id === null
  ).length;

  const tableColor = openTables ? "green.500" : "red.500";

  return (
    <Grid
      overflowY="hidden"
      templateRows="auto 1fr"
      display={visible ? "grid" : "none"}
    >
      <Box py="15px" boxShadow="0px 2px 3px rgba(0,0,0,.2)" zIndex="2">
        <Center>
          <Text fontSize="1.2rem">Tables</Text>
        </Center>
        <Center mt="15px" mb="3px">
          {tables.length && (
            <>
              Open Seats:{" "}
              <Text color={seatColor} ml="3px" mr="15px" fontWeight="bold">
                {openSeats}
              </Text>
              Open Tables:{" "}
              <Text color={tableColor} ml="3px" fontWeight="bold">
                {openTables}
              </Text>
            </>
          )}
        </Center>
        <ErrorAlert error={err} />
      </Box>
      <TablesList tables={tables} visible={visible} finishHandler={finishHandler} />
    </Grid>
  );
}

export default Tables;
