import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../config/redux/redux-hook";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../../config/redux/slide/user-slice";
import { handleLogout } from "../../service/auth-service";
import { useRef, useState } from "react";
import { isLogin } from "../../common/render";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { getCart, getCartSize } from "../../config/redux/slide/cart-slice";
import {
  commonActions,
  getSearch,
} from "../../config/redux/slide/common-slice";

const HeaderBar = () => {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector(getCartSize);
  const [searchValue, setSearchValue] = useState<string>();
  const inputRef = useRef<any>();
  const searchRedux = useSelector(getSearch);

  const handleLogin = () => {
    navigate("/login");
  };

  const onLogoutHandler = (e: any) => {
    e.preventDefault();
    handleLogout().then((res: any) => {
      navigate("/");
      dispatch(userActions.setUserInfo(initialUserInfoState.info));
      toast("Đăng xuất thành công!!");
    });
  };

  const handleShowUserInfo = () => {
    navigate("/info");
  };

  const renderRoleName = (roleName: string) => {
    switch (roleName) {
      case "ROLE_ADMIN":
        return <span className="text-danger fw-bold">[ADMIN]</span>;
      case "ROLE_USER":
        return <span className="text-info fw-bold">[USER]</span>;
      default:
        break;
    }
  };

  const handleShowCart = () => {
    navigate("/cart");
  };

  const handleSearchChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearch = () => {
    dispatch(commonActions.setSearch({ ...searchRedux, navBar: searchValue }));
    navigate(`/product`);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    dispatch(commonActions.setSearch({ ...searchRedux, navBar: "" }));
  };

  return (
    <header>
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-2 col-sm-4 col-4">
              <Link to="/" className="float-start">
                <img
                  src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                  height="35"
                />
              </Link>
            </div>

            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end">
                {!isLogin(userInfo) && (
                  <button
                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                    onClick={handleLogin}
                  >
                    <i className="fas fa-user-alt m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">Sign in</p>
                  </button>
                )}
                {isLogin(userInfo) && (
                  <button
                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                    onClick={handleShowCart}
                  >
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">{totalQuantity}</p>
                  </button>
                )}
                {isLogin(userInfo) && (
                  <MDBDropdown>
                    <MDBDropdownToggle
                      color="link"
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <i className="fas fa-user-alt m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0">
                        {userInfo.fullName} -{" "}
                        {renderRoleName(userInfo.appRole.roleName)}
                      </p>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={handleShowUserInfo}>
                        Thông tin
                      </MDBDropdownItem>
                      <MDBDropdownItem link>Wishlist</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => navigate("/chat")}>
                        Chat
                      </MDBDropdownItem>
                      <MDBDropdownItem divider />
                      <MDBDropdownItem link onClick={onLogoutHandler}>
                        Logout
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                )}
              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-12">
              <div className="input-group float-center">
                <div className="form-outline">
                  <input
                    type="text"
                    id="form1"
                    className="form-control"
                    name="searchValue"
                    value={searchValue}
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                    ref={inputRef}
                    onChange={handleSearchChange}
                  />
                </div>
                {searchValue && (
                  <button
                    type="button"
                    className="btn btn-danger shadow-0"
                    onClick={handleClearSearch}
                  >
                    <i className="fas fa-circle-xmark"></i>
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary shadow-0"
                  onClick={handleSearch}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="container justify-content-center justify-content-md-between">
          <button
            className="navbar-toggler border text-dark py-2"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarLeftAlignExample"
            aria-controls="navbarLeftAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-dark"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-dark"
                  aria-current="page"
                  to={"/product"}
                >
                  Product list
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
