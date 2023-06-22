import useSwr from "swr";
import fetcher from "src/lib/fetcher";

const useAllProduct = () => {
  const { data, error, isLoading } = useSwr("/api/products", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useAllProduct;
