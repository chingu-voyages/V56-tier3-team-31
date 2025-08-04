"use client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
const data = [
  {
    props: {
      model: {
        message: "Hello I'm Eliot, How can I help you?",
        direction: "incoming",
        position: "single",
        sentTime: "just now",
        sender: "Eliot",
      },
      children: <Avatar src={"./apple-touch-icon.png"} name="Eliot" />,
    },
  },
];

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/util";

const ChatContainter = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(data);
  const mutation = useMutation({
    mutationFn: (prompt) => {
      return customFetch.post("/chats", prompt);
    },
    onSuccess: (data, variables, context) => {
      console.log(data);

      setMessages((prev) => [
        ...prev,
        {
          props: {
            model: {
              message: data?.data?.response || "",
              direction: "incoming",
              position: "single",
              sentTime: "just now",
              sender: "Eliot",
            },
            children: <Avatar src={"./apple-touch-icon.png"} name="Eliot" />,
          },
        },
      ]);
    },
  });

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

    mutation.mutate(text);
    setText("");
  };

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              mutation.isPending && (
                <TypingIndicator content="Eliot is thinking..." />
              )
            }
          >
            {messages.map((m, i) => (
              <Message key={i} {...m.props} />
            ))}
          </MessageList>

          <MessageInput
            autoFocus={true}
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
