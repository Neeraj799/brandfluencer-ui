  "use client";
  import React, { useState } from "react";
  import { useFormik } from "formik";
  import { forgotPasswordValidationSchema } from "@utils/validationSchema";
  import { toast } from "react-toastify";
  import { useRouter } from "next/navigation";

  interface FormValues {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }

  const ForgotPassword = () => {
    const [value, setValue] = useState("email");

    const router = useRouter();

    const formik = useFormik<FormValues>({
      initialValues: {
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: forgotPasswordValidationSchema,
      onSubmit: async (values) => {
        try {
          let res;
          if (value === "newPassword") {
            res = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/auth/reset-password`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  newPassword: values.newPassword,
                  confirmPassword: values.confirmPassword,
                }),
              }
            );
          }

          const data = await res?.json();

          if (data.error) {
            toast.error(data.error, {
              position: "top-center",
            });
          } else {
            toast.success(data.message, {
              position: "top-center",
            });
            router.push("/brandfluencer/login");
          }
        } catch (error) {
          toast.error("Internal Server Error", {
            position: "top-center",
          });
          console.error("Forgot password error:", error);
        }
      },
    });



    const handleEmailSubmit = async () => {

      const errors = await formik.validateForm();
      if (errors.email) {
        formik.setTouched({ email: true });
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formik.values.email }),
          }
        );

        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else {
          toast.success(data.message, {
            position: "top-center",
          });
          setValue("otp");
        }
      } catch (error) {
        toast.error("Internal Server Error", {
          position: "top-center",
        });
        console.error("Forgot password error:", error);
      }
    };

    const handleOtpSubmit = async () => {
      
      const errors = await formik.validateForm();
      if (errors.otp) {
        formik.setTouched({ otp: true });
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/auth/verify-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formik.values.email,
              otp: formik.values.otp,
            }),
          }
        );

        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else {
          toast.success(data.message, {
            position: "top-center",
          });
          setValue("newPassword");
        }
      } catch (error) {
        toast.error("Internal Server Error", {
          position: "top-center",
        });
        console.error("Forgot password error:", error);
      }
    };

    return (
      <>
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 flex rounded-2xl min-h-96 shadow-lg max-w-3xl p-8 items-center">
            <div className="px-20">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4"
              >
                {value === "email" && (
                  <>
                    <h2 className="font-medium text-3xl text-[#002D74]">
                      Forgot password
                    </h2>
                    <input
                      type="email"
                      className="input input-md rounded-xl mt-8 w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Email"
                      id="email"
                      name="email"
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                    <button
                      className="bg-[#002D74] rounded-xl font-semibold py-2 mt-2 text-white"
                      type="button"
                      onClick={handleEmailSubmit}
                    >
                      Next
                    </button>
                  </>
                )}
                {value === "otp" && (
                  <>
                    <h2 className="font-medium text-3xl text-[#002D74]">
                      Enter your OTP
                    </h2>
                    <input
                      type="text"
                      className="input input-md rounded-xl mt-8 w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.otp}
                      placeholder="Enter your OTP"
                      id="otp"
                      name="otp"
                      required
                    />
                    {formik.touched.otp && formik.errors.otp && (
                      <div className="text-red-500">{formik.errors.otp}</div>
                    )}
                    <button
                      className="bg-[#002D74] rounded-xl font-semibold py-2 mt-2 text-white"
                      type="button"
                      onClick={handleOtpSubmit}
                    >
                      Next
                    </button>
                  </>
                )}
                {value === "newPassword" && (
                  <>
                    <h2 className="font-medium text-3xl text-[#002D74]">
                      Enter new password
                    </h2>
                    <input
                      type="password"
                      className="input input-md rounded-xl mt-8 w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                      placeholder="Enter your new password"
                      id="newPassword"
                      name="newPassword"
                      required
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                      <div className="text-red-500">
                        {formik.errors.newPassword}
                      </div>
                    )}

                    <input
                      type="password"
                      className="input input-md rounded-xl mt-8 w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="Enter your new password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-red-500">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                    <button
                      className="bg-[#002D74] rounded-xl font-semibold py-2 mt-2 text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </>
    );
  };

  export default ForgotPassword;
