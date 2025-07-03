"use client"

import { useState, useEffect } from "react";

interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const itemsPerPage = 10;

const ServerPagination = () => {
  const [lists, setLists] = useState<Props[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClickCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("api failed");
      }

      const result = await response.json();
      const totalPages = Math.ceil(result.length / itemsPerPage);
      setTotal(totalPages);
      setLists(result);
    };

    fetchFunc();
  }, []);

  if (!lists.length) {
    return <p>no list</p>;
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, total));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = lists.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <ul>
        {paginatedList.map((list: Props) => {
          return <li key={list.id}>{list.title}</li>;
        })}
      </ul>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClickCurrentPage(index + 1)}
            style={{ color: currentPage === index + 1 ? "red" : "white" }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === total}>
          Next
        </button>
      </div>
    </>
  );
};

export default ServerPagination;
