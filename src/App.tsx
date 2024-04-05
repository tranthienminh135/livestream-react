import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isAdmin, isLogin } from "./common/render";
import { useAppDispatch } from "./config/redux/redux-hook";
import { getUserInfo, userActions } from "./config/redux/slide/user-slice";
import { findUserInfo } from "./service/user-service";
import Login from "./ui/auth/Login";
import Home from "./ui/base/Home";
import Layout from "./ui/base/Layout";
import Create from "./ui/customer/Create";
import CustomerApp from "./ui/customer/CustomerApp";
import Edit from "./ui/customer/Edit";
import Page404 from "./ui/common/Page404";
import Loading from "./ui/common/Loading";

function App() {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userInfo.userName) {
      findUserInfo()
        .then((res: any) => {
          dispatch(userActions.setUserInfo(res));
        })
        .catch(() => {})
        .finally(() => {
          setLoading(true);
        });
    }
  }, []);

  if (!loading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {isAdmin(userInfo) && (
            <>
              <Route path={"/customer"} element={<CustomerApp />} />
              <Route path="/customer/create" element={<Create />} />
              <Route path="/customer/edit/:id" element={<Edit />} />
            </>
          )}
          {isLogin(userInfo) && <Route path="/login" element={<Login />} />}
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
