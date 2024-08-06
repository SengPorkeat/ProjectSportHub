import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FacebookShareButton } from "react-share";
import moment from "moment";
import { Helmet } from "react-helmet";

export default function EvenstCardHome({
  slug,
  title,
  img,
  about,
  date,
  description,
  id,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  const shareUrl = `${baseUrl}/eventDetail/${id}`;
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const imageUrl = `${endPoint}${img}`;

  console.log("Image URL:", imageUrl);
  console.log("Title:", title);
  console.log("Description:", description);

  return (
    <Link to={`/eventDetail/${id}`}>
      <section
        data-aos="fade-up"
        className="flex justify-center w-[75%] mx-auto"
      >
        <Helmet>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={shareUrl} />
        </Helmet>
        <div className="w-full min-h-5 flex-1 p-0 group">
          <div className="p-0 flex mt-5 bg-white rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-[650px] rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={title}
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.target.src = "https://via.placeholder.com/650x260"; // Fallback image
                  }}
                  className="h-[260px] w-full group-hover:scale-110 transition-transform duration-300 object-cover"
                />
              </div>
              <div className="p-5 sm:px-7 w-full flex flex-col justify-between">
                <div className="mb-3 sm:mb-5">
                  <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white overflow-hidden text-ellipsis line-clamp-1">
                    {title}
                  </h5>
                </div>
                <div className="mb-3 sm:mb-5">
                  <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {about}
                  </p>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="flex items-center bg-[#172554] w-[30px] justify-center text-white font-bold py-2 rounded-full">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={`${title} - ${description}`}
                      hashtag="#SportHub"
                      className="flex items-center"
                    >
                      <FaFacebookF className="h-[13px]" />
                    </FacebookShareButton>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-3">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
