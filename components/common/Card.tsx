import { IDish } from "@/lib/database/models/dish.model";
import { getHighestResolutionPhoto } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { auth } from "@clerk/nextjs";
import { DialogOrder } from "./DialogOrder";

type CardProps = {
  dish: IDish;
};

const Card = ({ dish }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const dishPhoto = getHighestResolutionPhoto(dish.photos);

  return (
    <div
      className="group relative flex min-h-[280px] w-full max-w-[350px] 
    flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:shadow-lg md:min-h-[338px]
    "
    >
      <Image src={dishPhoto.value} height={350} width={350} alt={dish.name} />

      <div className="flex min-h-[150px] flex-col gap-2 p-2 md:gap-3">
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="flex flex-col justify-center items-center"
            >
              <AccordionTrigger>
                <h4 className="h4-bold">{dish.name}</h4>
              </AccordionTrigger>
              <AccordionContent className="p-regular-12 text-grey-600">
                {dish.description ? dish.description : "No Description"}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex justify-center mt-3">
          <DialogOrder dish={dish} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Card;
