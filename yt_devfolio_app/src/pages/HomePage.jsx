import { useState } from "react";
import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePagination from "../ui_components/PagePagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const numOfBlogsPerPage = 3;

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getBlogs(page),
    placeholderData: keepPreviousData,
  });

  const blogs = data?.results || [];
  const numOfPages = data?.count
    ? Math.ceil(data.count / numOfBlogsPerPage)
    : 1;

  // Debug log to verify API shape
  console.log({ count: data?.count, blogs });

  function handleSetPage(val) {
    setPage(val);
  }

  function increasePageValue() {
    setPage((curr) => curr + 1);
  }

  function decreasePageValue() {
    setPage((curr) => curr - 1);
  }

  return (
    <>
      <Header />
      <BlogContainer isPending={isPending} blogs={blogs} />
      {numOfPages > 1 && (
        <PagePagination
          increasePageValue={increasePageValue}
          decreasePageValue={decreasePageValue}
          page={page}
          numOfPages={numOfPages}
          handleSetPage={handleSetPage}
        />
      )}
    </>
  );
};

export default HomePage;
