import React, { useCallback, useEffect, useMemo, useState } from "react";
import Recommended from "./recommended/Recommended";
import Loading from "../common/Loading";
import { showProductInCart } from "../../service/order-service";
import { addToCart } from "../../service/product-service";
import { toast } from "react-toastify";
import RemoveProduct from "./modal/RemoveProduct";
import { cartActions } from "../../config/redux/slide/cart-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartApp = () => {
  const [carts, setCarts] = useState<any>();
  const [staticModal, setStaticModal] = useState(false);
  const [cart, setCart] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onShowProductInCart();
  }, []);

  const onShowProductInCart = () => {
    showProductInCart().then((res) => {
      const size = res.reduce((c: any, cart: any) => {
        return c + cart.quantity;
      }, 0);
      dispatch(cartActions.setCartSize(size));
      setCarts(res);
    });
  };

  const onAddToCart = (quantity: number, product: any) => {
    const obj = {
      productId: product.id,
      quantity,
    };
    addToCart(obj).then((res: any) => {
      onShowProductInCart();
    });
  };

  const onConfirmDelete = () => {
    onAddToCart(-1, cart.product);
    setStaticModal(false);
  };

  const handleQuantityChange = (quantity: number, cart: any) => {
    if (cart.quantity <= 1 && quantity === -1) {
      setCart(cart);
      setStaticModal(true);
    } else {
      onAddToCart(quantity, cart.product);
    }
  };

  const totalPrice = useMemo(() => {
    if (carts)
      return carts.reduce((c: any, cart: any) => {
        return c + cart.product.price * cart.quantity;
      }, 0);
  }, [carts]);

  const handleMakePurchase = () => {
    navigate("/checkout");
  };

  if (!carts) return <Loading />;

  return (
    <>
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* cart */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>

                  {carts.map((cart: any) => (
                    <div className="row gy-3 mb-4" key={cart.id}>
                      <div className="col-lg-5">
                        <div className="me-lg-5">
                          <div className="d-flex">
                            <img
                              src={`data:image/jpeg;base64,${cart.product.cover}`}
                              className="border rounded me-3"
                              style={{ width: "96px", height: "96px" }}
                            />
                            <div className="">
                              <a href="#" className="nav-link">
                                {cart.product.name}
                              </a>
                              <p className="text-muted">
                                Số lượng: {cart.product.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <div className="btn-group btn-group-md" role="group">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleQuantityChange(-1, cart)}
                            >
                              -
                            </button>
                            <button type="button" className="btn" disabled>
                              {cart.quantity}
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleQuantityChange(1, cart)}
                              disabled={cart.product.quantity === cart.quantity}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          className="ms-2"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            textAlign: "center",
                          }}
                        >
                          <div className="h6">
                            <div>
                              {(
                                cart.product.price * cart.quantity
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </div>
                            <small className="text-muted text-nowrap">
                              {cart.product.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                              / per item
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                          <a
                            href="#!"
                            className="btn btn-light border px-2 icon-hover-primary"
                          >
                            <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                          </a>
                          <a
                            href="#"
                            className="btn btn-light border text-danger icon-hover-danger"
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg"></i> Free
                    Delivery within 1-2 weeks
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            {/* cart */}
            {/* summary */}
            <div className="col-lg-3">
              <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label">Have coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border"
                          name=""
                          placeholder="Coupon code"
                        />
                        <button className="btn btn-light border">Apply</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">$329.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">-$60.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">TAX:</p>
                    <p className="mb-2">$14.00</p>
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

                  <div className="mt-3">
                    <button
                      onClick={handleMakePurchase}
                      className="btn btn-success w-100 shadow-0 mb-2"
                    >
                      Make Purchase
                    </button>
                    <a href="#" className="btn btn-light w-100 border mt-2">
                      Back to shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* summary */}
          </div>
        </div>
      </section>
      <Recommended />
      {cart && (
        <RemoveProduct
          staticModal={staticModal}
          setStaticModal={setStaticModal}
          cart={cart}
          confirmDelete={onConfirmDelete}
        />
      )}
    </>
  );
};

export default CartApp;
