import React from "react";
import { IDish } from "@/lib/database/models/dish.model";
import Card from "./Card";

type CollectionProps = {
  dishes: IDish[];
};

const Collection = ({ dishes }: CollectionProps) => {
  return (
    <>
      {dishes.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {dishes.map((dish) => {
              return (
                <li key={dish._id} className="flex justify-center">
                  <Card dish={dish} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">There is no food</h3>
        </div>
      )}
    </>
  );
};

export default Collection;
