import { tv } from "tailwind-variants";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";
import React, { useState } from 'react';


const FavouriteroutePage = tv({
    slots: {
      base: "flex flex-col h-screen items-center pt-20",
      headerText: "text-3xl font-bold mb-10",
      button: "text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300",
      span: "text-lg font-semibold",
    },
  });

const { base, headerText,button,span } = FavouriteroutePage();



export default function Favouriteroute() {
  const mockData = [
    { id: 1, route: 'เส้นทาง A' },
    { id: 2, route: 'เส้นทาง B' },
    // more date.....
  ];
  const [data, setData] = useState(mockData); // ใช้ข้อมูลจำลองเป็นตัวอย่าง

  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      {data.map((item) => (
        <section key={item.id} className="flex justify-center items-center w-4/5 space-x-4">
          <span className={span()}>{item.route}</span>
          <button className={button()}>
            ใช้
          </button>
          <button className={button()}>
            ลบ
          </button>
        </section>
      ))}
    </main>
  );
}

  