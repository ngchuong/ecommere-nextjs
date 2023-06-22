import useSwr from "swr";
import fetcher from "src/lib/fetcher";

const useDetailProduct = productId => {
  const { data, error, isLoading } = useSwr(`/api/products/${productId}`, fetcher, {
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

export default useDetailProduct;
