import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ handleInputChange, query }) => {

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-12 py-6 px-4">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Tìm kiếm <span className="text-blue">việc làm mới</span> mỗi ngày
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Có vô vàn các công việc bán thời gian về công nghệ, design, ... đang chờ đợi bạn
      </p>

      <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
        <div className="flex md:rounded-s-md rounded-l shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
          <input
            type="text"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Tìm kiếm việc làm"
            onChange={handleInputChange}
            value={query}
          />
          <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
        </div>
        <button
          className="bg-blue py-2 px-8 text-white md:rounded-e-md md:rounded-s-none rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Banner;
