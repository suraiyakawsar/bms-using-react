import React from "react";
import "./Pagination.scss";

const Pagination = ({ paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= 8; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-no">
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
