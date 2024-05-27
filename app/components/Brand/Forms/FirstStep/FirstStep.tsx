import { categories } from "@/components/Brandfluencer/Categories/Utils";
import { isValidFileUploaded } from "@helpers/imageValidation";
import { firstStepSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FirstStep = ({ onNextStep }) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setselectedImage] = useState<String>("");

  const formik = useFormik({
    initialValues: {
      experienceName: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
      experienceCategory: "",
      searchTags: [],
      image: "",
    },
    validationSchema: firstStepSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        sessionStorage.setItem("Experience", JSON.stringify(values));
        onNextStep();
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
    formik.setFieldError("image", " ");
    const file = event.target.files?.[0] ?? null;
    const isValidImages = isValidFileUploaded(file);
    if (!isValidImages) {
      formik.setFieldError(
        "image",
        "Please upload images of valid types (jpg, jpeg, webp)."
      );
      return;
    }
    const image = file ? URL.createObjectURL(file) : "";
    setselectedImage(image);
    formik.values.image = image;
    setImage(file);
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a new File object
        const filename = image.substring(image.lastIndexOf("/") + 1);
        const file = new File([blob], filename);

        // Now `file` contains the original file object
        console.log(file);
      });

    // localStorage.setItem('temporaryImage', JSON.stringify(file));

    // const reader = new FileReader();
    // reader.readAsDataURL(file as File);
    // reader.onloadend = () => {
    //   sessionStorage.setItem('image', reader?.result);
    // }
  };
  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg justify-center border-0">
            <div className="flex-auto  px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="w-full mb-4 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Experience Name
                    </label>
                    <input
                      type="text"
                      name="experienceName"
                      value={formik.values.experienceName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`input rounded text-sm shadow w-full ${
                        formik.touched.experienceName &&
                        formik.errors.experienceName
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Name Of your experience"
                    />
                    {formik.touched.experienceName &&
                      formik.errors.experienceName && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.experienceName}
                        </div>
                      )}
                  </div>
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`textarea shadow w-full ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Description of your experience"
                  ></textarea>
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-6/12 mb-4 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Start Date
                      </label>
                      <input
                        type="Date"
                        name="startDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`input rounded text-sm shadow w-full ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`input rounded text-sm shadow w-full ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Link (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="An external link "
                        name="link"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`input rounded text-sm shadow w-full ${
                          formik.touched.link && formik.errors.link
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.link && formik.errors.link && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.link}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Experience Category
                      </label>
                      <select
                        name="experienceCategory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`select w-full shadow ${
                          formik.touched.experienceCategory &&
                          formik.errors.experienceCategory
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option disabled selected>
                          Pick a Category
                        </option>
                        {categories.map((category) => (
                          <option>{category.name}</option>
                        ))}
                      </select>
                      {formik.touched.experienceCategory &&
                        formik.errors.experienceCategory && (
                          <div className="text-red-500 text-xs">
                            {formik.errors.experienceCategory}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="searchTags"
                    >
                      Tags, hashtags, handles and mentions
                    </label>
                    <input
                      type="text"
                      placeholder="Enter one or more tags separated by commas (,)"
                      name="searchTags"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`input rounded text-sm shadow w-full ${
                        formik.touched.searchTags && formik.errors.searchTags
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.searchTags && formik.errors.searchTags && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.searchTags}
                      </div>
                    )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1" />
                <div className=" flex flex-col w-full gap-3 justify-center items-center text-center">
                  <label
                    htmlFor="file-upload"
                    className="block relative w-96 h-40 group border border-dashed border-gray-400 mb-2 opacity-60 rounded flex justify-center items-center cursor-pointer transition duration-500"
                    style={{ backgroundImage: `url('${selectedImage}')` }}
                  >
                    <img
                      className=" group-hover:block w-12 mb-2"
                      src="https://www.svgrepo.com/show/33565/upload.svg"
                      alt=""
                    />
                    <input
                      id="file-upload"
                      onChange={handleImageChange}
                      type="file"
                      name="image"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                  </label>
                  <div className=" italic text-xs">{image?.name}</div>
                  <span className="font-medium tracking-wide antialiased">
                    Choose an Image
                  </span>
                  {formik.errors.image && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.image}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-sm btn-accent text-white mt-6"
                  >
                    Save & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FirstStep;
