import { MailIcon } from "@heroicons/react/solid";
import { HTMLInputTypeAttribute } from "react";

interface InputBoxProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  icon?: "mail";
}

export default function InputBox({
  label,
  type,
  placeholder,
  icon,
}: InputBoxProps) {
  let Icon;

  switch (icon) {
    case "mail":
      Icon = MailIcon;
    default:
      Icon = MailIcon;
  }

  return (
    <div className="w-full">
      <label htmlFor={type} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {<Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          </div>
        )}
        <input
          type={type}
          name={type}
          id={type}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
            icon ? "pl-10" : ""
          } sm:text-lg border-gray-300 rounded-md`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
