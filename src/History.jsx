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
  { start: "สามย่าน", destination: "มาบุญคลอง", cost: 20 },
  { start: "จุฬาลงกรมหาวิทยาลัย", destination: "เตรียมอุดมศึกษา", cost: 10000 }
];


export default function History() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>ประวัติเดินทาง</h1>
      <section className="flex justify-between items-center w-100% space-x-4">
        <table className="border border-collapse w-full">
          <tbody>
            {placeholderroute.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{data.start}</td>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{'>'}</td>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{data.destination}</td>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{data.cost}฿</td>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1"><Button label={"เก็บ"} className={"px-1 py-1"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
