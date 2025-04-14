import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    // Example relationship (optional)
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

// Optional: Add indexing for frequently queried fields
EventSchema.index({ date: 1 });

const Event = mongoose.model('Event', EventSchema);
export default Event;