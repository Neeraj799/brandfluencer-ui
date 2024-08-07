"use client";
import { useI18n } from "@locales/client";
import { contactSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const t = useI18n();
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (session && session.user && session.token) {
        setToken(session.token);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session]);
  const headers: any = {
    authorization: `${token}`,
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/update-profile`,
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
        } else if (data.success) {
          router.push(" /brand/profile");
          setRefresh(!refresh);
          toast.success(data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("Internal Server Error", {
          position: "top-center",
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div id="contact" className="max-w-6xl mx-auto bg-white rounded-lg mt-20 mb-36  font-[sans-serif] text-[#011c2b]">
      <div className="text-center px-6">
        <h2 className="text-3xl font-extrabold pt-4"> {t("contact")}</h2>
        <p className="text-sm text-gray-400 mt-3">{t("brandNeeds")}</p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-4 p-4 shadow-lg rounded-xl mt-6">
        {/* <div className="bg-[#011c2b] rounded-lg p-6 max-lg:text-center">
          <h2 className="text-xl font-bold text-white">Let&apos;s Talk</h2>
          <p className="text-sm text-gray-400 mt-3">
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
                  value={formik.values.phone}
                  name="phone"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.phone}
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
              <button
                type="submit"
                className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-2.5 font-semibold bg-accent text-white "
              >
                {t("send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
