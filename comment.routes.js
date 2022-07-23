const {
	createComment,
	getComment,
	getComments,
	deleteComment,
	updateComment,
} = require("../controllers/comment.controllers");
const commentModel = require("../models/comment.models");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const isCommentOwner = require("../middleware/isBlogOwner");

router.param("comment", async (req, res, next, id) => {
	try {
		const comment = await commentModel.findById(id);

		if (!comment) {
			return res.status(404).json("comment not found");
		}
		req.comment = comment;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.post("/",verifyToken, createComment);
router.get("/", getComments);
router.get("/:comment",verifyToken, isCommentOwner,getComment);
router.put("/:comment", verifyToken, isCommentOwner, updateComment);
router.delete("/:comment", verifyToken, isCommentOwner, deleteComment);


module.exports = router;
