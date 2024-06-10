import { clsn, deleteItem } from "../lib/utils/helpers";

interface CardProps extends doc {
  setItem: React.Dispatch<React.SetStateAction<doc[]>>;
  disabled?: boolean;
  _id: string;
  shelfCard?: boolean;
}

const Card = ({ shelfCard = false, ...props }: CardProps) => {
  const clickhandler = () => {
    const { title, edition_count, _id } = props;
    const data = { title, edition_count, key: _id };
    props.setItem((prev) => prev.concat(data));
  };
  const shelfClickhandler = () => {
    props.setItem((prev) =>
      deleteItem({ key: "key", keyValue: props._id, data: prev })
    );
  };

  return (
    <div className="relative w-full min-h-64  bg-white shadow rounded-xl p-4 space-y-4">
      <h1 className="text-lg text-gray-500 font-semibold leading-6">
        Book Title:{" "}
        <span className=" text-slate-900 font-normal">{props.title}</span>
      </h1>
      <h1 className="text-lg text-gray-500 font-semibold leading-6">
        Edition_count:{" "}
        <span className="text-slate-900 font-medium">
          {props.edition_count}
        </span>
      </h1>
      {shelfCard ? (
        <button
          className={clsn(
            "absolute bottom-4 right-4 px-4 py-1 bg-red-500 rounded-2xl text-slate-50 ",
            "hover:text-slate-300 hover:ring-4 hover:ring-red-500/80 disabled:ring-0 disabled:bg-red-900"
          )}
          onClick={shelfClickhandler}
        >
          Remove
        </button>
      ) : (
        <button
          className={clsn(
            "absolute bottom-4 right-4 px-4 py-1 bg-green-500 rounded-2xl text-slate-50 ",
            "hover:text-slate-300 hover:ring-4 hover:ring-green-500/80 disabled:ring-0 disabled:bg-green-900"
          )}
          onClick={clickhandler}
          disabled={props.disabled}
        >
          {props.disabled ? "Added" : "Add To BookShelf"}
        </button>
      )}
    </div>
  );
};

export default Card;
