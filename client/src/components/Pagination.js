import React from 'react';
import './pagination.css'

const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">

      <div className="pages">
        <button className="btn">{`<<`}</button>
        {
          pageNumbers.map(number => (
            <button key={number} className="btn" onClick={() => paginate(number)}>{number}</button>
          ))
        }
        <button className="btn">{`>>`}</button>

      </div>


    </div>

  );
};

export default Pagination;