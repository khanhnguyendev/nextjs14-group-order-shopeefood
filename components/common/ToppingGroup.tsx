import { ToppingGroupProps } from "@/types";

import { useEffect, useState } from "react";
import { getToppingWeb } from "@/lib/fetcher/shopeefood/web.api";
import { ToppingGroup } from "@/types/shopeefood.type";
import RadioButtonGroup from "./RadioTopping";
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
      {toppings.map((topping: ToppingGroup) => {
        if (topping.min_select === 1 && topping.max_select === 1) {
          return <RadioButtonGroup key={topping.id} topping={topping} />;
        } else {
          return <CheckboxGroup key={topping.id} topping={topping} />;
        }
      })}
    </>
  );
}
