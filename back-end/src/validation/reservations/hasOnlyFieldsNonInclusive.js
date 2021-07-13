const hasOnlyFields = (fields) => (req, res, next) => {
  const strikes = [];
  for (let key in req.body.data) {
    if (!fields.includes(key)) strikes.push(key);
  }
  return strikes.length
    ? next({
        status: 400,
        message: `Request data has the following invalid fields: ${strikes.join(
          ", "
        )}.`,
      })
    : next();
};

module.exports = hasOnlyFields;
