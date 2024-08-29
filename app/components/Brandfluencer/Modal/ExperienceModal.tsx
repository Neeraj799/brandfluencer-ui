"use client";

import { experienceModalValidationSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";


interface ExperienceModalProps {
  requestId: string;
  onClose: () => void;
}

const ExperienceModal = ({ requestId, onClose }: ExperienceModalProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token;

  const headers: any =  {
    authorization: `${token}`,
  };

  const formik = useFormik({
    initialValues: {
      link: "",
      images: [],
    },
    validationSchema: experienceModalValidationSchema,

    onSubmit: async (values) => {
      try {
        if (images.length === 0) {
          formik.setFieldError("images", "Please upload image");
          return;
        }
        
        setLoading(true);
        const formData = new FormData();
        formData.append("link", values.link);

        images.forEach((file) => {
          formData.append("images", file);
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/request/mark-completed/${requestId}`,
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
        } else if (data.message) {
          toast.success(data.message, {
            position: "top-center",
          });
          onClose();
        }
      } catch (error) {
        toast.error("Internal Server Error", {
          position: "top-center",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const isValidFileUploaded = (file: File | null) => {
    const validFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    return file && validFileTypes.includes(file.type);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = Array.from(event.target.files || []);

    const validFiles: File[] = [];
    const imageUrls: string[] = [];

    for (const file of files) {
      const isValidImage = isValidFileUploaded(file);
      if (isValidImage) {
        validFiles.push(file);
        imageUrls.push(URL.createObjectURL(file));
      } else {
        formik.setFieldError(
          "images",
          "Please upload images of valid types (jpg, jpeg, png, webp)."
        );
      }
    }

    setImages((prevImages) => [...prevImages, ...validFiles]);
    setSelectedImages((prevUrls) => [...prevUrls, ...imageUrls]);

    formik.setFieldError("images", " ");
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
    setSelectedImages((prevUrls) => prevUrls.filter((url, i) => i !== index));
  };

  

  return(
    <div>
      <input
        type="checkbox"
        id="mark_complete_modal"
        className="modal-toggle"
      />
      <div className="modal modal-open" role="dialog">
        <div className="modal-box">
          <h2 className="font-medium text-3xl text-center text-accent">Mark Request as Complete</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <input
              className="p-2 text-center rounded-xl border"
              type="text"
              name="link"
              placeholder="Enter link"
              onChange={formik.handleChange}
              value={formik.values.link}
              required
            />
            {formik.errors.link && (
                <div className="text-red-600 mt-2">{formik.errors.link}</div>
              )}
            <div className="mt-3 flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="bg-accent w-full py-2 px-5 text-white text-center rounded-xl cursor-pointer"
              >
                Upload Images
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  accept=".jpg, .jpeg, .png, .webp"
                />
              </label>
              {formik.errors.images && (
                <div className="text-red-600 mt-2">{formik.errors.images}</div>
              )}
            </div>
            
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Image Preview:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedImages.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={""} className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {loading ? (
              <button
                className="bg-accent py-2 px-5 border rounded-xl text-white"
                disabled
              >
                <BeatLoader color="#ffff" size={10} />
              </button>
            ) : (
              <button
               className="bg-accent py-2 px-5 border rounded-xl text-white cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="mark_complete_modal"
          onClick={onClose}
        >
          Close
        </label>
      </div>
    </div>
  )
};

export default ExperienceModal;
