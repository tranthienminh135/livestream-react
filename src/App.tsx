import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isAdmin, isLogin } from "./common/render";
import { useAppDispatch } from "./config/redux/redux-hook";
import { getUserInfo, userActions } from "./config/redux/slide/user-slice";
import { findUserInfo } from "./service/user-service";
import Login from "./ui/auth/Login";
import Home from "./ui/home/Home";
import Layout from "./ui/base/Layout";
import Create from "./ui/customer/Create";
import CustomerApp from "./ui/customer/CustomerApp";
import Edit from "./ui/customer/Edit";
import Page404 from "./ui/common/Page404";
import Loading from "./ui/common/Loading";
import ProductApp from "./ui/product/ProductApp";
import CartApp from "./ui/cart/CartApp";
import UserApp from "./ui/user/UserApp";
import ProductDetailApp from "./ui/product/detail/ProductDetailApp";
import CheckoutApp from "./ui/checkout/CheckoutApp";

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
          <>
            <Route path={"/product"} element={<ProductApp />} />
            <Route path={"/product/:id"} element={<ProductDetailApp />} />
            <Route path="/cart" element={<CartApp />} />
            <Route path="/checkout" element={<CheckoutApp />} />
          </>
          {isLogin(userInfo) && <Route path="/login" element={<Login />} />}
          {!isLogin(userInfo) && <Route path="/info" element={<UserApp />} />}
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
