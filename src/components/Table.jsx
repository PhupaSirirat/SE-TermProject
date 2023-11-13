import { tv } from "tailwind-variants";
import { Button } from "./Button";

const tablerow = tv({
    slots: {
        base: "flex items-center bg-white rounded-3xl shadow-lg px-0.5 py-0.5 my-2",
        fromtodiv: "flex flex-grow justify-center items-center border-r-2 border-gray-200 font-semibold text-sm pl-1 pr-2 py-1",
        fromdiv: "text-left border-b py-0.5",
        todiv: "text-left border-t py-0.5",
        costdiv:"flex-grow align-middle font-bold text-green-600 text-md text-center px-1",
        buttondiv: "align-middle font-semibold text-sm text-center px-2",
    },
});

const { base, fromtodiv, fromdiv, todiv, costdiv, buttondiv } = tablerow();

export function Tablerow({ keyindex, from, to, cost}) {

    return (
        <tr key={keyindex} className={base()}>
            <td className={fromtodiv()}>
                <div>
                    <div className={fromdiv()}>
                        {"จาก : "}{from}
                    </div>
                    <div className={todiv()}>
                        {"ถึง : "}{to}
                    </div>
                </div>
            </td>
            <td className={costdiv()}>{"-"}{cost}{"฿"}</td>
            <td className={buttondiv()}>
            <Button
                    label={"บันทึก"}
                    className={"min-h-[3rem] text-sm rounded-full p-1"}
                    func={() => addToFavorites(hist._id)}
                  />
            </td>
        </tr>
    );
}