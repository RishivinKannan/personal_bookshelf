import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { findItem } from "../lib/utils/helpers";
import { useDebounce } from "use-debounce";
import CardSkelton from "./CardSkelton";

const Home: FC = () => {
  const [query, setQuery] = useState("");
  const [_query] = useDebounce(query, 1000);
  const { item, setItem } = useLocalStorage<doc[]>("shelf", []);

  const fetchBooks = async (query: string) => {
    const data = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
    )
      .then((res) => res.json())
      .then((data) => data);

    return data.docs as doc[];
  };
  const { data: results, isLoading } = useQuery({
    queryKey: ["query", _query],
    queryFn: () => {
      return fetchBooks(_query);
    },
  });

  return (
    <div className="container flex flex-col items-center min-h-screen space-y-6">
      <Link
        to="/shelf"
        className="absolute top-6 right-4 rounded-xl py-2 px-4 bg-blue-400 text-sm font-medium text-slate-100 hover:ring-4   hover:ring-blue-500/80 "
      >
        My Book Shelf
      </Link>
      <input
        className="py-3 px-5  w-5/6 rounded-2xl shadow-md font-bold text-xl text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring"
        placeholder="Search here..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {_query === "" && (
        <div className="w-5/6 flex flex-col justify-center items-center min-h-64 mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 gap-4 ">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Welcome to OpenLibrary
          </h1>
          <p className=" text-justify text-slate-600 font-medium mx-8">
            Explore a vast collection of books across various genres, including
            fiction, non-fiction, textbooks, and rare manuscripts. Whether you
            are looking for the latest bestsellers, classic literature, or
            academic resources, OpenLibrary is your go-to resource.
          </p>
        </div>
      )}

      {isLoading && query !== "" ? (
        <div className="w-5/6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
          <CardSkelton />
        </div>
      ) : (
        <div className="w-5/6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
          {results?.map((doc: doc) => (
            <Card
              title={doc.title}
              edition_count={doc.edition_count}
              key={doc.key}
              _id={doc.key}
              setItem={setItem}
              disabled={findItem<doc>({
                data: item,
                keyValue: doc.key,
                key: "key",
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
