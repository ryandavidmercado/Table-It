const service = require("../../reservations/reservations.service");

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await service.read(reservation_id);

  if (!reservation)
    return next({
      status: 404,
      message: `Reservation with reservation_id ${reservation_id} not found.`,
    });

  res.locals.reservation = reservation;
  next();
};

module.exports = reservationExists;
