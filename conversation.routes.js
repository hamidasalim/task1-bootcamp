const {
	getConversations,
	getConversation,
	deleteConversation,
	createConversation,
	updateConversation,
	getOwnedConversations,
	addMessageToConversation,
} = require("../controllers/Conversation.controllers");
const ConversationModels = require("../models/Conversation.models");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();

router.param("Conversation", async (req, res, next, id) => {
	try {
		const Conversation = await ConversationModels.findById(id);

		if (!Conversation) return res.status(404).json("Conversation not found");
		req.Conversation = Conversation;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get("/", getConversations);
router.get("/me", verifyToken, getOwnedConversations);
router.get("/:Conversation", getConversation);
router.post("/:Conversation/owners", verifyToken,  addMessageToConversation);
router.post("/", verifyToken, createConversation);
router.put("/:Conversation", verifyToken,  updateConversation);
router.delete("/:Conversation", verifyToken, deleteConversation);

module.exports = router;
