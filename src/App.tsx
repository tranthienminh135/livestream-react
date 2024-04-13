import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isLogin } from "./common/render";
import { useAppDispatch } from "./config/redux/redux-hook";
import { getUserInfo, userActions } from "./config/redux/slide/user-slice";
import { findUserInfo } from "./service/user-service";
import Login from "./ui/auth/Login";
import Layout from "./ui/base/Layout";
import CartApp from "./ui/cart/CartApp";
import CheckoutApp from "./ui/checkout/CheckoutApp";
import Loading from "./ui/common/Loading";
import Page404 from "./ui/common/Page404";
import Home from "./ui/home/Home";
import ProductApp from "./ui/product/ProductApp";
import ProductDetailApp from "./ui/product/detail/ProductDetailApp";
import UserApp from "./ui/user/UserApp";
import { showProductInCart } from "./service/order-service";
import { cartActions } from "./config/redux/slide/cart-slice";

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

  useEffect(() => {
    showProductInCart().then((res) => {
      const size = res.reduce((c: any, cart: any) => {
        return c + cart.quantity;
      }, 0);
      dispatch(cartActions.setCartSize(size));
    });
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
          </>
          {isLogin(userInfo) && (
            <>
              <Route path="/cart" element={<CartApp />} />
              <Route path="/checkout" element={<CheckoutApp />} />
            </>
          )}
          {!isLogin(userInfo) && <Route path="/login" element={<Login />} />}
          {isLogin(userInfo) && <Route path="/info" element={<UserApp />} />}
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
