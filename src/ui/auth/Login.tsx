import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { handleLogin } from "../../service/auth-service";
import { toast } from "react-toastify";
import { findUserInfo } from "../../service/user-service";
import { useAppDispatch } from "../../config/redux/redux-hook";
import { userActions } from "../../config/redux/slide/user-slice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    handleLogin(data).then((res: any) => {
      navigate("/");
      toast("Đăng nhập thành công!!");
      findUserInfo().then((res: any) => {
        dispatch(userActions.setUserInfo(res));
      });
    });
  };

  return (
    <div className="container">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        className="vh-100"
      >
        <div>
          <h1 className="text-center mb-3">LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="far fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email..."
                {...register("username")}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password..."
                {...register("password")}
              />
            </div>
            <button className="btn btn-primary text-white">
              <i className="fas fa-right-to-bracket me-2"></i>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
