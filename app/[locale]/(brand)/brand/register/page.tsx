"use client";
import { useI18n } from "@locales/client";
import { isValidFileUploaded } from "@helpers/imageValidation";
import { signupSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ArrowUpLeft, Eye, EyeOff } from "react-feather";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

interface FormValues {
  brand: string;
  email: string;
  companyRep: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  image?: File;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setselectedImage] = useState<String>("");
  const router = useRouter();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const t = useI18n();

  const formik = useFormik<FormValues>({
    initialValues: {
      brand: "",
      email: "",
      companyRep: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupSchema,

    onSubmit: async (values) => {
      try {

        if(!image) {
          formik.setFieldError("image", "Please upload image");
          return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append("brand", values.brand);
        formData.append("email", values.email);
        formData.append("companyRep", values.companyRep);
        formData.append("mobile", values.mobile);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("image", image as File);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brand/auth/sign-up`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else if (data.success) {
          router.push(" /brand/login");
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    formik.setFieldError("image", "");
      
    const isValidImages = isValidFileUploaded(file);
    const image = file ? URL.createObjectURL(file) : "";
    setselectedImage(image);
    
    if (!isValidImages) {
      formik.setFieldError(
        "image",
        "Please upload images of valid types (jpg, jpeg, webp)."
      );
      return;
    }
    setImage(file);

  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center p-8 justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-6 items-center">
        <div className="px-20 py-10">
          <h2 className="font-bold text-3xl text-accent">{t("register")}..</h2>
          <p className="text-sm mt-4 text-accent">Lets Start Your Journey!</p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="brand"
              placeholder={t("brandName")}
              id="brand"
              onChange={formik.handleChange}
              required
            />
            {formik.touched.brand && formik.errors.brand ? (
              <p className="text-red-500 gap-0 p-0 m-0">
                {formik.errors.brand}
              </p>
            ) : null}
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder={t("email")}
              id="email"
              onChange={formik.handleChange}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 p-0">{formik.errors.email}</div>
            ) : null}
            <input
              className="p-2 rounded-xl border"
              type="number"
              name="mobile"
              placeholder={t("contact")}
              id="mobile"
              onChange={formik.handleChange}
              required
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500"> {formik.errors.mobile} </div>
            ) : null}
            <input
              className="p-2 rounded-xl border"
              type="text"
              name="companyRep"
              placeholder={t("companyRepresentativeName")}
              id="companyRep"
              onChange={formik.handleChange}
              required
            />
            {formik.touched.companyRep && formik.errors.companyRep ? (
              <div className="text-red-500"> {formik.errors.companyRep} </div>
            ) : null}
            <div className="relative">
              <input
                className="p-2  rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={t("password")}
                onChange={formik.handleChange}
                required
              />
              <button type="button" onClick={handleTogglePassword}>
                {" "}
                {!showPassword ? (
                  <Eye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                ) : (
                  <EyeOff className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                )}{" "}
              </button>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="relative">
              <input
                className="p-2  rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder={t("confirmPassword")}
                onChange={formik.handleChange}
                required
              />
              <button type="button" onClick={handleTogglePassword}>
                {" "}
                {!showPassword ? (
                  <Eye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                ) : (
                  <EyeOff className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                )}{" "}
              </button>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="mx-auto w-40 mt-3 text-center">
              <label
                htmlFor="file-upload"
                className="block relative w-40 h-40 group bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500"
                style={{
                  backgroundImage: `url('${selectedImage}')`,
                  backgroundSize: "cover",
                }}
              >
                <img
                  className=" group-hover:block w-12"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt=""
                />
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".jpg, .jpeg, .png, .webp"
                />
              </label>
              <span className="font-medium tracking-wide antialiased">
                Choose an image
              </span>
              {formik.errors.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>
            <label className="cursor-pointer label mt-3">
              <span className="label-text">
                I agree to the terms & conditions
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                required
              />
            </label>
            {loading ? (
              <button
                className="bg-[#002D74] rounded-xl py-2 text-center text-white"
                disabled
              >
                <BeatLoader color="#36d7b7" />
              </button>
            ) : (
              <button
                className="bg-accent font-semibold rounded-xl py-2  text-white"
                type="submit"
              >
                {t("register")}
              </button>
            )}{" "}
          </form>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p>Already a member !?</p>
            <Link href={" /brand/login"}>
              <p className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl">
                {t("login")}
              </p>
            </Link>
          </div>
        </div>
        {/* <div className="w-1/2 h-fit md:block hidden">
          <img
            className="rounded-2xl"
            loading="lazy"
            src={"/brand/brand.jpeg"}
            alt=""
          />
        </div> */}
      </div>
    </section>
  );
};

export default Register;
