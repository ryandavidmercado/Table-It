const service = require("../../tables/tables.service");

const tableExists = async (req, res, next) => {
  const table = await service.read(req.params.tableId);
  if (table) res.locals.table = table;

  return !table
    ? next({
        status: 404,
        message: `Table with table_id ${req.params.tableId} could not be found.`,
      })
    : next();
};

module.exports = tableExists;
