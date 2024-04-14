import React, { useEffect, useState } from "react";
import { get4RecommendedProduct } from "../../../service/product-service";
import Loading from "../../common/Loading";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    get4RecommendedProduct().then((res: any) => {
      const arr = res.map((prd: any, index: number) => {
        if (index < 4) return prd;
      });
      const filteredArr = arr.filter((item: any) => item !== undefined);
      setProducts(filteredArr);
    });
  }, []);

  if (!products) return <Loading />;

  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>Recommended</h3>
        </header>

        <div className="row">
          {products.map((product: any) => (
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <Link to={`/product/${product.id}`} className="">
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
                  <p className="card-text mb-0">{product.description}</p>
                  <p className="text-muted">Số lượng: {product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
