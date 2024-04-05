import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLogin } from "../../common/render";
import { useAppDispatch } from "../../config/redux/redux-hook";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../../config/redux/slide/user-slice";
import { handleLogout } from "../../service/auth-service";

const HeaderBar = () => {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNavigateCustomer = () => {
    navigate("/customer");
  };

  const onLogoutHandler = (e: any) => {
    e.preventDefault();
    handleLogout().then((res: any) => {
      navigate("/");
      dispatch(userActions.setUserInfo(initialUserInfoState.info));
      toast("Đăng xuất thành công!!");
    });
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

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand me-2" href="https://mdbgo.com/">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="16"
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
          </a>
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
            {!isLogin(userInfo) && (
              <div className="d-flex align-items-center">
                <MDBDropdown>
                  <MDBDropdownToggle color="secondary">
                    <span className="fw-bold">{userInfo.fullName} - </span>
                    {renderRoleName(userInfo.appRole.roleName)}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu dark>
                    <MDBDropdownItem link onClick={handleNavigateCustomer}>
                      Customer
                    </MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem link onClick={onLogoutHandler}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </div>
            )}
            {isLogin(userInfo) && (
              <div className="d-flex align-items-center">
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-link px-3 me-2"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-primary me-3"
                >
                  Sign up for free
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
