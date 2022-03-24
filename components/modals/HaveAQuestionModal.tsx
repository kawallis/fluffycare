import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db } from "../../config/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "../../components/form/InputBox";
import InputTextArea from "../../components/form/InputTextArea";
import { useAlert } from "../../hooks/useAlert";

export default function HaveAQuestionModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);
  const alert = useAlert();

  let [remoteError, setRemoteError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5).required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().min(10).required("Required"),
    }),
    onSubmit: async ({ name, email, message }) => {
      try {
        console.log({
          name,
          email,
          message,
        });
        await setDoc(doc(collection(db, "feedback")), {
          email,
          name,
          message,
          createdAt: serverTimestamp(),
        });
        //@ts-ignore
        alert.showAlert(
          "Successfully sent!",
          "We will review this feeback and get back to you shortly with an answer.",
          "SUCCESS"
        );
        setOpen(false);
        formik.resetForm();
      } catch (e: any) {
        console.log(e);
        setRemoteError(e.message as string);
      }
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="bg-white py-2 px-4 sm:px-6 lg:py-12 lg:px-8 xl:pl-12">
                <div className="max-w-lg mx-auto lg:max-w-none">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Get in touch
                  </h2>
                  <p className="mt-3 mb-12 text-lg leading-6 text-gray-500">
                    Nullam risus blandit ac aliquam justo ipsum. Quam mauris
                    volutpat massa dictumst amet. Sapien tortor lacus arcu.
                  </p>
                  <div className="grid grid-cols-1 gap-y-6">
                    <InputBox
                      type="text"
                      placeholder="Name"
                      label=""
                      icon="users"
                      name={formik.getFieldProps("name").name}
                      value={formik.getFieldProps("name").value}
                      onChange={formik.getFieldProps("name").onChange}
                      onBlur={formik.getFieldProps("name").onBlur}
                      touched={formik.touched.name}
                      error={formik.errors.name}
                    />
                    <InputBox
                      type="email"
                      placeholder="Email"
                      label=""
                      icon="mail"
                      name={formik.getFieldProps("email").name}
                      value={formik.getFieldProps("email").value}
                      onChange={formik.getFieldProps("email").onChange}
                      onBlur={formik.getFieldProps("email").onBlur}
                      touched={formik.touched.email}
                      error={formik.errors.email}
                    />
                    <InputTextArea
                      type="message"
                      placeholder="Message"
                      label=""
                      name={formik.getFieldProps("message").name}
                      value={formik.getFieldProps("message").value}
                      onChange={formik.getFieldProps("message").onChange}
                      onBlur={formik.getFieldProps("message").onBlur}
                      touched={formik.touched.message}
                      error={formik.errors.message}
                    />
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => formik.submitForm()}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
