import { ToppingGroupProps } from "@/types";

import { useEffect, useState } from "react";
import { getToppingWeb } from "@/lib/fetcher/shopeefood/web.api";
import { ToppingGroup } from "@/types/shopeefood.type";
import RadioButtonGroup from "./RadioButtonGroup";
import CheckboxGroup from "./CheckboxGroup";

export function ToppingGroup({ restaurantId, dishId }: ToppingGroupProps) {
  const [toppings, setToppings] = useState<ToppingGroup[]>([]);

  useEffect(() => {
    async function myAsyncFunction() {
      const response: ToppingGroup[] = await getToppingWeb();
      setToppings(response);
    }
    myAsyncFunction();
  }, [dishId, restaurantId]);

  return (
    <>
      {/* RADIO GROUP */}
      <RadioButtonGroup />
      {/* CHECKBOX */}
      <CheckboxGroup />
    </>
  );
}
