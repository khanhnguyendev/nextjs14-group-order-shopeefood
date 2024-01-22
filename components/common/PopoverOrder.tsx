import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IDish } from "@/lib/database/models/dish.model";
import { formatPriceVN, getHighestResolutionPhoto } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";

type PopoverOrderProps = {
  dish: IDish;
  userId: string;
};

export function PopoverOrder({ dish, userId }: PopoverOrderProps) {
  const dishPhoto = getHighestResolutionPhoto(dish.photos);
  const dishPrice = formatPriceVN(dish.price);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive">{dishPrice}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] h-[600px]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h4 className="font-medium leading-none">Add New Item</h4>
          <Separator className="my-1" />
          <div className="flex items-center gap-5 text-sm">
            <Image src={dishPhoto.value} width={100} height={100} alt="" />
            <p>{dish.description}</p>
          </div>
          <Separator className="my-1" />
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <Button variant="destructive">Add to Basket - {dishPrice}</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
