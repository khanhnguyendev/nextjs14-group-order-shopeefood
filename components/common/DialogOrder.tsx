import { useEffect, useState } from "react";
import { DialogOrderProps } from "@/types";
import { getHighestResolutionPhoto } from "@/lib/utils";
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ onSubmit ~ data:", data);
  }

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: toppings.filter((item) => item.name).map((item) => item.name),
    },
  });

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        {toppings.map((topping) => (
                          <div key={topping.id} className="w-full ">
                            <p className="bg-slate-200 p-1 rounded-md">
                              {topping.name}
                            </p>
                            <FormField
                              key={topping.id}
                              control={form.control}
                              name="items"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={topping.id}
                                    className="flex flex-col items-start py-2"
                                  >
                                    {topping.options.map((option) => {
                                      return (
                                        <FormControl key={option.id}>
                                          <label className="flex gap-2 items-center">
                                            <Checkbox
                                              checked={field.value?.includes(
                                                option.name
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      option.name,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !== option.name
                                                      )
                                                    );
                                              }}
                                            />
                                            {option.name}
                                          </label>
                                        </FormControl>
                                      );
                                    })}
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Add to Basket - {dishPrice}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
