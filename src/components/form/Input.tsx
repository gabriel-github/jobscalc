import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  full?: boolean;
}

export function Input({ label, id, full = false, ...rest }: InputProps) {
  return (
    <div className="flex flex-1 flex-col">
      {label && (
        <label
          htmlFor={id}
          className="max-w-[220px] text-[#787880] font-medium mb-4"
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`${
          full ? "w-full" : "w-[308px]"
        } py-4 px-6 placeholder:text-[#BFBFCC] border border-[#E1E3E5]`}
        id={id}
      />
    </div>
  );
}
