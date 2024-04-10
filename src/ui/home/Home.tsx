import React from "react";
import Intro from "./intro/Intro";
import Categories from "./categories/Categories";
import NewProduct from "./products/NewProduct";
import Recommended from "./products/Recommended";
import Commit from "./commit/Commit";
import Feature from "./feature/Feature";
import RecentlyProduct from "./products/RecentlyProduct";

const Home = () => {
  return (
    <div className="container">
      <Intro />
      <Categories />
      <NewProduct />
      <Feature />
      <RecentlyProduct />
      <section>
        <div className="container">
          <div className="card p-4 bg-primary">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="mb-0 text-white">
                  Best products and brands in store
                </h4>
                <p className="mb-0 text-white-50">
                  Trendy products and text to build on the card title
                </p>
              </div>
              <div className="col-auto">
                <a className="btn btn-white text-primary shadow-0" href="#">
                  Discover
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Recommended />
      <Commit />
    </div>
  );
};

export default Home;
