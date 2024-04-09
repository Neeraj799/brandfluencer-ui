"use client";

import { loginValidationSchema } from "@utils/validationSchema";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        console.log(res, "res");
        if (res?.error) {
          console.log('failed');
          toast.error("Authentication Failed", {
            position: "top-center",
          });
        } else {
        console.log(res, "res");
          router.push('/en/brand/experiences')
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error", {
          position: "top-center",
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl min-h-96 shadow-lg max-w-3xl p-8 items-center">
          {/* <span className='self-center'> <Link href={'/'}> <ArrowLeft size={22} /></Link></span> */}
          <div className="md:w-1/2 px-14">
            <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">Welcome Back Brand!</p>

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                className="input input-md rounded-xl mt-8 w-full max-w-xs"
                onChange={formik.handleChange}
                name="email"
                placeholder="Email"
                id="email"
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
              <div className="relative">
                <input
                  className="input input-md rounded-xl w-full max-w-xs"
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <button type="button" onClick={handleTogglePassword}>
                  {!showPassword ? (
                    <Eye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                  ) : (
                    <EyeOff className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
              {loading ? (
                <button
                  className="bg-[#002D74] rounded-xl py-2 mt-2 text-center text-white"
                  disabled
                >
                   <BeatLoader color="#36d7b7" />
                </button>
              ) : (
                <button
                  className="bg-[#002D74] rounded-xl font-semibold py-2 mt-2 text-white"
                  type="submit"
                >
                  Log in
                </button>
              )}
            <p className=" text-xs text-end mb-5 cursor-pointer">Forget your password</p>
            </form>

            <div className="mt-3 text-xs border-t pt-2 flex justify-between items-center">
              <p>Not a member yet !?</p>
              <Link href={"/en/brand/register"}>
                <p className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl">
                  Register
                </p>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              className="rounded-2xl"
              loading="lazy"
              src={"https://source.unsplash.com/Cj1HvuGxcu0"}
              alt="image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
