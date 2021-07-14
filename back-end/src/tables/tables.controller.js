const service = require("./tables.service");

//Validation middleware
const reservationExists = require("../validation/tables/reservationExists");
const tableExists = require("../validation/tables/tableExists");
const validateTableNameLength = require("../validation/tables/validateTableNameLength");
const tableIsNotSeated = require("../validation/tables/tableIsNotSeated");
const tableIsSeated = require("../validation/tables/tableIsSeated");
const tableHasCapacity = require("../validation/tables/tableHasCapacity");
const reservationIsNotSeated = require("../validation/tables/reservationIsNotSeated");
const hasData = require("../validation/hasData");
const hasFieldsSeat = require("../validation/hasFields")(["reservation_id"]);
const hasFieldsCreate = require("../validation/hasFields")([
  "table_name",
  "capacity",
]);

//Main route handlers
const list = async (req, res) => res.json({ data: await service.list() });

const create = async (req, res) =>
  res.status(201).json({ data: await service.create(req.body.data) });

const seatReservation = async (req, res, next) =>
  res.json({
    data: await service.seatReservation(
      Number(req.params.tableId),
      Number(req.body.data.reservation_id)
    ),
  });

const finishTable = async (req, res, next) =>
  res.json({
    data: await service.finishTable(Number(req.params.tableId)),
  });

module.exports = {
  list,
  create: [hasData, hasFieldsCreate, validateTableNameLength, create],
  seatReservation: [
    hasData,
    hasFieldsSeat,
    reservationExists,
    tableExists,
    reservationIsNotSeated,
    tableIsNotSeated,
    tableHasCapacity,
    seatReservation,
  ],
  finishTable: [tableExists, tableIsSeated, finishTable],
};
