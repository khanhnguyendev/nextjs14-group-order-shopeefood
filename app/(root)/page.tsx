import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grip grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Order ShopeeFood: Together as a Group!</h1>
            <p className="p-regular-20 md:p-regular-24">
              Welcome to Group Order ShopeeFood, where you and your friends can
              enjoy the convenience of group ordering on ShopeeFood! 🍔🥡 Create
              a Room, gather your foodie squad, and embark on a delightful
              culinary journey togethe
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#rooms">Create Room</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="rooms"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">History Room</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Seach CategoryFilter
        </div>
      </section>
    </>
  );
}
