import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stationID: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  location: { type: String, required: true },
  slots: [slotSchema]
});

const StationSchema = mongoose.model("Station", stationSchema);
export default StationSchema;