const conversationModels = require("../models/conversation.models");
const storyModels = require("../models/story.models");
const userModels = require("../models/user.models");

const createConversation = async (req, res) => {
	const newConversation = new conversationModels({
		members: [req.verifiedUser._id,req.body.member],
	});
	try {
		const savedConversation = await newConversation.save();
		return res.status(200).json(savedConversation);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getConversations = async (req, res) => {
	try {
		const conversations = await conversationModels.find();
		return res.status(200).json(conversations);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getConversation = async (req, res) => {
	const conversation = req.conversation;
	await conversation.populate({
		path: "messages",
	});
	try {
		return res.status(200).json(conversation);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteConversation = async (req, res) => {

	try {
		const conversation = await conversationModels.findByIdAndDelete(req.conversation.id);
		return res.status(200).json(conversation);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateConversation = async (req, res) => {
	console.log(req.conversation)
	try {
		const conversation = await conversationModels.findByIdAndUpdate(req.conversation.id, req.body, {
			new: true,
		});
		return res.status(200).json(conversation);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getOwnedConversations = async (req, res) => {
	try {
		const conversations = await conversationModels.find({
			members: { $in: [req.verifiedUser._id] },
		});
		return res.status(200).json(conversations);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const addMessageToConversation = async (req, res) => {
	const conversation = req.conversation;

	try {
		const message = await messageModels.findById( req.params.messageId);
		if (!message) {
			return res.status(404).json("no message foind");
		} else {
			await conversation.addMessage(message._id);
		}
		return res.status(200).json(conversation);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createConversation = createConversation;
module.exports.getConversations = getConversations;
module.exports.getConversation = getConversation;
module.exports.deleteConversation = deleteConversation;
module.exports.updateConversation = updateConversation;
module.exports.getOwnedConversations = getOwnedConversations;
module.exports.addMessageToConversation = addMessageToConversation;

