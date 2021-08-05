import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { ButtonGroup, Button, Center } from "@chakra-ui/react";

function DateHandler({ date }) {
  const history = useHistory();

  const format = "YYYY-MM-DD";
  const parseDate = (dateString) => dayjs(dateString, format);

  const getPrev = (date) => parseDate(date).subtract(1, "d").format(format);
  const getNext = (date) => parseDate(date).add(1, "d").format(format);

  const prevHandler = () => history.push(`/dashboard?date=${getPrev(date)}`);
  const todayHandler = () => history.push(`/dashboard`);
  const nextHandler = () => history.push(`/dashboard?date=${getNext(date)}`);

  return (
    <Center mt="10px">
      <ButtonGroup variant="outline" isAttached size="sm">
        <Button onClick={prevHandler}>Previous</Button>
        <Button onClick={todayHandler}>Today</Button>
        <Button onClick={nextHandler}>Next</Button>
      </ButtonGroup>
    </Center>
  );
}

export default DateHandler;
