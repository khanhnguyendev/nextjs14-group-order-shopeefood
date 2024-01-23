import { useEffect, useState } from "react";
import { DialogOrderProps } from "@/types";
import { formatPriceVN, getHighestResolutionPhoto } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import { getToppingWeb } from "@/lib/fetcher/shopeefood/web.api";
import { ToppingGroup } from "@/types/shopeefood.type";
import { RadioGroup } from "../ui/radio-group";

export function DialogOrder({ restaurantId, dish, userId }: DialogOrderProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [toppings, setToppings] = useState<ToppingGroup[]>([]);

  useEffect(() => {
    async function getTopping() {
      const response: ToppingGroup[] = await getToppingWeb();
      setToppings(response);
    }
    getTopping();
  }, []);

  const dishPrice = dish.price.text;
  const dishPhoto = getHighestResolutionPhoto(dish.photos);

  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ grIndex: number; optIndex: number }>
  >([]);

  const [total, setTotal] = useState(0);

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
          <Button variant="destructive">{dishPrice}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col justify-center items-center bg-white">
          <AlertDialogHeader className="w-[90%]">
            <AlertDialogTitle className="flex justify-center">
              Add New Item
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toppings.map((topping, grIndex) => (
                <div key={topping.id} className="w-full ">
                  <p className="bg-slate-200 p-1 rounded-md">{topping.name}</p>
                  {topping.options.map(({ name, price }, index) => {
                    return (
                      <li key={index}>
                        <div className="toppings-list-item">
                          <div className="left-section">
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={name}
                              value={name}
                              checked={selectedOptions.some(
                                (option) =>
                                  option.grIndex === grIndex &&
                                  option.optIndex === index
                              )}
                              onChange={() => handleOnChange(grIndex, index)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>
                              {name}
                            </label>
                          </div>
                          <div className="right-section">{price}</div>
                        </div>
                      </li>
                    );
                  })}
                </div>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              Add to Basket - {formatPriceVN(total)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
