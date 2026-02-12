import mongoose from "mongoose";

const massagesSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
    threadId: { type: String, required: true , unique: true},
    title: { type: String,default: "New Thread" },
    messages: [massagesSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Thread", threadSchema);
