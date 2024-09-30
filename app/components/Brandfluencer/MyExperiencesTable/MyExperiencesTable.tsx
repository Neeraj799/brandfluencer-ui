"use client";
import { useI18n } from "@locales/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
import ExperienceModal from "../Modal/ExperienceModal";

const MyExperiencesTable = () => {
  const [myExperiences, setExperiences] = useState([]);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRequestId, setCurrentRequestedId] = useState<string | null>(null);
  const headers: any = {
    "Content-Type": "application/json",
    authorization: `${token}`,
  };
  const t = useI18n();
  useEffect(() => {
    if (session && session.user && session.token) {
      setToken(session.token);
    }
  }, [session]);
  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/request/list-requests`,
        {
          headers: headers,
        }
      );
      const data = await res.json();
      setExperiences(data);
    })();
  }, [token, refresh]);

  const handleMarkComplete = (id: string) => {
    setCurrentRequestedId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentRequestedId(null);
    setRefresh(!refresh);
  };



  return (
    <div className="flex justify-center items-center w-full">
      <div className="card shadow-2xl  mt-16 mb-56 w-3/4">
        <div className="overflow-x-auto m-10">
          <table className="table text-base">
            <thead>
              <tr className="text-base">
                <th>Avatar</th>
                <th>{t("brand")}</th>
                <th>{t("experience")}</th>
                <th>Request Date</th>
                <th>{t("status")}</th>
                <th className="text-center">Action</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {myExperiences.length > 0 ? (
                myExperiences?.map((val: any, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={val?.experience?.brand?.image[0]}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">
                          {val?.experience?.brand?.brand}
                        </div>
                        <div className="text-sm opacity-50">
                          {val?.experience?.brand?.companyRep}
                        </div>
                      </div>
                    </td>
                    <td>
                      {val?.experience?.experienceName}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {val?.experience?.experienceCategory}
                      </span>
                    </td>
                    <td>{new Date(val?.created_at).toLocaleDateString()}</td>
                    <td>{val?.status}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleMarkComplete(val?._id)}
                        className={`${
                          val?.status !== "Approved" ? `btn-disabled ` : ""
                        }btn mr-3 btn-success text-white btn-sm`}
                      >
                        Mark Completed
                      </button>
                    </td>
                    {/* <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center font-semibold">
                    No Experiences found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modalVisible && currentRequestId && (
        <ExperienceModal requestId={currentRequestId} onClose={closeModal} />
      )}
    </div>
  );
};

export default MyExperiencesTable;
