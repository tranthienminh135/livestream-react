import React from "react";

const Recommended = () => {
  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>Recommended items</h3>
        </header>

        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
              <div className="mask px-2" style={{ height: "50px" }}>
                <div className="d-flex justify-content-between">
                  <h6>
                    <span className="badge bg-danger pt-1 mt-3 ms-2">New</span>
                  </h6>
                  <a href="#">
                    <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                  </a>
                </div>
              </div>
              <a href="#" className="">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                  className="card-img-top rounded-2"
                />
              </a>
              <div className="card-body d-flex flex-column pt-3 border-top">
                <a href="#" className="nav-link">
                  Gaming Headset with Mic
                </a>
                <div className="price-wrap mb-2">
                  <strong className="">$18.95</strong>
                  <del className="">$24.99</del>
                </div>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                  <a href="#" className="btn btn-outline-primary w-100">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
              <div className="mask px-2" style={{ height: "50px" }}>
                <a href="#">
                  <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                </a>
              </div>
              <a href="#" className="">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                  className="card-img-top rounded-2"
                />
              </a>
              <div className="card-body d-flex flex-column pt-3 border-top">
                <a href="#" className="nav-link">
                  Apple Watch Series 1 Sport{" "}
                </a>
                <div className="price-wrap mb-2">
                  <strong className="">$120.00</strong>
                </div>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                  <a href="#" className="btn btn-outline-primary w-100">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card px-4 border shadow-0">
              <div className="mask px-2" style={{ height: "50px" }}>
                <a href="#">
                  <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                </a>
              </div>
              <a href="#" className="">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                  className="card-img-top rounded-2"
                />
              </a>
              <div className="card-body d-flex flex-column pt-3 border-top">
                <a href="#" className="nav-link">
                  Men's Denim Jeans Shorts
                </a>
                <div className="price-wrap mb-2">
                  <strong className="">$80.50</strong>
                </div>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                  <a href="#" className="btn btn-outline-primary w-100">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card px-4 border shadow-0">
              <div className="mask px-2" style={{ height: "50px" }}>
                <a href="#">
                  <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                </a>
              </div>
              <a href="#" className="">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                  className="card-img-top rounded-2"
                />
              </a>
              <div className="card-body d-flex flex-column pt-3 border-top">
                <a href="#" className="nav-link">
                  Mens T-shirt Cotton Base Layer Slim fit{" "}
                </a>
                <div className="price-wrap mb-2">
                  <strong className="">$13.90</strong>
                </div>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                  <a href="#" className="btn btn-outline-primary w-100">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommended;
