import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../assets/errorPage/error.png";

export default function ErrorPage() {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="px-4 mx-auto max-w-screen-xl md:-mt-24 xl:-mt-32 lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <img
            src={errorImg}
            alt="Not Found"
            className="m-w-xl align-content-center"
          />
          {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
            404
          </h1> */}
          <p className="xl:-mt-24 lg:-mt-24 text-3xl tracking-tight font-bold text-blue-600 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-3 text-lg font-light text-blue-600 dark:text-blue-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
