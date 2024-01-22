"use client";

import { formatDateTime, getHighestResolutionPhoto } from "@/lib/utils";
import { RestaurantDetailProps } from "@/types";
import { Photo } from "@/types/shopeefood.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RestaurantDetail = ({ room, restaurant }: RestaurantDetailProps) => {
  const router = useRouter();

  if (!restaurant) {
    toast.error(
      "Error while fetching restaurant from Shopeefood API. Please try again"
    );
    router.push("/rooms/create");
    return null;
  }

  // Get the highest resolution photo
  const resPhoto: Photo = getHighestResolutionPhoto(
    restaurant?.res_photos[0].photos
  );

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={resPhoto.value}
          alt="restaurant image"
          width={resPhoto.width}
          height={resPhoto.height}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{restaurant.name}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {restaurant.rating.avg} ⭐
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {restaurant.rating.display_total_review}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                {/* <span className="text-primary-500">{event.hostedBy}</span> */}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>{formatDateTime(room.expiredAt).dateTime}</p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">
                {restaurant.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-medium-16 lg:p-regular-18">
              {restaurant.short_description}
            </p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
              {room.restaurantUrl}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetail;
