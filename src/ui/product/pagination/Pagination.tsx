import React from "react";

const Pagination = (props: any) => {
  const { products, onPageChange } = props;
  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex justify-content-center mt-3"
    >
      <ul className="pagination">
        <li className="page-item">
          <button
            className={`page-link ${products.number === 0 ? "disabled" : ""}`}
            aria-label="Previous"
            onClick={() => onPageChange(products.number - 1)}
            disabled={products.number <= 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {Array.of(...new Array(products.totalPages)).map((item, index) => (
          <li
            className={`page-item ${index === products.number ? "active" : ""}`}
            key={index}
          >
            <button className="page-link">{index + 1}</button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => onPageChange(products.number + 1)}
            disabled={products.number + 1 >= products.totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
