import React, { useState, useEffect } from "react";

const usePagination = () => {
  const [page, setPage] = useState<number>(1);

  const handlePageDown = () => {
    setPage(page - 1);
  };

  const handlePageUp = () => {
    setPage(page + 1);
  };

  return { page, handlePageDown, handlePageUp };
};

export default usePagination;
