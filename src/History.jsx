import { tv } from "tailwind-variants";
import { Button } from "./components/Button";

const HistoryPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-10 bg-[#fee4c8]",
    headerText: "text-4xl font-bold mb-10",
  },
});

const { base, headerText } = HistoryPage();
const placeholderroute = [
  { start: 12, destination: 34 },
  { start: 56, destination: 78 }
];


export default function History() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>ประวัติเดินทาง</h1>
      <section className="flex justify-between items-center w-4/5 space-x-4">



      </section>
    </main>
  );
}
