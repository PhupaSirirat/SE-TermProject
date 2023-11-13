import { tv } from "tailwind-variants";

const InputButton = tv({
  slots: {
    button:
      "w-full text-[#780000] font-bold px-6 py-2 rounded-md border-2 border-solid border-orange-400 bg-white focus:outline-none shadow-md  transition-all duration-300 ease-in-out hover:bg-orange-400 hover:text-white transform hover:scale-105",
  },
});

const { button } = InputButton();

export function Button({ label, type, className, func }) {
  
  return (
    <>
      <button 
        type={type} 
        className={button({class : `${className}`})} 
        onClick={func}>
          
        {label}
      </button>
    </>
  );
}
