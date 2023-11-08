/* eslint-disable react/prop-types */
import { tv } from "tailwind-variants";

const InputButton = tv({
  slots: {
    button:
      "text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md",
  },
});

const { button } = InputButton();

export function Button({ label, type }) {
  return (
    <>
      <button type={type} className={button()}>
        {label}
      </button>
    </>
  );
}
