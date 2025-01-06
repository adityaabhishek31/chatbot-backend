import express from "express";
import mongoose from "mongoose";
import Station from "../models/Station.js";


const StationRouter = express.Router();

StationRouter.post('/add', async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).send(station);
    } catch (error) {
        res.status(400).send(error);
    }
});

StationRouter.get('/:id/slots', async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).send('Station not found');
        }
        res.send(station.slots);
    } catch (error) {
        res.status(400).send(error);
    }
});

StationRouter.post('available-dates', async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).send('Station not found');
        }
        res.send(station.availableDates);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default StationRouter;
