const reservationIdMatches = (req, res, next) => {
  if (!req.body.data.hasOwnProperty("reservation_id")) return next();

  return Number(req.params.reservationId) === req.body.data.reservation_id
    ? next()
    : next({
        status: 400,
        message: `The reservation ID requested by the URL (${req.params.reservationId}) does not match the reservation ID provided in the request body (${req.body.data.reservation_id}).`,
      });
};

module.exports = reservationIdMatches;
