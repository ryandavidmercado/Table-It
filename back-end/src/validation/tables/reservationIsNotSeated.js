const reservationIsNotSeated = (req, res, next) => {
  const reservation = res.locals.reservation;

  return reservation.status === "seated"
    ? next({
        status: 400,
        message: `Reservation with reservation_id ${reservation.reservation_id} is already seated.`,
      })
    : next();
};

module.exports = reservationIsNotSeated;
