import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../config/redux/slide/user-slice";
import { showProductHistory } from "../../service/order-service";

const UserApp = () => {
  const userInfo = useSelector(getUserInfo);
  const [orderHistory, setOrderHistory] = useState<any>();

  useEffect(() => {
    showProductHistory().then((res: any) => {
      setOrderHistory(res);
      console.log(res);
      res.map((oh: any) => {
        console.log(oh.bill.id);
      });
    });
  }, []);

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
                  <div className="col-md-6">
                    <div className="border p-3 rounded-3 bg-light">
                      <b className="mx-2 text-muted">
                        <i className="fa fa-map-marker-alt"></i>
                      </b>
                      United States, 3601 Old Capitol Trail, Unit A-7, Suite
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border p-3 rounded-3 bg-light">
                      <b className="mx-2 text-muted">
                        <i className="fa fa-map-marker-alt"></i>
                      </b>
                      Moscow city, Street name, Building lenin, House 77
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
                            <span className="text-success"> Shipped</span>
                          </h6>
                          <span className="text-muted">
                            Date: 16 December 2022
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
                            Mike Johnatan <br />
                            Phone: 371-295-9131 <br />
                            Email: info@mywebsite.com
                          </p>
                        </div>
                        <div className="col-lg-4 border-start">
                          <p className="mb-0 text-muted">Shipping address</p>
                          <p className="m-0">
                            United States <br />
                            3601 Old Capitol Trail, Unit A-7, Suite 170777,
                            Wilmington, DE 19808
                          </p>
                        </div>
                        <div className="col-lg-4 border-start">
                          <p className="mb-0 text-muted">Payment</p>
                          <p className="m-0">
                            <span className="text-success">
                              {" "}
                              Visa **** 4216{" "}
                            </span>{" "}
                            <br />
                            Shipping fee: $56 <br />
                            Total paid: $456
                          </p>
                        </div>
                      </div>
                      <hr />
                      <ul className="row list-unstyled">
                        <li className="col-xl-4 col-lg-6">
                          <div className="d-flex mb-3 mb-xl-0">
                            <div className="me-3">
                              <img
                                width="72"
                                height="72"
                                src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                                className="img-sm rounded border"
                              />
                            </div>
                            <div className="">
                              <p className="mb-0">
                                T-shirts with multiple colors
                              </p>
                              <strong> 2x = $25.98 </strong>
                            </div>
                          </div>
                        </li>
                        <li className="col-xl-4 col-lg-6">
                          <div className="d-flex mb-3 mb-xl-0">
                            <div className="me-3">
                              <img
                                width="72"
                                height="72"
                                src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                                className="img-sm rounded border"
                              />
                            </div>
                            <div className="">
                              <p className="mb-0">Gaming Headset 32db Black</p>
                              <strong> 2x = $339.90 </strong>
                            </div>
                          </div>
                        </li>
                        <li className="col-xl-4 col-lg-6">
                          <div className="d-flex mb-3 mb-md-0">
                            <div className="me-3">
                              <img
                                width="72"
                                height="72"
                                src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                                className="img-sm rounded border"
                              />
                            </div>
                            <div className="">
                              <p className="mb-0">
                                Apple Watch Series 4 Space Gray
                              </p>
                              <strong> 2x = $339.90 </strong>
                            </div>
                          </div>
                        </li>
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
