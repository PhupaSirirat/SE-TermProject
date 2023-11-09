import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";

const RoutefinderPage = tv({
    slots: {
      base: "flex flex-col h-screen items-center pt-20",
      headerText: "text-3xl font-bold mb-10",
    },
  });

const { base, headerText } = RoutefinderPage();

export default function Routefinder() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>กำหนดเส้นทาง</h1>
      <section className="w-4/5">
        <form className="flex flex-col">
          <InputForm label="จาก" id="from" placeholder={"บ้านแม่มึง"}/>
          <InputForm label="ไปยัง" id="to" placeholder={"บ้านพ่อมึง"}/>
          <Button label="ค้นหา" type="submit" />
        </form>
      </section>
    </main>
  );
}
