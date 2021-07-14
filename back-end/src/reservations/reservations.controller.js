const service = require("./reservations.service");
const validFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//Validation middleweare
const hasData = require("../validation/hasData");
const peopleIsNum = require("../validation/reservations/peopleIsNum");
const hasStatus = require("../validation/hasFields")(["status"]);
const validStatus = require("../validation/reservations/validStatus");
const statusIsBooked = require("../validation/reservations/statusIsBooked");
const statusIsNotFinished = require("../validation/reservations/statusIsNotFinished");
const reservationExists = require("../validation/reservations/reservationExists");
const reservationIdMatches = require("../validation/reservations/reservationIdMatches");
const hasFields = require("../validation/hasFields")(validFields);
const hasOnlyFields = require("../validation/hasOnlyFieldsNonInclusive")([
  ...validFields,
  "status",
  "created_at",
  "updated_at",
  "reservation_id",
]);
const {
  dateTimeMiddleware,
} = require("../validation/reservations/validateDateTime");

//Main route handlers
async function list(req, res) {
  const { date = "", mobile_number = "" } = req.query;

  const data = date
    ? await service.listByDate(date)
    : mobile_number
    ? await service.search(mobile_number)
    : await service.list();

  res.json({ data });
}

async function create(req, res) {
  res.status(201).json({
    data: await service.create(req.body.data),
  });
}

function read(req, res) {
  res.json({ data: res.locals.reservation });
}

const updateStatus = async (req, res) => {
  const payload = {
    status: req.body.data.status,
  };

  res.json({
    data: await service.update(Number(req.params.reservationId), payload),
  });
};

const update = async (req, res) => {
  res.json({
    data: await service.update(Number(req.params.reservationId), req.body.data),
  });
};

module.exports = {
  list,
  read: [reservationExists, read],
  create: [
    hasData,
    hasFields,
    hasOnlyFields,
    statusIsBooked,
    peopleIsNum,
    dateTimeMiddleware,
    create,
  ],
  updateStatus: [
    hasData,
    hasStatus,
    validStatus,
    reservationExists,
    statusIsNotFinished,
    updateStatus,
  ],
  update: [
    hasData,
    hasFields,
    hasOnlyFields,
    statusIsBooked,
    peopleIsNum,
    dateTimeMiddleware,
    reservationExists,
    reservationIdMatches,
    update,
  ],
};
