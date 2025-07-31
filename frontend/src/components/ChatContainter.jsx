"use client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
const data = [
  {
    props: {
      model: {
        message: "Hello, How can I help you?",
        direction: "incoming",
        position: "single",
        sentTime: "just now",
        sender: "Joe",
      },
      children: <Avatar src={"./apple-touch-icon.png"} name="Eliot" />,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        direction: "outgoing",
        position: "single",
        sentTime: "just now",
        sender: "User",
      },
    },
  },
];

import { useState } from "react";

const ChatContainter = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(data);
  const handleSend = (value) => {
    console.log(text);
    setMessages((prev) => [
      ...prev,
      {
        props: {
          model: {
            message: text,
            direction: "outgoing",
            position: "single",
            sentTime: "just now",
            sender: "User",
          },
        },
      },
    ]);
    setText("");
  };

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((m, i) => (
              <Message key={i} {...m.props} />
            ))}
          </MessageList>

          <MessageInput
            attachButton={false}
            onSend={handleSend}
            onChange={(e) => setText(e)}
            value={text}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatContainter;
