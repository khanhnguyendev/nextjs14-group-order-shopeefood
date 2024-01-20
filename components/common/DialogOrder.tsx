import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IDish } from "@/lib/database/models/dish.model";
import { formatPriceVN, getHighestResolutionPhoto } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ToppingGroup } from "./ToppingGroup";

type DialogOrderProps = {
  restaurantId: string;
  dish: IDish;
  userId: string;
};

export function DialogOrder({ restaurantId, dish, userId }: DialogOrderProps) {
  const dishPrice = formatPriceVN(dish.price);
  const dishPhoto = getHighestResolutionPhoto(dish.photos);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{dishPrice}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            Add New Item
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Separator className="my-2" />
            <div className="flex items-center gap-5 text-sm mb-2">
              <Image src={dishPhoto.value} width={100} height={100} alt="" />
                <p>{dish.description}</p>
            </div>
            <div>
              <ToppingGroup />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Add to Basket - {dishPrice}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
