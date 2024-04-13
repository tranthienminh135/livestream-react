import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../config/redux/redux-hook";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../../config/redux/slide/user-slice";
import { handleLogout } from "../../service/auth-service";
import { useState } from "react";
import { isLogin } from "../../common/render";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { getCart, getCartSize } from "../../config/redux/slide/cart-slice";

const HeaderBar = () => {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector(getCartSize);

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
                      <MDBDropdownItem link>
                        Something else here
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
                  <input type="search" id="form1" className="form-control" />
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                </div>
                <button type="button" className="btn btn-primary shadow-0">
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
                <a className="nav-link text-dark" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Hot offers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Gift boxes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Menu item
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Menu name
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark mb-0"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Others
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
