import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	description: String,
});

export default mongoose.model('Events', EventSchema);
