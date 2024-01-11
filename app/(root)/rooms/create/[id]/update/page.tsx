import RoomForm from "@/components/common/RoomForm";
import { auth } from "@clerk/nextjs";

const UpdateRoom = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Room
        </h3>
      </section>

      <div className="wrapper my-8">
        <RoomForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateRoom;
