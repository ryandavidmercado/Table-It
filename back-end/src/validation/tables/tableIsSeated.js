const tableIsSeated = (req, res, next) => {
  return res.locals.table.reservation_id !== null
    ? next()
    : next({
        status: 400,
        message: `Table with table_id ${req.params.tableId} is currently not occupied.`,
      });
};

module.exports = tableIsSeated;
