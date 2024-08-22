import { secondStepSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExperienceData } from "../types";

const SecondStep = ({
  onNextStep,
  onPreviousStep,
}: {
  onNextStep: () => void;
  onPreviousStep: () => void;
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [experience, setExperience] = useState<ExperienceData>();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("Experience");
    if (storedDetails) {
      setExperience(JSON.parse(storedDetails));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      offerDescription: experience?.offerDescription || "",
      contentDescription: experience?.contentDescription || "",
      welcomeMessage: experience?.welcomeMessage || "",
      preferredGender: experience?.preferredGender || "",
      minimumFollowers: experience?.minimumFollowers || "",
    },
    validationSchema: secondStepSchema,

    onSubmit: async (values) => {
      try {
        const mergedDetails = { ...experience, ...values };
        sessionStorage.setItem("Experience", JSON.stringify(mergedDetails));
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
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto ">
        <div className="relative flex flex-col min-w-0 break-words w-full  bg-base-100 mb-6 pt-10 shadow-lg rounded-lg justify-center border-0">
          <div className="flex-auto  px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="w-full mb-4 px-4">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor="offerDescription"
                >
                  Please describe your offer to the brandfluencers
                </label>
                <textarea
                  name="offerDescription"
                  value={formik.values.offerDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`textarea shadow w-full ${
                    formik.touched.offerDescription &&
                    formik.errors.offerDescription
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Description of your experience"
                ></textarea>
                {formik.touched.offerDescription &&
                  formik.errors.offerDescription && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.offerDescription}
                    </div>
                  )}
              </div>
              <div className="w-full mb-4 px-4">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Please describe what would you like the brandfluencers to
                  cover
                </label>
                <textarea
                  name="contentDescription"
                  value={formik.values.contentDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`textarea shadow w-full ${
                    formik.touched.contentDescription &&
                    formik.errors.contentDescription
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Description of your experience"
                ></textarea>
                {formik.touched.contentDescription &&
                  formik.errors.contentDescription && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.contentDescription}
                    </div>
                  )}
              </div>
              <div className="w-full mb-4 px-4">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Welcome message
                </label>
                <textarea
                  name="welcomeMessage"
                  value={formik.values.welcomeMessage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`textarea shadow w-full ${
                    formik.touched.welcomeMessage &&
                    formik.errors.welcomeMessage
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Description of your experience"
                ></textarea>
                {formik.touched.welcomeMessage &&
                  formik.errors.welcomeMessage && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.welcomeMessage}
                    </div>
                  )}
              </div>
              <div className="w-full gap-3 flex-row flex justify-evenly mb-4">
                <label
                  className="block uppercase text-xs font-bold my-auto"
                  htmlFor="grid-password"
                >
                  Preferred gender
                </label>
                <div className="border border-accent w-32 h-10 rounded-md justify-center flex items-center gap-1">
                  <input
                    type="radio"
                    name="preferredGender"
                    value="All"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`sm:radio sm:radio-xs md:radio md:radio-sm lg:radio lg:radio-md ${
                      formik.touched.preferredGender &&
                      formik.errors.preferredGender
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <label htmlFor="gender">All</label>
                </div>
                <div className="border border-accent w-32 h-10 rounded-md justify-center flex items-center gap-1">
                  <input
                    type="radio"
                    name="preferredGender"
                    value="Male"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="sm:radio sm:radio-xs md:radio md:radio-sm lg:radio lg:radio-md"
                  />
                  <label htmlFor="gender">Male</label>
                </div>
                <div className="border border-accent w-32 h-10 px-2 rounded-md justify-center flex items-center gap-1">
                  <input
                    type="radio"
                    name="preferredGender"
                    value="Female"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="sm:radio sm:radio-xs md:radio md:radio-sm lg:radio lg:radio-md"
                    required
                  />
                  <label htmlFor="gender">Female</label>
                </div>
                {formik.errors.preferredGender && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.preferredGender}
                  </div>
                )}
              </div>
              {/* <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Social Media Channels
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>
                      Select One
                    </option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                  </select>
                </div>
              </div> */}
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Minimum number of followers
                  </label>
                  <input
                    type="number"
                    name="minimumFollowers"
                    value={formik.values.minimumFollowers}
                    placeholder="Enter number of followers"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`input rounded text-sm shadow w-full ${
                      formik.touched.minimumFollowers &&
                      formik.errors.minimumFollowers
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.minimumFollowers &&
                    formik.errors.minimumFollowers && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.minimumFollowers}
                      </div>
                    )}
                </div>
              </div>
              <div className=" text-center ">
                <button
                  type="submit"
                  className="btn btn-sm btn-accent text-white mt-6 mr-5"
                  onClick={onPreviousStep}
                >
                  Go Back
                </button>
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
  );
};

export default SecondStep;
