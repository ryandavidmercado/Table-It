const tableHasCapacity = (req, res, next) => {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  return table.capacity < reservation.people
    ? next({
        status: 400,
        message: `Cannot seat a party of ${reservation.people} at a table with a capacity of ${table.capacity}.`,
      })
    : next();
};

module.exports = tableHasCapacity;
