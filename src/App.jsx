import React, { useState, useEffect } from "react";
import "./index.css";
import "./components/styleForm.css";
import { HeaderText } from "./components/header.jsx";
import { PostMessage } from "./components/PostMessage";
import { MessageList } from "./components/MessageList";

export const App = () => {
  // Initialize messages state with an empty array
  const [messages, setMessages] = useState([]);

  const addNewMessage = (message) => {
    // Add the new message to the list
    const newMessages = [...messages, message];
    setMessages(newMessages);
  };

  // Like button handler
  const handleLike = async (thoughtId) => {
    try {
      await fetch(
        `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`,
        {
          method: "POST",
        }
      );
      // Update the likes count for the specific message
      const updatedMessages = messages.map((message) => {
        if (message._id === thoughtId) {
          return {
            ...message,
            hearts: message.hearts + 1,
          };
        }
        return message;
      });

      // Update state with the updated messages
      setMessages(updatedMessages);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch the initial list of messages when the component mounts
  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  return (
    <>
      <HeaderText />
      <PostMessage newMessage={addNewMessage} />
      <MessageList
        messages={messages}
        handleLike={handleLike}
      />{" "}
      {/* Pass the messages as a prop */}
    </>
  );
};
