import Image from "next/image";
import { getHighestResolutionPhoto } from "@/lib/utils";
import { DishDetailProps } from "@/types";

const DishDetail = ({ dish }: DishDetailProps) => {
  const dishPhoto = getHighestResolutionPhoto(dish.photos);
  return (
    <div className="flex flex-row mb-5">
      <Image src={dishPhoto.value} width={100} height={100} alt={dish.name} />
      <p className="flex flex-col ml-2 justify-start">
        {" "}
        {dish.description ? dish.description : "No Description"}
      </p>
    </div>
  );
};

export default DishDetail;
