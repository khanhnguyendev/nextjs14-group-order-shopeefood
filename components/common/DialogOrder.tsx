import { useEffect, useState } from "react";
import { DialogOrderProps } from "@/types";
import {
  formatPriceVN,
  getHighestResolutionPhoto,
  handleError,
} from "@/lib/utils";

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
import { ToppingGroup, ToppingOption } from "@/types/shopeefood.type";
import Image from "next/image";
import { Input } from "../ui/input";
import { createOrder } from "@/lib/actions/order.actions";
import { Separator } from "../ui/separator";

export function DialogOrder({
  roomId,
  restaurantId,
  dish,
  userId,
}: DialogOrderProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ grIndex: number; optIndex: number }>
  >([]);
  const [total, setTotal] = useState(0);
  const [toppings, setToppings] = useState<ToppingGroup[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  // Get Dish Photo
  const dishPhoto = getHighestResolutionPhoto(dish.photos);

  // Get Toppings by restauranId and dishId
  const getToppings = async () => {
    const response = await fetch(
      `/api/shopeefood/topping/${restaurantId}/${dish.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setToppings(data);
  };

  // Button quantity
  const increaseQuantity = () => {
    quantity >= 10 ? setQuantity(10) : setQuantity((pre) => pre + 1);
  };
  const decreaseQuantity = () => {
    quantity <= 0 ? setQuantity(0) : setQuantity((pre) => pre - 1);
  };

  const handleChangeQuantity = (e: any) => {
    console.log(e.target.value);
  };

  // Select toppings
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

  // Input note
  const handleInputNote = (note: string) => {
    setNote(note);
  };

  const addToBasket = () => {
    try {
      let toppingGroups: ToppingOption[] = [];
      selectedOptions.forEach(({ grIndex, optIndex }) => {
        toppingGroups.push(toppings[grIndex].options[optIndex]);
      });

      const createOrderPromise = createOrder({
        _roomId: roomId,
        _userId: userId,
        _restaurantId: restaurantId,
        _dish: dish,
        _quantity: quantity,
        _toppings: toppingGroups,
        _note: note,
      });
      toast.promise(createOrderPromise, {
        loading: "Processing your order...",
        success: "Your order has been placed.",
        error: "Failed to place your order",
      });
    } catch (error) {
      handleError(error);
    }
  };

  // Calculate the total price whenever the selected options change
  useEffect(() => {
    let totalPrice = dish.price.value;
    selectedOptions.forEach(({ grIndex, optIndex }) => {
      const selectedPrice = toppings[grIndex].options[optIndex].price;
      totalPrice += selectedPrice;
    });

    // Update the total price state
    setTotal(totalPrice * quantity);
  }, [selectedOptions, toppings, dish.price.value, quantity]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" onClick={getToppings}>
            {dish.price.text}
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
                <div className="flex flex-row mb-5">
                  <Image
                    src={dishPhoto.value}
                    width={100}
                    height={100}
                    alt={dish.name}
                    className="rounded-2xl"
                  />
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="flex flex-col ml-2 justify-start">
                      {" "}
                      {dish.description ? dish.description : "No Description"}
                    </p>
                    <div className="flex flex-row gap-2">
                      <Button
                        disabled={quantity <= 0}
                        onClick={decreaseQuantity}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        name="quantity"
                        value={quantity}
                        min={0}
                        max={10}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />

                      <Button
                        disabled={quantity >= 10}
                        onClick={increaseQuantity}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

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

                <Separator className="my-5" />
                {/* NOTE */}
                <Input
                  placeholder="Note..."
                  onChange={(e) => handleInputNote(e.target.value)}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={quantity === 0}
              className="bg-red-500"
              onClick={() => addToBasket()}
            >
              Add to Basket +{formatPriceVN(total)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
