import { useEffect, useState } from "react";
import { DialogOrderProps } from "@/types";
import { formatPriceVN } from "@/lib/utils";

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
import { toast } from "sonner";
import { ToppingGroup } from "@/types/shopeefood.type";
import DishDetail from "./DishDetail";

export function DialogOrder({ restaurantId, dish, userId }: DialogOrderProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ grIndex: number; optIndex: number }>
  >([]);
  const [total, setTotal] = useState(0);
  const [toppings, setToppings] = useState<ToppingGroup[]>([]);

  // Get Toppings by restauranId and dishId
  const getToppings = async () => {
    const response = await fetch(
      `/api/shopeefood/topping?restaurantId=${restaurantId}&dishId=${dish.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setToppings(data);
  };

  const dishPrice = dish.price.text;

  const handleOnChange = (grIndex: number, optIndex: number) => {
    // Check if the option is already selected
    const isSelected = selectedOptions.some(
      (option) => option.grIndex === grIndex && option.optIndex === optIndex
    );

    let newSelectedOptions;
    if (isSelected) {
      // If the option is already selected, remove it from the selected options
      newSelectedOptions = selectedOptions.filter(
        (option) =>
          !(option.grIndex === grIndex && option.optIndex === optIndex)
      );
    } else {
      // If the option is not selected, add it to the selected options
      newSelectedOptions = [...selectedOptions, { grIndex, optIndex }];
    }

    // Update the selected options state
    setSelectedOptions(newSelectedOptions);
  };

  // Calculate the total price whenever the selected options change
  useEffect(() => {
    let totalPrice = dish.price.value;
    selectedOptions.forEach(({ grIndex, optIndex }) => {
      const selectedPrice = toppings[grIndex].options[optIndex].price;
      totalPrice += selectedPrice;
    });

    // Update the total price state
    setTotal(totalPrice);
  }, [selectedOptions, toppings, dish.price.value]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" onClick={getToppings}>
            {dishPrice}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col justify-center items-center bg-white">
          <AlertDialogHeader className="w-[90%]">
            <AlertDialogTitle className="flex justify-center">
              Add New Item
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col">
                {/* DISH DETAIL */}
                <DishDetail dish={dish} />
                {/* TOPPING GROUP */}
                {toppings?.map((topping, grIndex) => (
                  <div key={topping.id} className="flex flex-col mb-2 w-full">
                    <span className="flex justify-start gap-1 bg-slate-200 p-2 rounded-xl">
                      {topping.name}
                      <p className="flex">
                        (Min {topping.min_select}, Max {topping.max_select})
                      </p>
                    </span>

                    {topping.options.map(({ id, name, price }, index) => {
                      return (
                        <li key={index}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex justify-center ml-2 gap-2">
                              {topping.min_select == 1 &&
                              topping.max_select == 1 ? (
                                <input
                                  type="radio"
                                  id={id.toString()}
                                  name={`topping-name-${grIndex}`}
                                  value={name}
                                  checked={selectedOptions.some(
                                    (option) =>
                                      option.grIndex === grIndex &&
                                      option.optIndex === index
                                  )}
                                  onChange={() =>
                                    handleOnChange(grIndex, index)
                                  }
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  id={`topping.partner_option_group_id-${index}`}
                                  name={name}
                                  value={name}
                                  checked={selectedOptions.some(
                                    (option) =>
                                      option.grIndex === grIndex &&
                                      option.optIndex === index
                                  )}
                                  onChange={() =>
                                    handleOnChange(grIndex, index)
                                  }
                                />
                              )}
                              <label htmlFor={`custom-checkbox-${index}`}>
                                {name}
                              </label>
                            </div>
                            <div className="right-section">
                              {formatPriceVN(price)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              Add to Basket +{formatPriceVN(total)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
