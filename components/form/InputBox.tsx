import { MailIcon, UsersIcon, LockClosedIcon } from "@heroicons/react/solid";
import { FormikHandlers } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface InputBoxProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  icon?: "mail" | "users" | "password";
  name: string;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  value: any;
  touched: boolean | undefined;
  error?: string;
  containerClassName?: string;
}

export default function InputBox({
  label,
  type,
  placeholder,
  icon,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  containerClassName,
}: InputBoxProps) {
  let Icon;

  switch (icon) {
    case "mail":
      Icon = MailIcon;
      break;
    case "users":
      Icon = UsersIcon;
      break;
    case "password":
      Icon = LockClosedIcon;
      break;
    default:
      Icon = MailIcon;
  }

  const hasError = touched && error;

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {
              <Icon
                className={`h-5 w-5 text-gray-400 ${
                  hasError ? "text-red-900" : ""
                }`}
                aria-hidden="true"
              />
            }
          </div>
        )}
        <input
          type={type}
          name={name}
          className={`focus:ring-blue-500 focus:border-blue-500 block py-4 w-full ${
            icon ? "pl-10" : ""
          } sm:text-lg border-gray-300 rounded-md ${
            hasError
              ? "border-red-400 text-red-900 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
              : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {hasError ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
