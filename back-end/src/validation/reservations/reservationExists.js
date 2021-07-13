const service = require("../../reservations/reservations.service");

const reservationExists = async (req, res, next) => {
  const reservation = await service.read(req.params.reservationId);

  if (!reservation)
    return next({
      status: 404,
      message: `Reservation with reservation_id ${req.params.reservationId} not found.`,
    });

  res.locals.reservation = reservation;
  next();
};

module.exports = reservationExists;
