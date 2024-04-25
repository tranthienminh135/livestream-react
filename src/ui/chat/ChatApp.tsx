import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { getAllUsers } from "../../service/user-service";
import ChatBox from "./ChatBox";

const ChatApp = () => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const fetchAllUsers = () => {
      getAllUsers().then((res) => {
        setUsers(res);
      });
    };
    fetchAllUsers();
  }, []);

  if (!users) return <Loading />;
  return (
    <div className="container p-2">
      <div
        className="row bg-light border p-0"
        style={{ height: window.innerHeight - 200 }}
      >
        <div className="col-3 bg-light border">
          {users.map((user: any) => (
            <div
              className="d-flex align-items-center m-4 btn"
              key={user.username}
            >
              <img
                src={`data:image/jpeg;base64,${user.avatar}`}
                className="rounded-circle"
                alt=""
                style={{ width: "45px", height: "45px" }}
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">{user.fullName}</p>
                <p className="text-muted mb-0">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="col-9 row m-0 p-0"
          style={{ height: window.innerHeight - 200 }}
        >
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
