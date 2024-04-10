import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Heading from "./heading/Heading";
import Pagination from "./pagination/Pagination";
import Loading from "../common/Loading";
import { getAllPageProduct } from "../../service/product-service";
import { useNavigate } from "react-router-dom";

const initParam = {
  page: 0,
  size: 5,
  sortDirection: "DESC",
  sortBy: "createdDate",
  name: "",
};

const ProductApp = () => {
  const [products, setProducts] = useState<any>();
  const [param, setParam] = useState(initParam);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProductPage(param);
  }, []);

  const fetchAllProductPage = (param: any) => {
    getAllPageProduct(param).then((res: any) => {
      setProducts(res);
    });
  };

  const handleShowDetailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (!products) return <Loading />;
  return (
    <>
      <Heading />
      <div className="container">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9">
            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
              <strong className="d-block py-2">32 Items found </strong>
              <div className="ms-auto">
                <select className="form-select d-inline-block w-auto border pt-1">
                  <option value="0">Best match</option>
                  <option value="1">Recommended</option>
                  <option value="2">High rated</option>
                  <option value="3">Randomly</option>
                </select>
                <div className="btn-group shadow-0 border">
                  <a href="#" className="btn btn-light" title="List view">
                    <i className="fa fa-bars fa-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-light active"
                    title="Grid view"
                  >
                    <i className="fa fa-th fa-lg"></i>
                  </a>
                </div>
              </div>
            </header>

            {products.content.map((product: any) => (
              <div className="row justify-content-center mb-3">
                <div className="col-md-12">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row g-0">
                        <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                            <img
                              src={`data:image/jpeg;base64,${product.cover}`}
                              className="w-100"
                            />
                            <button
                              className="btn"
                              onClick={() =>
                                handleShowDetailProduct(product.id)
                              }
                            >
                              <div className="hover-overlay">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor:
                                      "rgba(253, 253, 253, 0.15)",
                                  }}
                                ></div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-5 col-sm-7">
                          <h5>{product.name}</h5>
                          <div className="d-flex flex-row">
                            <div className="text-warning mb-1 me-2">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fas fa-star-half-alt"></i>
                              <span className="ms-1">4.5</span>
                            </div>
                            <span className="text-muted">
                              {product.productOrders.length} orders
                            </span>
                          </div>

                          <p className="text mb-4 mb-md-0">
                            {product.description}
                          </p>
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-5">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">
                              {product.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </h4>
                            <span className="text-danger">
                              <s>$190</s>
                            </span>
                          </div>
                          <h6 className="text-success">Free shipping</h6>
                          <div className="mt-4">
                            <button
                              className="btn btn-primary shadow-0"
                              type="button"
                            >
                              Buy this
                            </button>
                            <a
                              href="#!"
                              className="btn btn-light border px-2 pt-2 icon-hover"
                            >
                              <i className="fas fa-heart fa-lg px-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductApp;
