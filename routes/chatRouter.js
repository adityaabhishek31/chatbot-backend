import express from "express";
import asyncHandler from "express-async-handler";
import geolib from "geolib";

const chatRouter = express.Router();

const dummyCordinatesOfBangalore = [
  {
    stationID: "AFC23WS",
    location: {
      coordinates: [12.930090, 77.578915],
      area: "Jayanagar",
      city: "Bengaluru",
      state: "Karnataka",
    },
  },
  {
    stationID: "AFC24WS_should_be_2nd_closest",
    location: {
      coordinates: [12.982362, 77.640006],
      area: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
    },
  },
  {
    stationID: "AFC25WS",
    location: {
      coordinates: [12.933323, 77.615842],
      area: "Kormangla",
      city: "Bengaluru",
      state: "Karnataka",
    },
  },
  {
    stationID: "AFC26WS_should_be_closest",
    location: {
      coordinates: [12.978609, 77.643997],
      area: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
    },
  },
];

chatRouter.post(
  "/nearest-stations",
  asyncHandler(async (req, res) => {
    const { coordinates } = req.body;

    if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
      return res
        .status(400)
        .json({ error: "User coordinates (latitude, longitude) are required." });
    }

    // Prepare an array of station coordinates for distance calculation
    const stationCoordinates = dummyCordinatesOfBangalore.map((station) => ({
      stationID: station.stationID,
      latitude: station.location.coordinates[0],
      longitude: station.location.coordinates[1],
      area: station.location.area,
      city: station.location.city,
      state: station.location.state,
    }));

    // Calculate distances and order by proximity
    const orderedStations = geolib.orderByDistance(
      { latitude: coordinates.latitude, longitude: coordinates.longitude },
      stationCoordinates.map((station) => ({
        latitude: station.latitude,
        longitude: station.longitude,
      }))
    );

    // Take the top 3 closest stations
    const nearestStations = orderedStations.slice(0, 3).map((station) => {
      // Find the original station object
      const originalStation = stationCoordinates.find(
        (s) =>
          s.latitude === station.latitude && s.longitude === station.longitude
      );

      // Calculate distance in meters and convert to kilometers
      const distanceInMeters = geolib.getDistance(
        { latitude: coordinates.latitude, longitude: coordinates.longitude },
        { latitude: originalStation.latitude, longitude: originalStation.longitude }
      );

      return {
        stationID: originalStation.stationID,
        area: originalStation.area,
        city: originalStation.city,
        state: originalStation.state,
        distanceInKm: (distanceInMeters / 1000).toFixed(2), // Convert meters to kilometers
      };
    });

    return res.status(200).json({
      nearestStations,
      type: "options",
      subtype: "stations",
    });
  })
);

export default chatRouter;