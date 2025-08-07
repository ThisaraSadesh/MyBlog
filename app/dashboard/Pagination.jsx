import React from "react";

const Pagination = ({ totalItems, dataForPage,setCurrentPage,currentPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / dataForPage); i++) {
    pages.push(i);
  }

  return (
    <div>
    <div className="flex flex-row items-center justify-center ">
      {pages.map((page, index) => {
        return <button onClick={()=>setCurrentPage(page)} className={currentPage===page?"bg-white hover:text-black p-3 m-3 cursor-pointer rounded-full text-black":" cursor-pointer  m-3 bg-black text-white p-3 rounded-full hover:bg-white hover:text-black"} key={index}>{page} </button>;
      })}
      </div>
    </div>
  );
};

export default Pagination;
