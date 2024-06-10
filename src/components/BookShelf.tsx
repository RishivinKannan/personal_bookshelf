import { FC } from "react";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import Card from "./Card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BookShelf: FC = () => {
  const { item, setItem } = useLocalStorage<doc[]>("shelf", []);

  return (
    <div className="relative container min-h-screen w-5/6 space-y-4">
      <h1 className="text-3xl font-bold text-blue-500 text-center ">
        My Book Shelf
      </h1>
      <Link
        to="/"
        className="flex gap-2 items-center absolute top-6 left-0 rounded-xl py-2 px-4 bg-white text-sm font-medium text-slate-900  hover:text-slate-700 hover:ring   hover:ring-blue-500/80 "
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>
      {item.length === 0 && (
        <div className="w-full h-96 p-8 flex justify-center items-center text-2xl font-semibold">
          Currently, No books in the book shelf
        </div>
      )}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  ">
        {item.map((item) => (
          <Card {...item} setItem={setItem} _id={item.key} shelfCard />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
