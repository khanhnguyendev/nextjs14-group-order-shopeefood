import { IDish } from "@/lib/database/models/dish.model";
import { getHighestResolutionPhoto } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CardProps = {
  dish: IDish;
};

const Card = ({ dish }: CardProps) => {
  // const { sessionClaims } = auth();
  // const userId = sessionClaims?.userId as string;

  // const dishPhoto = getHighestResolutionPhoto(dish.photos);
  const dishPhoto = dish.photos[4];

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Image src={dishPhoto.value} height={400} width={400} alt={dish.name} />

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {dish.price}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {dish.groupName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
