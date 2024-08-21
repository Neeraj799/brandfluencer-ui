"use client";
import { useI18n } from "@locales/client";
import { contactSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const Contact = () => {
  const t = useI18n();
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/contact-us`,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else if (data.message) {
          toast.success(data.message, {
            position: "top-center",
          });
          formik.resetForm();
        }
      } catch (error) {
        toast.error("Internal Server Error", {
          position: "top-center",
        });
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    },
  });

  return (
    <div
      id="contact"
      className="max-w-6xl mx-auto bg-white rounded-lg mt-20 mb-36  font-[sans-serif] text-[#011c2b]"
    >
      <div className="text-center px-6">
        <h2 className="text-3xl font-extrabold pt-4"> {t("contact")}</h2>
        <p className="text-sm text-gray-400 mt-3">{t("brandNeeds")}</p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-4 p-4 shadow-lg rounded-xl mt-6">
        {/* <div className="bg-[#011c2b] rounded-lg p-6 max-lg:text-center">
          <h2 className="text-xl font-bold text-white">Let&apos;s Talk</h2>
          <p className="text-smtalk text-gray-400 mt-3">
            Have some big idea or brand to develop and need help?
          </p>
          <ul className="mt-16 space-y-10">
            <li className="flex items-center max-lg:justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 479.058 479.058"
              ></svg>
              <a className="text-white text-sm ml-3">
                <strong>hello@brandfluencer.bg</strong>
              </a>
            </li>
          </ul>
        </div> */}
        <div className="p-6 rounded-xl lg:col-span-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="relative flex items-center col-span-full">
                <input
                  type="text"
                  placeholder={t("fullname")}
                  className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // Add this to track field touch status
                  value={formik.values.name}
                  name="name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder={t("mobile")}
                  className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  name="mobile"
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.mobile}
                  </div>
                ) : null}
              </div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder={t("email")}
                  className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full">
                <textarea
                  placeholder={t("message")}
                  className="px-2 pt-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  name="message"
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-center text-sm w-full">
              <button
                type="submit"
                className="mt-12 w-40 rounded-lg px-4 py-2.5 font-semibold bg-accent text-white "
              >
                <span>
                  {loading ? (
                    <BeatLoader color="#ffff" size={10} />
                  ) : (
                    t("send")
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
