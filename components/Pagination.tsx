interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    console.log("no pagination")
    console.log(currentPage)
    console.log(totalPages)
    const handlePrevious = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
      };
    
      const handleNext = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
      };
       return (
      <div className="pagination">
        <button
        //   onClick={() => onPageChange(currentPage - 1)}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span  className="pagination-info">{currentPage} / {totalPages}</span>
        <button
        //   onClick={() => onPageChange(currentPage + 1)}
        onClick={handleNext}
        className="pagination-button"

          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  