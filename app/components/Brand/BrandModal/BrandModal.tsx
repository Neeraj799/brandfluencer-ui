"use client";
import { Profile } from "@/components/Profile/types";
import { isValidFileUploaded } from "@helpers/imageValidation";
import { useI18n } from "@locales/client";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const BrandModal = ({ profile }: { profile: Profile }) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setselectedImage] = useState<String>("");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = useState<boolean>(false);
  const t = useI18n();

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
      brand: profile?.brand || "",
      email: profile?.email || "",
      companyRep: profile?.companyRep || "",
      mobile: profile?.mobile || "",
      image: profile?.image?.[0] || "",
    },
    enableReinitialize: true,
    // validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("brand", values.brand);
        formData.append("email", values.email);
        formData.append("companyRep", values.companyRep);
        formData.append("mobile", values.mobile);
        formData.append("image", image as File || values.image);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/update-profile`,
          {
            method: "PATCH",
            body: formData,
            headers: headers,
          }
        );

        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else if (data.success) {
          router.push(" /brand/profile");
          setRefresh(!refresh)
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
    formik.setFieldError("image", " ");

    const isValidImages = isValidFileUploaded(file as File);
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
    <div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="  px-16">
            <h2 className="font-bold text-3xl text-error">Edit Profile</h2>
            <p className="text-sm mt-4 text-error">
              Update required details
            </p>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="brand"
                placeholder={t("brandName")}
                id="brand"
                onChange={formik.handleChange}
                value={formik?.values?.brand}
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
                value={formik.values.email}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 p-0">{formik.errors.email}</div>
              ) : null}
              <input
                className="p-2 rounded-xl border"
                type="number"
                name="mobile"
                placeholder={t("mobile")}
                id="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile}
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
                value={formik.values.companyRep}
                required
              />
              {formik.touched.companyRep && formik.errors.companyRep ? (
                <div className="text-red-500"> {formik.errors.companyRep} </div>
              ) : null}
              <div className="mx-auto w-40 mt-3 text-center">
                <label
                  htmlFor="file-upload"
                  className="block relative w-40 h-40 group bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500"
                  style={{
                    backgroundImage: `url('${
                      selectedImage || formik?.values?.image?.[0]
                    }')`,
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
                  />
                </label>
                <span className="font-medium tracking-wide antialiased">
                  Choose an Image
                </span>
              </div>
              {loading ? (
                <button
                  className="bg-[#002D74] rounded-xl py-2 text-center text-white"
                  disabled
                >
                  <BeatLoader color="#36d7b7" />
                </button>
              ) : (
                <button
                  className="bg-error font-semibold rounded-xl py-2  text-white"
                  type="submit"
                >
                  Submit
                </button>
              )}{" "}
            </form>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default BrandModal;
