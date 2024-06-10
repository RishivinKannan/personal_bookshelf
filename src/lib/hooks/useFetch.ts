import { useEffect, useState } from "react";

function useFetch<T>(
  query: string,
  endpoint: string = "https://openlibrary.org/search.json"
) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    try {
      const fetchFunc = async () => {
        fetch(`${endpoint}?q=${query}&limit=10&page=1`)
          .then((res) => res.json())
          .then((value) => setData(value));
      };
      if (query.trim() !== "") fetchFunc();
    } catch (error) {
      console.log(error);
    }
  }, [query, endpoint]);

  return { data };
}

export default useFetch;
