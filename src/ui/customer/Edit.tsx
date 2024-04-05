import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAllPosition } from "../../service/position-service";
import { getAllStatus } from "../../service/status-service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, saveCustomer } from "../../service/customer-service";
import { getByteArray } from "../../common/render";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  positionId: yup.string().required(),
  statusId: yup.string().required(),
  avatar: yup.string(),
});

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";

const Edit = () => {
  const inputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [loadingUpload, setLoadingUpload] = useState<string>();
  const [positionList, setPositionList] = useState<any>();
  const [statusList, setStatusList] = useState<any>();
  const navigate = useNavigate();
  const param = useParams();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    if (param && param.id) {
      const obj = { id: param.id };
      getCustomerById(obj).then((res: any) => {
        const obj = {
          ...res,
          positionId: res.customerPosition.id,
          statusId: res.customerStatus.id,
        };
        setCustomer(obj);
        reset(obj);
        setImageUrl(`data:image/jpeg;base64,${obj.avatar}`);
      });
    }
  }, [param]);

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
    if (!file) {
      const obj = { ...data };
      save(obj);
    } else {
      getByteArray(file).then((byteArray) => {
        const obj = { ...data, avatar: byteArray };
        save(obj);
      });
    }
  };

  const save = (obj: any) => {
    saveCustomer(obj)
      .then((res: any) => {
        reset();
        toast("Chỉnh sửa thành công!!");
        navigate("/customer");
      })
      .catch((err: any) => {
        toast("Chỉnh sửa thất bại!!");
      });
  };

  useEffect(() => {
    fetchAllPosition();
    fetchAllStatus();
  }, []);

  const fetchAllPosition = () => {
    getAllPosition().then((pos: any) => {
      setPositionList(pos);
    });
  };

  const fetchAllStatus = () => {
    getAllStatus().then((stt: any) => {
      setStatusList(stt);
    });
  };

  const handleClickImage = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (e: any) => {
    const { files } = e.target;
    setFile(files[0]);
    setLoadingUpload("PENDING");
  };

  const renderImage = () => {
    if (file) return URL.createObjectURL(file);
    if (imageUrl) return imageUrl;
    return DEFAULT_AVATAR;
  };

  const handleRestore = () => {
    URL.revokeObjectURL(file);
    setFile(null);
    setImageUrl(customer.avatar);
    reset(customer);
    inputRef.current.value = null;
  };

  const renderStatusColor = (status: any) => {
    if (status.id === 1) return "badge-success";
    if (status.id === 2) return "badge-primary";
    if (status.id === 3) return "badge-warning";
  };

  const renderValidationClass = (err: any, value: any) => {
    if (err) return "form-control is-invalid";
    if (getValues(value)) return "form-control is-valid";
    return "form-control";
  };

  return (
    <div className="container p-5">
      <h1 className="text-center mb-5">CREATE CUSTOMER</h1>
      <div className="row">
        <div className="col-md-12 col-xl-4 row">
          <div className="col-12 mb-5">
            <div
              className="bg-image hover-overlay ripple m-auto"
              style={{
                minWidth: "368px",
                maxWidth: "368px",
              }}
            >
              <img
                src={renderImage()}
                className="img-fluid rounded-9"
                style={{ objectFit: "fill", width: "368px" }}
              />
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                hidden
                ref={inputRef}
                onChange={handleFileChange}
              />
              <a href="#!" onClick={handleClickImage}>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(57, 192, 237, 0.2)" }}
                >
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <p className="text-white mb-0">CHOICE IMAGE</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="col-md-12 col-xl-8 row needs-validation"
        >
          <div className="col-6">
            <div className="input-group flex-nowrap">
              <span className="input-group-text">
                <i className="far fa-envelope"></i>
              </span>

              <input
                type="email"
                className={renderValidationClass(errors.email, "email")}
                placeholder="Email..."
                {...register("email")}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="input-group flex-nowrap mt-5">
              <span className="input-group-text">
                <i className="fas fa-heading"></i>
              </span>
              <input
                type="text"
                className={renderValidationClass(errors.title, "title")}
                placeholder="Title..."
                {...register("title")}
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>
            <div className="input-group flex-nowrap mt-5">
              <span className="input-group-text">
                <i className="fas fa-briefcase"></i>
              </span>
              <select
                className={renderValidationClass(
                  errors.positionId,
                  "positionId"
                )}
                {...register("positionId")}
              >
                <option selected value="">
                  Open this select position...
                </option>
                {positionList &&
                  positionList.map((pos: any) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.name}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">
                {errors.positionId?.message}
              </div>
            </div>
            <div className="col-12 text-center mt-5">
              <button className="btn text-white mt-3 btn-primary" type="submit">
                <i className="fas fa-check me-2"></i>
                Submit
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group flex-nowrap">
              <span className="input-group-text">
                <i className="far fa-user"></i>
              </span>
              <input
                type="text"
                className={renderValidationClass(errors.name, "name")}
                placeholder="Name..."
                {...register("name")}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="input-group flex-nowrap mt-5">
              <span className="input-group-text">
                <i className="fas fa-audio-description"></i>
              </span>
              <input
                type="text"
                className={renderValidationClass(
                  errors.description,
                  "description"
                )}
                placeholder="Description..."
                {...register("description")}
              />
              <div className="invalid-feedback">
                {errors.description?.message}
              </div>
            </div>
            <div className="input-group flex-nowrap mt-5">
              <span className="input-group-text">
                <i className="far fa-address-card"></i>
              </span>
              <select
                className={renderValidationClass(errors.statusId, "statusId")}
                {...register("statusId")}
              >
                <option selected value="">
                  Open this select status...
                </option>
                {statusList &&
                  statusList.map((stt: any) => (
                    <option
                      key={stt.id}
                      value={stt.id}
                      className={renderStatusColor(stt)}
                    >
                      {stt.name}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">{errors.statusId?.message}</div>
            </div>
            <div className="col-12 text-center mt-5">
              <button
                className="btn mt-3 btn-secondary"
                type="button"
                onClick={handleRestore}
              >
                <i className="fas fa-arrow-rotate-left me-2"></i>
                Restore
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
