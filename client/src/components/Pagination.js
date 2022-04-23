import React from 'react';
import './Dog.css'

const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
         <button > ◀️ </button>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
              <button onClick={() => paginate(number)}>{number}</button>            
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;