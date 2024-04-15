import React, { useEffect, useState } from "react";
import { get4RandCategories } from "../../../service/category-service";
import Loading from "../../common/Loading";
import { getMaxPriceProduct } from "../../../service/product-service";

const initCategory = { id: -1, name: "Tất cả" };

const initPrice = { priceFrom: 0, priceTo: 0 };

const Sidebar = (props: any) => {
  const { onChoiceCategory, onSearchPrice } = props;
  const [categories, setCategories] = useState<any>();
  const [category, setCategory] = useState(initCategory);
  const [price, setPrice] = useState<any>(initPrice);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    getMaxPriceProduct().then((res: any) => setMaxPrice(res));
  }, []);

  useEffect(() => {
    get4RandCategories().then((res: any) => {
      const cates = [initCategory, ...res];
      setCategories(cates);
    });
  }, []);

  const handleChoiceCategory = (cate: any) => {
    onChoiceCategory(cate);
    setCategory(cate);
  };

  const handleRangeChange = (e: any) => {
    const { value } = e.target;
    setPrice({ ...price, priceTo: +value });
  };

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;
    if (value >= 0 && value <= maxPrice) {
      setPrice({ ...price, [name]: +value });
    } else if (name === "priceFrom") {
      setPrice({ ...price, priceFrom: 0 });
    } else if (name === "priceTo") {
      setPrice({ ...price, priceTo: maxPrice });
    }
  };

  const handleApplyPrice = () => {
    onSearchPrice(price);
  };

  const handleClearPrice = () => {
    onSearchPrice({ priceFrom: null, priceTo: null });
    setPrice(initPrice);
  };

  if (!categories) return <Loading />;

  return (
    <div className="col-lg-4">
      <button
        className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>Show filter</span>
      </button>
      <div
        className="collapse card d-lg-block mb-5"
        id="navbarSupportedContent"
      >
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Danh mục
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <div className="list-group list-group-light">
                  {categories.map((cate: any) => (
                    <button
                      onClick={() => handleChoiceCategory(cate)}
                      key={cate.id}
                      className={`list-group-item list-group-item-action px-3 border-0 ${
                        category.id === cate.id ? "active" : ""
                      }`}
                      aria-current="true"
                    >
                      {cate.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Price
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <div className="range">
                  <input
                    type="range"
                    className="form-range"
                    id="customRange1"
                    onChange={handleRangeChange}
                    min={0}
                    max={maxPrice}
                    value={price.priceTo}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <p className="mb-0">
                      {`Min: ${price.priceFrom.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`}
                    </p>
                    <div className="form-outline">
                      <input
                        type="number"
                        id="typeNumber"
                        className="form-control"
                        name="priceFrom"
                        onChange={handlePriceChange}
                        value={price.priceFrom}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="mb-0">{`Max: ${price.priceTo.toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}`}</p>
                    <div className="form-outline">
                      <input
                        type="number"
                        id="typeNumber"
                        className="form-control"
                        name="priceTo"
                        onChange={handlePriceChange}
                        value={price.priceTo}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100  mb-2"
                  onClick={handleApplyPrice}
                >
                  apply
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 "
                  onClick={handleClearPrice}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseTwo"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Brands
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <div>
                  {/* Checked checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked1"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked1"
                    >
                      Mercedes
                    </label>
                    <span className="badge badge-secondary float-end">120</span>
                  </div>
                  {/* Checked checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked2"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked2"
                    >
                      Toyota
                    </label>
                    <span className="badge badge-secondary float-end">15</span>
                  </div>
                  {/* Checked checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked3"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked3"
                    >
                      Mitsubishi
                    </label>
                    <span className="badge badge-secondary float-end">35</span>
                  </div>
                  {/* Checked checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked4"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked4"
                    >
                      Nissan
                    </label>
                    <span className="badge badge-secondary float-end">89</span>
                  </div>
                  {/* Default checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Honda
                    </label>
                    <span className="badge badge-secondary float-end">30</span>
                  </div>
                  {/* Default checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Suzuki
                    </label>
                    <span className="badge badge-secondary float-end">30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseFour"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFour"
              >
                Size
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFour"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <input
                  type="checkbox"
                  className="btn-check border justify-content-center"
                  id="btn-check1"
                  checked
                  autoComplete="off"
                />
                <label
                  className="btn btn-white mb-1 px-1"
                  style={{ width: "60px" }}
                  htmlFor="btn-check1"
                >
                  XS
                </label>
                <input
                  type="checkbox"
                  className="btn-check border justify-content-center"
                  id="btn-check2"
                  checked
                  autoComplete="off"
                />
                <label
                  className="btn btn-white mb-1 px-1"
                  style={{ width: "60px" }}
                  htmlFor="btn-check2"
                >
                  SM
                </label>
                <input
                  type="checkbox"
                  className="btn-check border justify-content-center"
                  id="btn-check3"
                  checked
                  autoComplete="off"
                />
                <label
                  className="btn btn-white mb-1 px-1"
                  style={{ width: "60px" }}
                  htmlFor="btn-check3"
                >
                  LG
                </label>
                <input
                  type="checkbox"
                  className="btn-check border justify-content-center"
                  id="btn-check4"
                  checked
                  autoComplete="off"
                />
                <label
                  className="btn btn-white mb-1 px-1"
                  style={{ width: "60px" }}
                  htmlFor="btn-check4"
                >
                  XXL
                </label>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseFive"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFive"
              >
                Ratings
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                {/* Default checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                  </label>
                </div>
                {/* Default checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-secondary"></i>
                  </label>
                </div>
                {/* Default checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-secondary"></i>
                    <i className="fas fa-star text-secondary"></i>
                  </label>
                </div>
                {/* Default checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-secondary"></i>
                    <i className="fas fa-star text-secondary"></i>
                    <i className="fas fa-star text-secondary"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
