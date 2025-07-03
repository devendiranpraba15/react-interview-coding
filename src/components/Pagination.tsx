import { useState } from "react";
import { pageData } from "../data/pagination";

const itemsPerPage = 5;

type PageList = {
  id: number;
  firstName: string;
  age: number;
};

const Pagination: React.FC = () => {
  const [page, setPage] = useState(1);

  const handleClickPage = (page: number) => {
    setPage(page);
  };

  const totalPages = Math.ceil(pageData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const filterList = pageData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <ul>
        {filterList.map((list: PageList) => (
          <li key={list.id}>{list.firstName}</li>
        ))}
      </ul>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          style={{ color: "white" }}
          onClick={() => handleClickPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
};

export default Pagination;
