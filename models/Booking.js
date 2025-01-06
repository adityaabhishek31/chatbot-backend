import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true }
});

const BookingSchema = mongoose.model('Booking', bookingSchema);
export default BookingSchema;