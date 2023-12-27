"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_config_1 = require("../config/openai.config");
// import OpenAI from "openai";
// type ChatCompletionRequestMessage =
//   | OpenAI.ChatCompletionCreateParamsNonStreaming
//   | OpenAI.ChatCompletionCreateParamsStreaming
//   | OpenAI.ChatCompletionCreateParams;
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered or token not matched" });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        })); //ChatCompletionRequestMessage
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const openai = (0, openai_config_1.configureOpenAI)();
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
            // messages: [{"role": "user", "content": "Hello!"}],
        });
        console.log(chatCompletion.choices[0].message, '<---hatCompletion.choices[0].message--->');
        if (chatCompletion.choices[0].message) {
            user.chats.push(chatCompletion.choices[0].message);
        }
        await user.save();
        return res.status(200).json({
            chats: user.chats,
        });
    }
    catch (error) {
        console.log(error, '<---error--->');
        return res.status(500).json({
            message: "Something Went Wrong at server",
            error
        });
    }
};
exports.generateChatCompletion = generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map