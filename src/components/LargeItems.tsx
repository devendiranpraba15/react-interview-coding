import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type CSSProperties,
  memo,
} from "react";
import useLazyFetch from "../hooks/useFetch";
import { FixedSizeList as VirtualList } from "react-window";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface ListItemProps {
  index: number;
  style: CSSProperties;
  data: Post[];
}

const itemsPerPage = 10;

const ListItem = memo(({ index, style, data }: ListItemProps) => {
  const item = data[index];
  return (
    <div style={style} key={item.id}>
      {item.title}
    </div>
  );
});

const LargeList = () => {
  const { trigger, data, loading, error } = useLazyFetch<Post[]>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    trigger({ url: "https://jsonplaceholder.typicode.com/posts" });
  }, [trigger]);

  const paginatedItems = useMemo(() => {
    if (!data) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / itemsPerPage) : 1;
  }, [data]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div>
      <h2>Large List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data && (
        <>
          <VirtualList
            height={400}
            itemCount={paginatedItems.length}
            itemSize={40}
            width="100%"
            itemData={paginatedItems}
          >
            {ListItem}
          </VirtualList>

          <div style={{ marginTop: 20 }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  margin: 2,
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LargeList;
