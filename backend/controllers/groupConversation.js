const { Sequelize } = require('sequelize');
const Message = require('../models/message');
const Op = Sequelize.Op;


// const convertIntoSeconds = (time) => {
//     return new Date(`${time}`).getTime();
// }

exports.postGroupMessage = async (req, res, next) => {
    const { message_text, sent_to_groupNo } = req.body;
    //console.log(message_text, req.user);
    try {
        const result = await req.user.createMessage({message_text: message_text,sent_to_groupId: sent_to_groupNo,message_sender_name:req.user.name})
        res.status(200).json({messageInfo: result.dataValues, success: true, message: 'Message sent succesfully!!'})
    
    } catch (err) {
        console.log(err, 'err')
    }
}

exports.getGroupMessage = async (req, res, next) => {
    const lastMsgId = req.query.lastMsgId;
    console.log(lastMsgId);
    const groupId = req.params.groupId;
    try {
        const messages = await Message.findAll({
            where: {
                sent_to_groupId: groupId,
                id: {
                    [Op.gt]:lastMsgId,
                }

            }
        })
        res.status(200).json({ messages: messages, reqUserId:req.user.id, success: true, message: 'messages fetched successfully' })
    } catch (err) {
        console.log(err)
    };
}