"use client";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ExperienceData } from "../types";


const ConfirmStep = ({ onPreviousStep }: { onPreviousStep: () => void }) => {
  const [values, setValues] = useState<any>();
  const [image, setImage] = useState<File>();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedDetails = sessionStorage.getItem("Experience");
      if (storedDetails) {
        setValues(JSON.parse(storedDetails));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (session && session.user && session.token) {
      setToken(session.token);
    }
  }, [session]);

  useEffect(() => {
    if (values && values.image) {
      const fetchImage = async () => {
        try {
          const response = await fetch(values.image);
          const blob = await response.blob();
          const filename = values.image.substring(
            values.image.lastIndexOf("/") + 1
          );
          const file = new File([blob], filename);
          setImage(file);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      fetchImage();
    }
  }, [values]); // Run whenever values changes


  const handleSubmit = async () => {
    try {
      if (!image) {
        console.error("Image not available");
        return;
      }
      const formData = new FormData();
      formData.append("experienceName", values.experienceName);
      formData.append("description", values.description);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("link", values.link);
      formData.append("experienceCategory", values.experienceCategory);
      formData.append("searchTags", values.searchTags);
      formData.append("offerDescription", values.offerDescription);
      formData.append("coverDescription", values.contentDescription);
      formData.append("welcomeMessage", values.welcomeMessage);
      formData.append("preferredGender", values.preferredGender);
      formData.append("minFollowers", values.minimumFollowers);
      formData.append("image", image as File);
      const headers: any = {
        authorization: `${token}`,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/create`,
        {
          method: "POST",
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
        Swal.fire({
          title: "Experience Added Succesfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
        router.push(" /brand/experiences");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="antialiased font-bold text-4xl text-accent mb-8">
        Experience Details
      </span>
      <div className="card md:card-side bg-base-100 w-2/3 shadow-xl">
        <div className="card-body items-center md:items-start antialiased">
          <h2 className="card-title">Category</h2>
          <p>{values?.experienceCategory}</p>
          <h2 className="card-title">Title</h2>
          <p>{values?.experienceName}</p>
          <h2 className="card-title">Description</h2>
          <p>{values?.description}</p>
          <div className="flex gap-6">
            <span>
              <h2 className="card-title">Start Date</h2>
              <p>{values?.startDate}</p>
            </span>
            <span>
              <h2 className="card-title">End Date</h2>
              <p>{values?.endDate}</p>
            </span>
          </div>
        </div>
        <figure className="flex justify-center items-center">
          <img
            src={values?.image}
            alt="Image Missing"
            className="h-96 w-96 object-cover"
          />
        </figure>
      </div>
      <span className="antialiased font-bold text-4xl mt-28 text-accent mb-8">
        More Details
      </span>
      <div className="card w-2/3 flex-wrap bg-base-100 shadow-xl  ">
        <div className="card-body flex-wrap gap-10">
          <div>
            <h2 className="card-title">Offer</h2>
            <p>{values?.offerDescription}</p>
          </div>
          <div>
            <h2 className="card-title">Gender</h2>
            <p>{values?.preferredGender}</p>
          </div>
          {/* <div>
            <h2 className="card-title">Coverage</h2>
            <p>{values.}</p>
          </div> */}
          <div>
            <h2 className="card-title">Link</h2>
            <p>{values?.link || "---"}</p>
          </div>
          <div>
            <h2 className="card-title">Tags & hashtags</h2>
            <p>{values?.searchTags || "---"}</p>
          </div>
          <div>
            <h2 className="card-title">Minimum number of followers:</h2>
            <p>{values?.minimumFollowers}</p>
          </div>
        </div>
      </div>
      <div className=" text-center mb-28 mt-12 ">
        <button
          type="submit"
          className="btn btn-sm btn-accent text-white mt-6 mr-5"
          onClick={onPreviousStep}
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-sm btn-accent text-white mt-6"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
