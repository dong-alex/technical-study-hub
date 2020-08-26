import { useState } from "react";

const usePagination = (maximumPages: number) => {
  const [page, setPage] = useState<number>(1);

  const handlePageDown = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageUp = () => {
    if (page < maximumPages - 1) {
      setPage(page + 1);
    }
  };

  return { page, handlePageDown, handlePageUp };
};

export default usePagination;
