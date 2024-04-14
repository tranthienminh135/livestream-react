import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../config/redux/slide/user-slice";
import { showProductHistory } from "../../service/order-service";

const UserApp = () => {
  const userInfo = useSelector(getUserInfo);
  const [orderHistory, setOrderHistory] = useState<any>();

  useEffect(() => {
    showProductHistory().then((res: any) => {
      const data = [...res];

      const productsByBill: any = {};

      data.forEach((product) => {
        const billId = product.bill.id;

        if (!productsByBill[billId]) {
          productsByBill[billId] = {
            bill: product.bill,
            appUser: product.appUser,
            products: [],
          };
        }

        productsByBill[billId].products.push(product);
      });

      const resultArray = Object.values(productsByBill);

      setOrderHistory(resultArray);
    });
  }, []);

  const renderOrderStatusClass = (status: any) => {
    if (status.id === 1) return "text-primary";
    if (status.id === 2) return "text-danger";
    if (status.id === 3) return "text-success";
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-xl-3">
            <nav className="nav flex-lg-column w-100 d-flex nav-pills mb-4">
              <a className="nav-link my-0 active" href="#">
                <p className="pb-0 mb-0 w-100">Account main</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">New orders</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">Orders history</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">My wishlist</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">Transactions</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">Profile setting</p>
              </a>
              <a className="nav-link my-0 bg-light" href="#">
                <p className="pb-0 mb-0 w-100">Log out</p>
              </a>
            </nav>
          </div>
          <main className="col-lg-9 col-xl-9">
            <div className="card p-4 mb-0 shadow-0 border">
              <div className="content-body">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img
                      src={`data:image/jpeg;base64,${userInfo.avatar}`}
                      className="rounded-circle"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </div>
                  <div className="pt-2">
                    <h6 className="pt-2">{userInfo.fullName}</h6>
                    <p>
                      Email: {userInfo.username}, Phone: {userInfo.phoneNumber}
                      <a href="#" className="px-2">
                        <i className="fa fa-pen"></i>
                      </a>
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row g-2 mb-3">
                  <div className="col-md-12">
                    <div className="border p-3 rounded-3 bg-light">
                      <b className="mx-2 text-muted">
                        <i className="fa fa-map-marker-alt"></i>
                      </b>
                      {userInfo.address}
                    </div>
                  </div>
                </div>

                <a href="#" className="btn btn-light border">
                  <i className="me-2 fa fa-plus"></i> Add new address
                </a>

                <hr className="my-4" />

                <h5 className="mb-3">Your orders</h5>
                {orderHistory?.map((oh: any) => (
                  <div
                    className="card border border-primary mb-4 shadow-0"
                    key={oh.id}
                  >
                    <div className="card-body pb-0">
                      <header className="d-lg-flex">
                        <div className="flex-grow-1">
                          <h6 className="mb-0">
                            Order ID: {oh.bill.code} <i className="dot"></i>
                            <span
                              className={renderOrderStatusClass(
                                oh.bill.orderStatus
                              )}
                            >
                              {oh.bill.orderStatus.name}
                            </span>
                          </h6>
                          <span className="text-muted">
                            Date:{" "}
                            {new Date(oh.bill.orderDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <a href="#" className="btn btn-sm btn-outline-danger">
                            Cancel order
                          </a>
                          <a
                            href="#"
                            className="btn btn-sm btn-primary shadow-0"
                          >
                            Track order
                          </a>
                        </div>
                      </header>
                      <hr />
                      <div className="row">
                        <div className="col-lg-4">
                          <p className="mb-0 text-muted">Contact</p>
                          <p className="m-0">
                            {oh.appUser.fullName} <br />
                            Phone: {oh.bill.currentPhoneNumber} <br />
                            Email: {oh.appUser.username}
                          </p>
                        </div>
                        <div className="col-lg-4 border-start">
                          <p className="mb-0 text-muted">Shipping address</p>
                          <p className="m-0">{oh.bill.currentAddress}</p>
                        </div>
                        <div className="col-lg-4 border-start">
                          <p className="mb-0 text-muted">Payment</p>
                          <p className="m-0">
                            <span className="text-success">
                              {oh.bill.paymentStatus.name}
                            </span>
                            <br />
                            Shipping fee: $56 <br />
                            {`Total paid: ${oh.bill.totalPrice.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}`}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <ul className="row list-unstyled">
                        {oh.products.map((po: any) => (
                          <li className="col-xl-4 col-lg-6">
                            <div className="d-flex mb-3 mb-xl-0">
                              <div className="me-3">
                                <img
                                  width="72"
                                  height="72"
                                  src={`data:image/jpeg;base64,${po.currentCover}`}
                                  className="img-sm rounded border"
                                />
                              </div>
                              <div className="">
                                <p className="mb-0">{po.product.name}</p>
                                <strong>
                                  {" "}
                                  {po.quantity}x ={" "}
                                  {po.currentPrice.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}{" "}
                                </strong>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default UserApp;
