import { tv } from "tailwind-variants";

const FavouriteroutePage = tv({
    slots: {
      base: "flex flex-col h-screen items-center pt-20",
      headerText: "text-3xl font-bold mb-10",
    },
  });

const { base, headerText } = FavouriteroutePage();



  export default function Favouriteroute() {
    return (
      <main className={base()}>
        <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
        <section className="flex justify-center items-center w-4/5 space-x-4">
          <span className="text-lg font-semibold">นี่คือเส้นทาง</span>
          <button className="text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300">
            ใช้
          </button>
          <button className="text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300">
            ลบ
          </button>
        </section>
      </main>
    );
  }
  