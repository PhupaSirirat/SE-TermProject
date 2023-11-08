import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";

const HomePage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

const { base, headerText } = HomePage();

export default function Home() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>หน้าหลัก</h1>
      <section className="w-4/5 flex flex-col gap-10 items-center">
        <Link to="#" className="w-full">
          <Button label="กำหนดเส้นทาง" />
        </Link>
        <Link to="#" className="w-full">
          <Button label="เส้นทางที่บันทึก" />
        </Link>
        <Link to="#" className="w-full">
          <Button label="ประวัติการเดินทาง" />
        </Link>
      </section>

      <Link to="/">
        <div className="mt-44">
          <Button label="ออกจากระบบ" />
        </div>
      </Link>
    </main>
  );
}
