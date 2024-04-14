import React, { useEffect, useState } from "react";
import { get6PopularProduct } from "../../../service/product-service";
import Loading from "../../common/Loading";
import { Link } from "react-router-dom";

const PopularProduct = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    get6PopularProduct().then((res: any) => {
      const arr = res.map((prd: any, index: number) => {
        if (index < 6) return prd;
      });
      const filteredArr = arr.filter((item: any) => item !== undefined);
      setProducts(filteredArr);
    });
  }, []);

  if (!products) return <Loading />;

  return (
    <section className="mt-5 mb-4">
      <div className="container text-dark">
        <header className="">
          <h3 className="section-title">Popular product</h3>
        </header>

        <div className="row gy-3">
          {products.map((product: any) => (
            <div className="col-lg-2 col-md-4 col-4">
              <Link to={`/product/${product.id}`} className="img-wrap">
                <img
                  height="200"
                  width="200"
                  className="img-thumbnail"
                  src={`data:image/jpeg;base64,${product.cover}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;
