"use client";

import React from "react";
import Image from "next/image";
import { getHighestResolutionPhoto } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DialogOrder } from "./DialogOrder";
import { CardProps } from "@/types/props.type";

const Card = ({ _roomId, _userId, _restaurantId, _dish }: CardProps) => {
  const dishPhoto = getHighestResolutionPhoto(_dish.photos);

  return (
    <div className="group relative flex min-h-[280px] w-full max-w-[350px] flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:shadow-lg md:min-h-[338px]">
      <Image src={dishPhoto.value} height={350} width={350} alt={_dish.name} />

      <div className="flex min-h-[150px] flex-col gap-2 p-2 md:gap-3">
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className="flex flex-col justify-center items-center"
          >
            <AccordionTrigger>
              <h4 className="h4-bold">{_dish.name}</h4>
            </AccordionTrigger>
            <AccordionContent className="p-regular-12 text-grey-600">
              {_dish.description ? _dish.description : "No Description"}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-center mt-3">
          <DialogOrder
            roomId={_roomId}
            restaurantId={_restaurantId}
            dish={_dish}
            userId={_userId}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
