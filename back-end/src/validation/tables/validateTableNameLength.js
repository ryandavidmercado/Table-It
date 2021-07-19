const validateTableNameLength = (req, res, next) => {
  return req.body.data.table_name && req.body.data.table_name.length > 1
    ? next()
    : next({
        status: 400,
        message: "table_name must be a string with at least two characters.",
      });
};

module.exports = validateTableNameLength;
