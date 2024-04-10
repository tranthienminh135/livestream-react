import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import { getAllCategories } from "../../../service/category-service";

const Categories = () => {
  const [categories, setCategories] = useState<any>();

  useEffect(() => {
    const findAll = () => {
      getAllCategories().then((res) => setCategories(res));
    };
    findAll();
  }, []);

  if (!categories) return <Loading />;

  return (
    <section>
      <div className="container pt-5">
        <nav className="row gy-4">
          <div className="col-12">
            <div className="row">
              {categories.map((cate: any) => (
                <div className="col-2 mt-1" key={cate.id}>
                  <a
                    href="#"
                    className="text-center d-flex flex-column justify-content-center"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary mx-auto p-3 mb-2"
                      data-mdb-ripple-color="dark"
                    >
                      <i className="fas fa-couch fa-xl fa-fw"></i>
                    </button>
                    <div className="text-dark">{cate.name}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Categories;
