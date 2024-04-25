import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../config/redux/redux-hook";
import { getUserInfo } from "../../config/redux/slide/user-slice";

const chatBox = {
  from: "tranthienminh135@gmail.com",
  to: "user@gmail.com",
  messages: [
    {
      id: 1,
      message: "hello world!!",
      from: "tranthienminh135@gmail.com",
    },
    {
      id: 2,
      message: "hi!!",
      from: "user@gmail.com",
    },
    {
      id: 3,
      message: "how are you!!",
      from: "tranthienminh135@gmail.com",
    },
    {
      id: 5,
      message: "im fine!!",
      from: "user@gmail.com",
    },
    {
      id: 6,
      message: "what is your name!!",
      from: "tranthienminh135@gmail.com",
    },
    {
      id: 7,
      message: "my name bao le!!",
      from: "user@gmail.com",
    },
    {
      id: 8,
      message: "ohh!!",
      from: "tranthienminh135@gmail.com",
    },
    {
      id: 9,
      message: "and you!!",
      from: "user@gmail.com",
    },
    {
      id: 10,
      message: "what is your name!!",
      from: "user@gmail.com",
    },
  ],
};
const ChatBox = () => {
  const userInfo = useAppSelector(getUserInfo);

  const renderChatArea = (username: string) => {
    return userInfo.username === username ? "text-end" : "text-start";
  };

  return (
    <>
      <div
        style={{ maxHeight: window.innerHeight - 300 }}
        className="col-12 row overflow-auto p-3 w-100"
      >
        {chatBox.messages.map((mes) => (
          <div
            className={`col-12 p-3 ${renderChatArea(mes.from)}`}
            key={mes.id}
            style={{ height: 100 }}
          >
            <span className="border p-2">{mes.message}</span>
          </div>
        ))}
      </div>
      <div className="col-12">
        <div className="form-outline" data-mdb-input-init>
          <input type="text" id="form12" className="form-control" />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
