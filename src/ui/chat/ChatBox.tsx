import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../config/redux/redux-hook";
import { getUserInfo } from "../../config/redux/slide/user-slice";
import { socket } from "./chat-config";
import { MDBBtn, MDBInputGroup } from "mdb-react-ui-kit";
import { getAllMessage } from "../../service/chat-service";
import Loading from "../common/Loading";

const initParam = {
  username: "",
};

const ChatBox = ({ toUser }: any) => {
  const userInfo = useAppSelector(getUserInfo);
  const [msg, setMsg] = useState("");
  const [msgParam, setMsgParam] = useState(initParam);
  const [messages, setMessages] = useState<any>();
  const ref = useRef<any>(null);

  useEffect(() => {
    if (userInfo && toUser) {
      const param = {
        ...msgParam,
        username: toUser.username,
      };
      setMsgParam({ ...msgParam, ...param });
      getAllMessage(param).then((res: any) => {
        setMessages(res);
      });
    }
  }, [userInfo, toUser]);

  const renderChatArea = (username: string) => {
    return userInfo.username === username ? "text-end" : "text-start";
  };

  useEffect(() => {
    socket.on("hello", (arg: any) => {
      console.log("connected", arg);
      setMessages(arg);
    });
  }, []);

  useEffect(() => {
    if (messages && ref) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = () => {
    socket.emit("message", {
      fromUser: userInfo.username,
      toUser: toUser.username,
      message: msg,
    });
    setMsg("");
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setMsg(value);
  };

  if (!messages) return <Loading />;

  return (
    <>
      <div
        style={{ maxHeight: window.innerHeight - 300 }}
        className="col-12 row overflow-auto p-3 w-100"
        ref={ref}
      >
        {messages.length <= 0 && <div>No message</div>}
        {[...messages].reverse().map((mes: any) => (
          <div
            className={`col-12 p-3 ${renderChatArea(mes.fromUser)}`}
            key={mes.id}
            style={{ height: 100 }}
          >
            <span className="border p-2">{mes.message}</span>
          </div>
        ))}
      </div>
      <div className="col-12">
        <MDBInputGroup className="mb-3">
          <input
            className="form-control"
            placeholder="Recipient's username"
            type="text"
            onChange={handleInputChange}
            value={msg}
          />
          <MDBBtn outline onClick={handleSubmit}>
            Send
          </MDBBtn>
        </MDBInputGroup>
      </div>
    </>
  );
};

export default ChatBox;
