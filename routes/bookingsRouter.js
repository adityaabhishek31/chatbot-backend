import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Station from "../models/Station.js";


const Bookingrouter = express.Router();

Bookingrouter.post('/book', async (req, res) => {
  const { userId, stationId, slotId, date } = req.body;
  try {
    const station = await Station.findById(stationId);
    const slot = station.slots.id(slotId);

    if (slot.isBooked) {
      return res.status(400).send('Slot already booked');
    }

    slot.isBooked = true;
    await station.save();

    const booking = new Booking({
      user: userId,
      station: stationId,
      slot: slotId,
      date
    });
    await booking.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default Bookingrouter;