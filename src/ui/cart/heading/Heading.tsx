import React from "react";

const Heading = () => {
  return (
    <div className="bg-primary">
      <div className="container py-4">
        <nav className="d-flex">
          <h6 className="mb-0">
            <a href="" className="text-white-50">
              Home
            </a>
            <span className="text-white-50 mx-2"> </span>
            <a href="" className="text-white">
              <u>Shopping cart</u>
            </a>
          </h6>
        </nav>
      </div>
    </div>
  );
};

export default Heading;
