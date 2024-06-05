"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ExperienceHero = ({ experiences }: any) => {
  const [isOpen, setIsOpen] = useState(false);
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
  <div><strong>Status:</strong> ${expData.status}</div>
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
            <div className="drop-shadow-xl ml-4 rounded-xl bg-base-100 p-16">
              <span>
                <p className="text-2xl font-bold">{expData.experienceName} </p>{" "}
                <p className="py-6 italic">{expData.description}</p>
              </span>
              <div className="space-x-5">
                <button
                  onClick={() => toggleModal(expData)}
                  className="btn btn-accent text-white btn-sm"
                >
                  view
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
                <button className="btn btn-error text-white btn-sm">End</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ExperienceHero;
