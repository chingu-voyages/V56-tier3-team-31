"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, MessageSquareX } from "lucide-react";
import ChatContainter from "./ChatContainter";
import { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      <Popover onOpenChange={(state) => setIsOpen(state)}>
        <PopoverTrigger asChild>
          <Button style={{ borderRadius: 20 }} variant="default">
            {isOpen ? <MessageSquareX /> : <MessageSquareMore />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ChatContainter />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatWidget;
