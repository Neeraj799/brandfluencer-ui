"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ExperienceHero = ({ experiences, token, setRefresh, refresh }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(token);
  

  const toggleModal = (expData: any) => {
    Swal.fire({
      title: `<h2 style="color: #333; text-align: center;">${expData.experienceName}</h2>`,
      html: `
  <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
  <div><strong>Description:</strong> ${expData.description}</div>
  <div><strong>Start Date:</strong> ${expData.startDate}</div>
  <div><strong>End Date:</strong> ${expData.endDate}</div>
  <div><strong>Link:</strong> <a href="${expData.link}" target="_blank">${expData.link}</a></div>
  <div><strong>Experience Category:</strong> ${expData.experienceCategory}</div>
  <div><strong>Search Tags:</strong> ${expData.searchTags}</div>
  <div><strong>Offer Description:</strong> ${expData.offerDescription}</div>
  <div><strong>Cover Description:</strong> ${expData.coverDescription}</div>
  <div><strong>Welcome Message:</strong> ${expData.welcomeMessage}</div>
  <div><strong>Preferred Gender:</strong> ${expData.preferredGender}</div>
  <div><strong>Min Followers:</strong> ${expData.minFollowers}</div>
  <div><strong>Status:</strong> ${expData.experienceStatus}</div>
</div> 
  `,
      imageUrl: expData.image,
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Ok",
      confirmButtonColor: "oklch(var(--a))",
      customClass: {
        confirmButton: "btn btn-accent text-white btn-sm",
      },
    });
  };

  const handleEnd = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const headers: any = {
            "Content-Type": "application/json",
            authorization: `${token}`,
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/decline-experience/${id}`,
            {
              headers: headers,
              method: "POST",
            }
          );
          const data = await res.json();
          if (data.success) {
            setRefresh(!refresh);
            Swal.fire({
              title: "Completed",
              text: "Successfully Ended the Experience.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: "Failed to End the Experience.",
              icon: "error",
            });
          }
          console.log(data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {experiences?.map((expData: any, index: number) => (
        <div key={index} className="hero mt-2 mb-28 cursor-auto">
          <div className="hero-content rounded-lg drop-shadow-xl flex-col lg:flex-row">
            <img
              src={expData.image[0]}
              alt="image"
              loading="lazy"
              className="max-w-xs h-64 w-72 rounded-lg drop-shadow-2xl"
            />
            <div className="drop-shadow-xl ml-4 rounded-xl bg-base-100 w-80 md:w-96 p-16">
              <span>
                <p className="text-2xl font-bold">{expData.experienceName} </p>{" "}
                <p className="py-6 italic">{expData.description}</p>
              </span>
              <div className="space-x-5">
                <button
                  onClick={() => toggleModal(expData)}
                  className="btn btn-accent text-white btn-sm"
                >
                  View
                </button>
                {/* <button className="btn btn-accent text-white btn-sm">
                  Edit
                </button> */}
                {/* <button className="btn btn-accent text-white btn-sm">
                  Duplicate
                </button>
                <button className="btn btn-accent text-white btn-sm">
                  Archive
                </button>*/}

                {expData.experienceStatus !=="Closed" && (
                  <button
                    onClick={() => handleEnd(expData?._id)}
                    className="btn btn-error text-white btn-sm"
                  >
                    End
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ExperienceHero;
