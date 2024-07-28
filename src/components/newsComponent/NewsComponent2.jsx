import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate, formatViews } from "../../components/common/newsUtils";
import { Link } from "react-router-dom";

export default function NewsComponent2({
  image,
  title,
  released_date,
  view,
  handleNewsDetail,
}) {
  const formattedDate = formatDate(released_date);
  const formattedViews = formatViews(view);

  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;

  return (
    <>
      <div
        onClick={handleNewsDetail}
        className="card mx-3 h-[406px] bg-white border-s-1 rounded-xl group cursor-pointer"
      >
        <div className="w-full h-[230px] overflow-hidden rounded-t-xl ">
          <img
            src={`${endPoint}${
              image ||
              "https://i.pinimg.com/564x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
            }`}
            alt="news"
            className="w-full h-full object-cover rounded-t-xl transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="px-5 py-4 flex flex-col">
          <h3 className="text-xl font-bold line-clamp-2 mb-3 group-hover:text-[#222162]">
            {title || "មិនមានចំណងជើង"}
          </h3>
          <div className="flex justify-between items-center text-gray-500">
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 w-[12px]" /> {formattedDate}
            </p>
            <p>{formattedViews} views</p>
          </div>
          <div className="flex items-center mt-3">
            <img
              src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
              alt="publisher image"
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
            <p className="ml-4 text-md text-gray-800 font-kohSantepheap font-semibold group-hover:text-[#222162]">
              លី ដារ៉ូ
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
