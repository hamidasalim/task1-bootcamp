const commentModels = require("../models/comment.models");

const createComment = async (req, res) => {
	const newComment = new commentModels({
		 story: req.body.story,
		 author: req.verifiedUser._id,
		 content: req.body.content
	});
	try {
		const savedComment = await newComment.save();
		return res.status(200).json(savedComment);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getComments = async (req, res) => {
	try {
		const comments = await commentModels.find();
		return res.status(200).json(comments);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getComment = async (req, res) => {


	try {
		const comment = await commentModels.findById(req.comment.id);
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteComment = async (req, res) => {
	try {
		const comment = await commentModels.findByIdAndDelete(req.comment.id);
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateComment = async (req, res) => {
	try {
		const comment = await commentModels.findByIdAndUpdate(req.comment.id, req.body, {
			new: true,
		});
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createComment = createComment;
module.exports.getComments = getComments;
module.exports.getComment = getComment;
module.exports.deleteComment = deleteComment;
module.exports.updateComment = updateComment;
