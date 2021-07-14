const tableIsNotSeated = (req, res, next) => {
  return res.locals.table.reservation_id !== null
    ? next({
        status: 400,
        message: `Table with table_id ${req.params.tableId} is currently occupied.`,
      })
    : next();
};

module.exports = tableIsNotSeated;
