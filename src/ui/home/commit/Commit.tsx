import React from "react";

const Commit = () => {
  return (
    <section>
      <div className="container">
        <div className="px-4 pt-3 border">
          <div className="row pt-1">
            <div className="col-lg-3 col-md-6 mb-3 d-flex">
              <div className="d-flex align-items-center">
                <div className="badge badge-warning p-2 rounded-4 me-3">
                  <i className="fas fa-thumbs-up fa-2x fa-fw"></i>
                </div>
                <span className="info">
                  <h6 className="title">Reasonable prices</h6>
                  <p className="mb-0">Have you ever finally just</p>
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 d-flex">
              <div className="d-flex align-items-center">
                <div className="badge badge-warning p-2 rounded-4 me-3">
                  <i className="fas fa-plane fa-2x fa-fw"></i>
                </div>
                <span className="info">
                  <h6 className="title">Worldwide shipping</h6>
                  <p className="mb-0">Have you ever finally just</p>
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 d-flex">
              <div className="d-flex align-items-center">
                <div className="badge badge-warning p-2 rounded-4 me-3">
                  <i className="fas fa-star fa-2x fa-fw"></i>
                </div>
                <span className="info">
                  <h6 className="title">Best ratings</h6>
                  <p className="mb-0">Have you ever finally just</p>
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 d-flex">
              <div className="d-flex align-items-center">
                <div className="badge badge-warning p-2 rounded-4 me-3">
                  <i className="fas fa-phone-alt fa-2x fa-fw"></i>
                </div>
                <span className="info">
                  <h6 className="title">Help center</h6>
                  <p className="mb-0">Have you ever finally just</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commit;
