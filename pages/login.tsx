import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthErrorCodes, signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

import InputBox from "../components/form/InputBox";
import { Button } from "../components/shared/Button";

export default function Login() {
  const router = useRouter();

  let [remoteError, setRemoteError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8).max(16).required("Required"),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        let { user } = await signInWithEmailAndPassword(auth, email, password);

        if (router.query.onboarding) {
          router.push("/get-a-quote/calculating");
        } else {
          router.push("/policy");
        }
      } catch (e: any) {
        switch (e.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            setRemoteError(
              "This email is already in use. Try using another or logging in"
            );
            break;
          default:
            setRemoteError(e.message);
        }
      }
    },
  });

  return (
    <>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center px-12 lg:flex-none w-2/5 md:w-1/2">
          <div className="mx-auto w-full px-12 lg:px-24 py-24 pb-64">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  check prices for your pet's insurance
                </a>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <div className="space-y-6">
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
                  <InputBox
                    type="password"
                    placeholder="Password"
                    label=""
                    icon="password"
                    name={formik.getFieldProps("password").name}
                    value={formik.getFieldProps("password").value}
                    onChange={formik.getFieldProps("password").onChange}
                    onBlur={formik.getFieldProps("password").onBlur}
                    touched={formik.touched.password}
                    error={formik.errors.password}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <Button
                    text="Continue"
                    disabled={!(formik.isValid && formik.dirty)}
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    className="w-full md:w-full lg:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-3/5">
          <div
            className="absolute inset-0 h-full w-full object-cover bg-gray-50"
            // src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            // alt=""
          />
        </div>
      </div>
    </>
  );
}
