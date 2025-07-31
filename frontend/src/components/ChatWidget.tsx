"use client";
import "@drivly/chatbox/style.css";
import dynamic from "next/dynamic";
import ChatBox from "@drivly/chatbox";

const ChatWidget = () => {
  return <ChatBox autoMessage="string" />;
};

export default ChatWidget;
