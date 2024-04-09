import React from "react";

const FirstStep = () => {
  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg justify-center border-0">
            <div className="flex-auto  px-4 lg:px-10 py-10 pt-0">
              <form className="space-y-4">
                <div className="w-full mb-4 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Experience Name
                    </label>
                    <input
                      type="text"
                      className="input rounded text-sm shadow w-full"
                      value=""
                      placeholder="Name Of your experience"
                    />
                  </div>
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    className="textarea shadow w-full"
                    placeholder="Description of your experience"
                  ></textarea>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-6/12 mb-4 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Start Date
                      </label>
                      <input
                        type="Date"
                        className="input rounded text-sm shadow w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        className="input rounded text-sm shadow w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Link (Optional)
                      </label>
                      <input
                        type="text"
                        className="input rounded text-sm shadow w-full"
                        placeholder="An external link "
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Experience Category
                      </label>
                      <select className="select w-full shadow">
                        <option disabled selected>
                          Pick your favorite Simpson
                        </option>
                        <option>Homer</option>
                        <option>Marge</option>
                        <option>Bart</option>
                        <option>Lisa</option>
                        <option>Maggie</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Search Tags
                    </label>
                    <input
                      type="text"
                      className="input rounded text-sm shadow w-full"
                      value=""
                      placeholder="Enter one or more tags separated by commas (,)"
                    />
                  </div>
                </div>
                <hr className="mt-6 border-b-1" />
                <div className=" flex flex-col w-full gap-3 justify-center items-center text-center">
                  <label
                    htmlFor="file-upload"
                    className="block relative w-96 h-40 group border border-dashed border-gray-400 mb-2 opacity-60 rounded flex justify-center items-center cursor-pointer transition duration-500"
                  >
                    <img
                      className=" group-hover:block w-12 mb-2"
                      src="https://www.svgrepo.com/show/33565/upload.svg"
                      alt=""
                    />
                    <input
                      id="file-upload"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                  <span className="font-medium tracking-wide antialiased">
                    Choose an Image
                  </span>
                <button className="btn btn-sm btn-accent text-white mt-6">Continue</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FirstStep;
