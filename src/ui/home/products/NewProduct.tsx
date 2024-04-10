import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import { get8NewProduct } from "../../../service/product-service";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const find8New = () => {
      get8NewProduct().then((res) => setProducts(res));
    };
    find8New();
  }, []);

  if (!products) return <Loading />;

  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>New products</h3>
        </header>

        <div className="row">
          {products.map((product: any) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <div className="card my-2 shadow-0">
                <Link to={`/product/${product.id}`} className="">
                  <div className="mask" style={{ height: "50px" }}>
                    <div className="d-flex justify-content-start align-items-start h-100 m-2">
                      <h6>
                        <span className="badge bg-danger pt-1">New</span>
                      </h6>
                    </div>
                  </div>
                  <img
                    src={`data:image/jpeg;base64,${product.cover}`}
                    className="card-img-top rounded-2"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </Link>
                <div className="card-body p-0 pt-3">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                  </a>
                  <h5 className="card-title">
                    {product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                  <p className="card-text mb-0">{product.name}</p>
                  <p className="text-muted">
                    Category: {product.category.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProduct;
