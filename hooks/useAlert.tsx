import { Transition } from "@headlessui/react";
import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

//@ts-ignore
const alertContext = createContext();

//@ts-ignore
export function ProvideAlert({ children }) {
  const alert = useProvideAlert();
  return (
    <alertContext.Provider value={alert}>
      {children}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={alert.isVisible}
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="rounded-lg shadow-xs overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-400 fill-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm leading-5 font-medium text-green-900">
                        {alert.alertTitle}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-green-500">
                        {alert.alertMessage}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button className="inline-flex text-green-400 focus:outline-none focus:text-green-500 transition ease-in-out duration-150">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </alertContext.Provider>
  );
}

export const useAlert = () => {
  return useContext(alertContext);
};

function useProvideAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [isVisible]);

  const showAlert = (
    title: React.SetStateAction<string>,
    message: React.SetStateAction<string>,
    type: React.SetStateAction<string>
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setIsVisible(true);
  };

  return {
    alertTitle,
    alertMessage,
    alertType,
    isVisible,
    showAlert,
  };
}
