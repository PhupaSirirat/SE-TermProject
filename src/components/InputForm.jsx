import { tv } from "tailwind-variants";

const inputForm = tv({
  slots: {
    base: "mb-6",
    input:
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
  },
});

const { base, input } = inputForm();

// eslint-disable-next-line react/prop-types, no-unused-vars
export function InputForm({label, type, id, placeholder}) {

  return (
    <>
      <div className={base()}>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          {label}
        </label>
        <input
          type={type}
          id={id}
          className={input()}
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
}
