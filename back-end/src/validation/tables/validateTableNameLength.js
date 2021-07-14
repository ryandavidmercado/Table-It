const validateTableNameLength = (req, res, next) => {
  return req.body.data.table_name?.length <= 1
    ? next({
        status: 400,
        message: "table_name must be a string with at least two characters.",
      })
    : next();
};

module.exports = validateTableNameLength;
