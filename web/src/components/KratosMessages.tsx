import React from "react";
import { Message } from "@ory/kratos-client";

export const KratosMessages = ({ messages }: { messages: Message[] }) => (
  <div className="messages">
    {messages.map(({ text, id, type }) => (
      <div key={id} className={`message ${type}`}>
        {text}
      </div>
    ))}
  </div>
);
