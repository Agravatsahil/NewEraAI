import express from "express";
import { getGeminiResponse } from "../utils/gemini.js";
import Thread from "../models/threads.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const newThread = new Thread(
            {
                threadId: "test-thread2",
                title: "Test Thread from server2",
                messages: []
            }
        );
        const response = await newThread.save();
        res.json(response);
    } catch (error) {
        console.error("Thread error:", error);
        res.status(500).json({ error: "Failed to create thread" });
    }
});

//get all threads
router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find().sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.error("Threads error:", error);
        res.status(500).json({ error: "Failed to get threads" });
    }
});

router.get("/threads/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);
    } catch (error) {
        console.error("Thread error:", error);
        res.status(500).json({ error: "Failed to get chat history" });
    }
});

router.delete("/threads/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOneAndDelete({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json({ message: "Thread deleted" });
    } catch (error) {
        console.error("Thread error:", error);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

router.post("/threads/:threadId/messages", async (req, res) => {
    const { threadId } = req.params;
    const { message } = req.body;
    if (!message || !threadId) {
        return res.status(400).json({ error: "missing required fields" });
    }
    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
            // await thread.save();
        }
        const assistantResponse = await getGeminiResponse(message);
        const responseText = assistantResponse.text || assistantResponse.error || "Sorry, I couldn't process that.";
        thread.messages.push({ role: "assistant", content: responseText });
        thread.updatedAt = new Date();
        await thread.save();

        res.json({ reply: responseText });
    } catch (error) {
        console.error("Thread error:", error);
        res.status(500).json({ error: "Failed to add message" });
    }
});

export default router;