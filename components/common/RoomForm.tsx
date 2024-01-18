"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DatePicker from "react-datepicker";

import { roomFormSchema } from "@/lib/validator";

import { roomDefaultValues } from "@/constants";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createRoom } from "@/lib/actions/room.actions";
import { toast } from "sonner";

type RoomFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const RoomForm = ({ userId, type }: RoomFormProps) => {
  const router = useRouter();
  const initialValues = roomDefaultValues;
  const [startDate, setStartDate] = useState(new Date());

  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof roomFormSchema>) {
    if (type === "Create") {
      try {
        toast("Create new room...");
        const newRoom = await createRoom({
          room: { ...values },
          userId: userId,
        });

        if (newRoom) {
          form.reset();
          router.push(`/rooms/${newRoom._id}`);
          toast("Room has been created.");
        }
      } catch (error) {
        handleError(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Room title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="expiredAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Expired At:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="restaurantUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                  <Image
                    src="/assets/icons/link.svg"
                    alt="link"
                    width={24}
                    height={24}
                  />

                  <Input
                    placeholder="ShoppeFood URL"
                    {...field}
                    className="input-field"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Room</Button>
      </form>
    </Form>
  );
};

export default RoomForm;
