"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import ChatContainter from "./ChatContainter";

const ChatWidget = () => {
  return (
    <div className="fixed bottom-5 right-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button style={{ borderRadius: 20 }} variant="default">
            <MessageSquareMore />
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
