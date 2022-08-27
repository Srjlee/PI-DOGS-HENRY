import React from "react";

const Pagination = ({ dogsPerPage, totalDogs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <span
        // className={`${styles.btn_page_num} ${
        //   currentPage === 1 ? styles.disabled : ""
        // }`}
        onClick={() => paginate(1)}
      >
        <span>&lt;&lt;</span>
      </span>
      {pageNumbers.map((number) => {
        if (currentPage == 1) {
          if (
            number == currentPage ||
            number == currentPage + 1 ||
            number == currentPage + 2 ||
            number == currentPage + 3 ||
            number == currentPage + 4 ||
            number == currentPage + 5 ||
            number == currentPage + 6
          ) {
            return (
              <button
                key={number}
                className={
                  currentPage == number ? "btnP primary active" : "btnP primary"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            );
          }
        } else if (currentPage == pageNumbers.length) {
          if (
            number == currentPage ||
            number == currentPage - 6 ||
            number == currentPage - 5 ||
            number == currentPage - 4 ||
            number == currentPage - 3 ||
            number == currentPage - 2 ||
            number == currentPage - 1
          ) {
            return (
              <button
                key={number}
                className={
                  currentPage == number ? "btnP primary active" : "btnP primary"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            );
          }
        } else if (
          number == currentPage ||
          number == currentPage - 1 ||
          number == currentPage - 2 ||
          number == currentPage - 3 ||
          number == currentPage + 1 ||
          number == currentPage + 2 ||
          number == currentPage + 3
        ) {
          return (
            <button
              key={number}
              className={
                currentPage == number ? "btnP primary active" : "btnP primary"
              }
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          );
        }
      })}
      <span
        // className={`${styles.btn_page_num} ${
        //   currentPage === totalPage.length ? styles.disabled : ""
        // }`}
        onClick={() => paginate(pageNumbers.length)}
      >
        <span>&gt;&gt;</span>
      </span>
    </div>
  );
};

export default Pagination;
