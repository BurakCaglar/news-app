import React from "react";
/* Packages */
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section class="flex items-center justify-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
      <div class="container flex flex-col items-center ">
        <div class="flex flex-col gap-6 max-w-md text-center">
          <h2 class="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn't find this page.
          </p>
          <Link
            to="/"
            relative="path"
            class="px-8 py-4 text-xl font-semibold rounded bg-[#052C54] text-gray-50 hover:text-gray-200 no-underline	"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
