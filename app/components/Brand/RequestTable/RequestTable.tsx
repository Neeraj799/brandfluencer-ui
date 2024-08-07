"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RequestTable = () => {
  const [myRequest, setRequests] = useState([]);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<Boolean>(false);
  const headers: any = {
    "Content-Type": "application/json",
    authorization: `${token}`,
  };
  useEffect(() => {
    if (session && session.user && session.token) {
      setToken(session.token);
    }
  }, [session, refresh]);
  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/list-requests`,
        {
          headers: headers,
        }
      );
      const data = await res.json();

      setRequests(data.experiences);
    })();
  }, [token]);

  const handleComplete = async (id: any) => {
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/approve-request/${id}`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({}),
            }
          );
          const data = await res.json();
          Swal.fire({
            title: "Completed",
            text: "Successfully Approved the Request.",
            icon: "success",
          });
          setRefresh(!refresh);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleReject = async (id: any) => {
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/reject-request/${id}`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({}),
            }
          );
          const data = await res.json();
          Swal.fire({
            title: "Completed",
            text: "Successfully Approved the Request.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="card shadow-2xl bg-base-100 mt-16 mb-56 w-3/4">
        <div className="overflow-x-auto m-10">
          <table className="table text-base">
            <thead>
              <tr className="text-base">
                <th>Avatar</th>
                <th>Influencer</th>
                <th>Experience</th>
                <th>Request Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {myRequest?.length > 0 ? (
                myRequest.map((val: any, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={val?.influencer?.image?.[0]}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{val?.influencer?.name}</div>
                        <div className="text-sm opacity-50">
                          {val?.influencer?.instaID}
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
                        onClick={() => handleComplete(val?._id)}
                        className={`${
                          val?.status !== "Pending" ? `btn-disabled  ` : ""
                        }btn mr-3 btn-success text-white btn-xs md:btn-sm`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(val?._id)}
                        className={`${
                          val?.status !== "Pending" ? `btn-disabled ` : ""
                        }btn mr-3 btn-error text-white btn-xs md:btn-sm`}
                      >
                        Reject
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
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestTable;
