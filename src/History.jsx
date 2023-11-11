import { tv } from "tailwind-variants";
import { Button } from "./components/Button";

const HistoryPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

const { base, headerText } = HistoryPage();

export default function History() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      <section className="flex justify-between items-center w-4/5 space-x-4">
        <span className="text-lg font-semibold">นี่คือเส้นทาง</span>
        <div className="flex items-center gap-3">
            <p>5บาท</p>
            <Button label={"บันทึก"} className={"px-2 py-1"} />
        </div>
      </section>
    </main>
  );
}
