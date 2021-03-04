import React from "react";
import { Message } from "@ory/kratos-client";
import { Typography } from "antd";

const { Text } = Typography;

export const KratosMessages = ({ messages }: { messages: Message[] }) => (
  <div className="messages">
    {messages.map(({ text, id, type }) => (
      <div className="errortext">
        <Text type="danger" className="errortext">
          {text}
        </Text>
      </div>
    ))}
  </div>
);
