import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { configureOpenAI } from "../config/openai.config";
// import OpenAI from "openai";

// type ChatCompletionRequestMessage =
//   | OpenAI.ChatCompletionCreateParamsNonStreaming
//   | OpenAI.ChatCompletionCreateParamsStreaming
//   | OpenAI.ChatCompletionCreateParams;

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token not matched" });
    }
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as any; //ChatCompletionRequestMessage
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const openai = configureOpenAI();
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
      // messages: [{"role": "user", "content": "Hello!"}],
    });
    console.log(
      chatCompletion.choices[0].message,
      "<---hatCompletion.choices[0].message--->"
    );
    if (chatCompletion.choices[0].message) {
      user.chats.push(chatCompletion.choices[0].message);
    }
    await user.save();
    return res.status(200).json({
      chats: user.chats,
    });
  } catch (error) {
    console.log(error, "<---error--->");
    return res.status(500).json({
      message: "Something Went Wrong at server",
      error,
    });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
