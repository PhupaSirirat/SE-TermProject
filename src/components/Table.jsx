import { tv } from "tailwind-variants";
import { Button } from "./Button";

const tablerow = tv({
    slots: {
        base: "flex items-center bg-white rounded-3xl shadow-lg px-0.5 py-0.5 my-2",
        fromtodiv: "flex flex-grow justify-center items-center border-r-2 border-gray-200 font-semibold text-sm pl-1 pr-2 py-1",
        fromdiv: "text-left border-b py-0.5",
        todiv: "text-left border-t py-0.5",
        costdiv: "flex-grow align-middle font-bold text-green-600 text-md text-center px-1",
        buttondiv: "align-middle font-semibold text-sm text-center px-2",
        buttondiv2: "align-middle font-semibold text-sm text-center pl-2 pr-2",
        buttondiv3: "align-middle font-semibold text-sm text-center pl-2 pr-2",
    },
});

const { base, fromtodiv, fromdiv, todiv, costdiv, buttondiv, buttondiv2, buttondiv3 } = tablerow();


export function Tablerow({ keyindex, from, to, cost, func }) {

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
                    func={func}
                />
            </td>
        </tr>
    );
}

export function Tablerow2({ keyindex, from, to, func, func2 }) {

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
            <td className={buttondiv2()}>
                <Button
                    label={"ใช้"}
                    className={"min-h-[3rem] text-sm rounded-full px-3 "}
                    func={func}
                />
            </td>
            <td className={buttondiv3()}>
                <Button
                    label={"ลบ"}
                    className={"min-h-[3rem] text-sm rounded-full px-3"}
                    func={func2}
                />
            </td>
        </tr>
    );
}