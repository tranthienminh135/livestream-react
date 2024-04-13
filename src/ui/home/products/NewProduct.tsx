import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import { addToCart, get8NewProduct } from "../../../service/product-service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../config/redux/slide/user-slice";
import { isLogin } from "../../../common/render";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../config/redux/redux-hook";
import { cartActions } from "../../../config/redux/slide/cart-slice";

const NewProduct = () => {
  const [products, setProducts] = useState<any>();
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const find8New = () => {
      get8NewProduct().then((res) => setProducts(res));
    };
    find8New();
  }, []);

  const onAddToCart = (product: any) => {
    const obj = {
      productId: product.id,
      quantity: 1,
    };
    addToCart(obj).then((res: any) => {
      const size = res.reduce((c: any, cart: any) => {
        return c + cart.quantity;
      }, 0);
      console.log(size);
      dispatch(cartActions.setCartSize(size));
      toast(`Thêm thành công! ${product.name}`);
    });
  };

  const handleAddToCart = (product: any) => {
    if (isLogin(userInfo)) {
      onAddToCart(product);
    } else {
      toast("Vui lòng đăng nhập!!");
    }
  };

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
                        <span className="badge bg-danger pt-1">Mới</span>
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
                  <button className="btn btn-light border px-2 pt-2 float-end icon-hover">
                    <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-cart-shopping fa-lg px-1 text-secondary"></i>
                  </button>

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
