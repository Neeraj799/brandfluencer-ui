import { getI18n } from "@locales/server";
import React from "react";

const Contact = async () => {
  const t = await getI18n();
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg mt-20 mb-36  font-[sans-serif] text-[#011c2b]">
      <div className="text-center px-6">
        <h2 className="text-3xl font-extrabold pt-4"> {t("contact")}</h2>
        <p className="text-sm text-gray-400 mt-3">
         {t('brandNeeds')}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 items-center gap-4 p-4 shadow-lg rounded-xl mt-6">
        <div className="bg-[#011c2b] rounded-lg p-6 max-lg:text-center">
          <h2 className="text-xl font-bold text-white">Let's Talk</h2>
          <p className="text-sm text-gray-400 mt-3">
            Have some big idea or brand to develop and need help?
          </p>
          <ul className="mt-16 space-y-10">
            <li className="flex items-center max-lg:justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 479.058 479.058"
              >
              </svg>
              <a className="text-white text-sm ml-3">
                <strong>hello@brandfluencer.bg</strong>
              </a>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-xl lg:col-span-2">
          <form>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="relative flex items-center col-span-full">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                />
              </div>

              <div className="col-span-full">
                <textarea
                  placeholder="Write Message"
                  className="px-2 pt-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#011c2b] outline-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-2.5 font-semibold bg-accent text-white "
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
