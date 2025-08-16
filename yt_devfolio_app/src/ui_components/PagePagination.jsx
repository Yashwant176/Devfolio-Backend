import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PagePagination = ({
  numOfPages,
  handleSetPage,
  page,
  decreasePageValue,
  increasePageValue,
}) => {
  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return (
    <Pagination className="my-6 dark:text-white">
      <PaginationContent>

        {page === firstNumber || (
          <PaginationItem onClick={decreasePageValue}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {numbers.map((num) => (
          <PaginationItem key={num} onClick={() => handleSetPage(num)}>
            {num === page ? (
              <PaginationLink href="#" isActive>
                {num}
              </PaginationLink>
            ) : (
              <PaginationLink href="#">{num}</PaginationLink>
            )}
          </PaginationItem>
        ))}
        {page === lastNumber || (
          <PaginationItem onClick={increasePageValue}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;