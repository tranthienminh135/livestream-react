import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../config/firebase/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  positionId: yup.string().required(),
  statusId: yup.string().required(),
  avatar: yup.string(),
});

const Create = () => {
  const inputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [loadingUpload, setLoadingUpload] = useState<string>();

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
      alert("Please upload an image first!");
    } else {
      console.log({ data });
      reset();
    }
  };

  const handleClickImage = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (e: any) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const renderImage = () => {
    if (file) return URL.createObjectURL(file);
    return "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
  };

  const handleUploadFile = () => {
    if (!file) {
      alert("Please upload an image first!");
    } else {
      setLoadingUpload("LOADING");
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setImageUrl(url);
          console.log(url);
        })
        .catch((err) => {})
        .finally(() => {
          setLoadingUpload("DONE");
        });
    }
  };

  const renderValidationClass = (err: any, value: any) => {
    if (err) return "form-control is-invalid";
    if (getValues("email")) return "form-control is-valid";
    return "form-control";
  };

  return (
    <div className="container p-5">
      <h1 className="text-center mb-5">CREATE CUSTOMER</h1>
      <div className="row">
        <div className="col-4 row">
          <div className="col-12">
            <div
              className="bg-image hover-overlay ripple"
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
          <div className="col-12 text-center">
            {loadingUpload !== "LOADING" && (
              <button
                className="btn text-white mt-3 btn-primary"
                disabled={!file}
                onClick={handleUploadFile}
              >
                <i className="far fa-image me-2"></i>
                Upload
              </button>
            )}
            {loadingUpload === "LOADING" && (
              <button className="btn text-white mt-3 btn-primary" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Loading...</span>
              </button>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="col-8 row needs-validation"
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
            </div>
            <div className="input-group flex-nowrap mt-4">
              <span className="input-group-text">
                <i className="fas fa-heading"></i>
              </span>
              <input
                type="text"
                className={renderValidationClass(errors.title, "title")}
                placeholder="Title..."
                {...register("title")}
              />
            </div>
            <div className="input-group flex-nowrap mt-4">
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
                  Open this select menu
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-12 text-center">
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
            </div>
            <div className="input-group flex-nowrap mt-4">
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
            </div>
            <div className="input-group flex-nowrap mt-4">
              <span className="input-group-text">
                <i className="far fa-address-card"></i>
              </span>
              <select
                className={renderValidationClass(errors.statusId, "statusId")}
                {...register("statusId")}
              >
                <option selected value="">
                  Open this select menu
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-12 text-center">
              <button className="btn mt-3 btn-secondary" type="reset">
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

export default Create;
