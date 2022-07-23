const mongoose = require("mongoose");
const ConversationSchema= new mongoose.Schema(
    {
        messages: [{type:mongoose.Schema.Types.ObjectId,ref:"Message"}],   
        members: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],   
    },
    { timestamps: true }
);
ConversationSchema.methods.addMessage = async function (id) {
		this.messages.push(id);
	return await this.save();
};
module.exports = mongoose.model("Conversation", ConversationSchema);