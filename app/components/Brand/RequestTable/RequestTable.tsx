"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RequestTable = () => {
  const [myRequest, setRequests] = useState([]);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const headers: any = {
    "Content-Type": "application/json",
    authorization: `${token}`,
  };
  useEffect(() => {
    if (session && session.user && session.token) {
      setToken(session.token);
    }
  }, [session]);
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
      setRequests(data);
    })();
  }, [token]);

  const handleComplete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Completed",
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
          console.log(data);
          Swal.fire({
            title: "Completed",
            text: "Your experience has been completed.",
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
      <div className="card shadow-2xl  mt-16 mb-56 w-3/4">
        <div className="overflow-x-auto m-10">
          <table className="table text-base">
            <thead>
              <tr className="text-base">
                <th>Brand</th>
                <th>Experience</th>
                <th>Request Date</th>
                <th>Status</th>
                {/* <th className="text-center">Action</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {myRequest.length > 0 ? (
                myRequest.map((val, index) => (
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
                        <div>
                          <div className="font-bold">
                            {val?.experience?.brand.brand}
                          </div>
                          <div className="text-sm opacity-50">
                            {val?.experience?.brand?.companyRep}
                          </div>
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
                        className="btn btn-success text-white btn-sm"
                      >
                        Accept
                      </button>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
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
