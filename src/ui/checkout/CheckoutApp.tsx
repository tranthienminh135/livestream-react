import React, { useEffect, useMemo, useState } from "react";
import { payment, showProductInCart } from "../../service/order-service";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../config/redux/slide/user-slice";
import { useNavigate } from "react-router-dom";
import { getAllPaymentStatus } from "../../service/payment-status-service";
import ConfirmPaymentModal from "./modal/ConfirmPaymentModal";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../config/redux/redux-hook";
import { cartActions } from "../../config/redux/slide/cart-slice";

const initPaymentValue = {
  paymentStatusId: 1,
  messageToSeller: "",
};

const CheckoutApp = () => {
  const [carts, setCarts] = useState<any>();
  const userInfo = useSelector(getUserInfo);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<any>();
  const [staticModal, setStaticModal] = useState(false);
  const [paymentValue, setPaymentValue] = useState<any>(initPaymentValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllPaymentStatus = () => {
      getAllPaymentStatus().then((res: any) => setPaymentStatus(res));
    };
    fetchAllPaymentStatus();
  }, []);

  useEffect(() => {
    onShowProductInCart();
  }, []);

  const onShowProductInCart = () => {
    showProductInCart().then((res) => {
      setCarts(res);
    });
  };

  const totalPrice = useMemo(() => {
    if (carts)
      return carts.reduce((c: any, cart: any) => {
        return c + cart.product.price * cart.quantity;
      }, 0);
  }, [carts]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPaymentValue({ ...paymentValue, [name]: value });
  };

  const onConfirmPayment = () => {
    payment(paymentValue).then(() => {
      navigate("/info");
      dispatch(cartActions.setCartSize(0));
      toast("Thanh toán thành công!!");
    });
    setStaticModal(false);
  };

  if (!carts) return <Loading />;

  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 mb-4">
            <div className="card mb-4 border shadow-0">
              <div className="p-4 d-flex justify-content-between">
                <div className="">
                  <h5>Have an account?</h5>
                  <p className="mb-0 text-wrap ">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                  <a
                    href="#"
                    className="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100"
                  >
                    Register
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary shadow-0 text-nowrap w-100"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </div>

            {/* Checkout */}
            <div className="card shadow-0 border">
              <div className="p-4">
                <h5 className="card-title mb-3">Guest checkout</h5>
                <div className="row">
                  <div className="col-6 mb-3">
                    <p className="mb-0">Full name</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        defaultValue={userInfo.fullName}
                      />
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <p className="mb-0">Email</p>
                    <div className="form-outline">
                      <input
                        type="email"
                        id="typeEmail"
                        placeholder="example@gmail.com"
                        className="form-control"
                        value={userInfo.username}
                      />
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <p className="mb-0">Phone</p>
                    <div className="form-outline">
                      <input
                        type="tel"
                        id="typePhone"
                        defaultValue={userInfo.phoneNumber}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <p className="mb-0">Address</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        defaultValue={userInfo.address}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Keep me up to date on news
                  </label>
                </div>

                <hr className="my-4" />

                <h5 className="card-title mb-3">Shipping info</h5>

                <div className="row mb-3">
                  {paymentStatus?.map((stt: any) => (
                    <div className="col-lg-4 mb-3" key={stt.id}>
                      {/* Default checked radio */}
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentStatusId"
                            id={`flexRadioDefault1${stt.id}`}
                            value={stt.id}
                            onChange={handleChange}
                            checked={+paymentValue.paymentStatusId === stt.id}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexRadioDefault1${stt.id}`}
                          >
                            {stt.name} <br />
                            <small className="text-muted">
                              3-4 days via Fedex{" "}
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <p className="mb-0">Message to seller</p>
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      id="textAreaExample1"
                      rows={2}
                      name="messageToSeller"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="float-end">
                  <button
                    className="btn btn-light border"
                    onClick={() => navigate("/cart")}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-success shadow-0 border"
                    onClick={() => setStaticModal(true)}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
            {/* Checkout */}
          </div>
          <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
            <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: "320px" }}>
              <h6 className="mb-3">Summary</h6>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2">$195.90</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Discount:</p>
                <p className="mb-2 text-danger">- $60.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Shipping cost:</p>
                <p className="mb-2">+ $14.00</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2 fw-bold">
                  {totalPrice.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <div className="input-group mt-3 mb-4">
                <input
                  type="text"
                  className="form-control border"
                  name=""
                  placeholder="Promo code"
                />
                <button className="btn btn-light text-primary border">
                  Apply
                </button>
              </div>

              <hr />
              <h6 className="text-dark my-4">Items in cart</h6>

              {carts.map((cart: any) => (
                <div className="d-flex align-items-center mb-4" key={cart.id}>
                  <div className="me-3 position-relative">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                      {cart.quantity}
                    </span>
                    <img
                      src={`data:image/jpeg;base64,${cart.product.cover}`}
                      style={{ width: "96px", height: "96px" }}
                      className="img-sm rounded border"
                    />
                  </div>
                  <div className="">
                    <a href="#" className="nav-link">
                      {cart.product.name} <br />
                      <small className="text-muted text-nowrap">
                        {cart.product.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                        / per item
                      </small>
                    </a>
                    <div className="price text-muted">
                      Tổng tiền:{" "}
                      {(cart.product.price * cart.quantity).toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ConfirmPaymentModal
        staticModal={staticModal}
        setStaticModal={setStaticModal}
        confirm={onConfirmPayment}
      />
    </section>
  );
};

export default CheckoutApp;
