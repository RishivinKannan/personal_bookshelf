import { clsn } from "../lib/utils/helpers";

const CardSkelton = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {array.map((key) => (
        <div
          key={key}
          className={clsn(
            "animate-pulse rounded-md bg-primary/10 ",
            "bg-slate-300 w-full min-h-64 shadow rounded-xl"
          )}
        />
      ))}
    </>
  );
};

export default CardSkelton;
