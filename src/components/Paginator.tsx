import React, { Dispatch } from 'react';

import t from '../styles/Paginator.module.css';

type PropsType = {
  setCurrentPage: Dispatch<number>;
  currentPage: number;
  totalUsers: number;
};
export const Paginate: React.FC<PropsType> = ({ setCurrentPage, currentPage, totalUsers }) => {
  const portion = Math.ceil(totalUsers / 20);
  let items = [];
  let leftSide = currentPage - 2;
  let rightSide = currentPage + 2;
  if (leftSide <= 0) {
    if (leftSide < 0) rightSide += 1;
    leftSide = 1;
    rightSide += 1;
  }

  if (rightSide > portion) rightSide = portion;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={number === currentPage ? `${t.active} ${t.roundEffect}` : t.roundEffect}
        onClick={() => {
          setCurrentPage(number);
        }}>
        {number}
      </div>,
    );
  }
  const nextPage = () => {
    if (currentPage < portion) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className={t.flexContainer}>
      <div className={t.paginateCtn}>
        <div className={t.roundEffect} onClick={prevPage}>
          &lsaquo;
        </div>
        {items}
        <div className={t.roundEffect} onClick={nextPage}>
          &rsaquo;
        </div>
      </div>
    </div>
  );
  return paginationRender;
};
