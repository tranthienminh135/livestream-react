import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, getAllPageProduct } from "../../service/product-service";
import Loading from "../common/Loading";
import Heading from "./heading/Heading";
import Pagination from "./pagination/Pagination";
import Sidebar from "./sidebar/Sidebar";
import { useSelector } from "react-redux";
import { getSearch } from "../../config/redux/slide/common-slice";
import { useAppDispatch } from "../../config/redux/redux-hook";
import { cartActions } from "../../config/redux/slide/cart-slice";
import { toast } from "react-toastify";
import { isLogin } from "../../common/render";
import { getUserInfo } from "../../config/redux/slide/user-slice";

const initParam = {
  page: 0,
  size: 5,
  sortDirection: "DESC",
  sortBy: "createdDate",
  name: "",
  categoryId: -1,
  priceFrom: null,
  priceTo: null,
};

const ProductApp = () => {
  const [products, setProducts] = useState<any>();
  const [param, setParam] = useState(initParam);
  const navigate = useNavigate();
  const searchRedux = useSelector(getSearch);
  const dispatch = useAppDispatch();
  const [carts, setCarts] = useState<any>();
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    fetchAllProductPage({ ...param, name: searchRedux.navBar });
    setParam({ ...param, name: searchRedux.navBar });
  }, [searchRedux]);

  const fetchAllProductPage = (param: any) => {
    getAllPageProduct(param).then((res: any) => {
      setProducts(res);
    });
  };

  const handleShowDetailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleChoiceCategory = (cate: any) => {
    const data = { ...param, categoryId: cate.id };
    fetchAllProductPage(data);
    setParam(data);
  };

  const handlePageChange = (page: number) => {
    const data = { ...param, page };
    fetchAllProductPage(data);
    setParam(data);
  };

  const handleSortChange = (e: any) => {
    const { value } = e.target;
    let data = { ...param };
    switch (value) {
      case "new":
        data = { ...param, sortDirection: "DESC", sortBy: "createdDate" };
        break;
      case "old":
        data = { ...param, sortDirection: "ASC", sortBy: "createdDate" };
        break;
      case "lowToHigh":
        data = { ...param, sortDirection: "ASC", sortBy: "price" };
        break;
      case "highToLow":
        data = { ...param, sortDirection: "DESC", sortBy: "price" };
        break;
      default:
        break;
    }
    fetchAllProductPage(data);
    setParam(data);
  };

  const handleSearchPrice = (price: any) => {
    const data = {
      ...param,
      priceFrom: price.priceFrom,
      priceTo: price.priceTo,
    };
    fetchAllProductPage(data);
    setParam(data);
  };

  const onAddToCart = (product: any) => {
    const obj = {
      productId: product.id,
      quantity: 1,
    };
    onAddToCartHandler(obj, product);
  };

  const onAddToCartHandler = (obj: any, product: any) => {
    addToCart(obj).then((res: any) => {
      const size = res.reduce((c: any, cart: any) => {
        return c + cart.quantity;
      }, 0);
      setCarts(res);
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
    <>
      <Heading />
      <div className="container">
        <div className="row">
          <Sidebar
            onChoiceCategory={handleChoiceCategory}
            onSearchPrice={handleSearchPrice}
          />
          <div className="col-lg-8">
            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
              <strong className="d-block py-2">
                {products.numberOfElements} Items found
              </strong>
              <div className="ms-auto">
                <select
                  className="form-select d-inline-block w-auto border pt-1"
                  onChange={handleSortChange}
                >
                  <option value="new">Mới nhất</option>
                  <option value="old">Cũ nhất</option>
                  <option value="highToLow">Giá từ cao đến thấp</option>
                  <option value="lowToHigh">Giá từ thấp đến cao</option>
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
            {products.content.length <= 0 && (
              <div className="text-center">No data</div>
            )}
            {products.content.map((product: any) => (
              <div className="row justify-content-center mb-3" key={product.id}>
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
                            <span className="text-muted">orders</span>
                          </div>

                          <p className="text mb-4 mb-md-0">
                            Số lượng: {product.quantity}
                          </p>
                          <p className="text mb-4 mb-md-0">
                            {`Ngày bán: ${new Date(
                              product.createdDate
                            ).toLocaleDateString()}`}
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
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to Cart
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
            {products.content.length > 0 && (
              <Pagination products={products} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductApp;
