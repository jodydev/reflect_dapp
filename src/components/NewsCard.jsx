import React from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const NewsCard = () => {
  return (
    <div>
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full rounded-3xl bg-white/30 p-6 shadow-sm backdrop-blur-sm">
        {/* Header */}
        <div className="mb-2">
          {/* <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
            News
          </span> */}
          <h3 className="text-black text-2xl font-bold">
            Reflect latest News
          </h3>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Nov 4, 2024</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>5 min read</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow">
          <p className="text-gray-700 leading-relaxed">
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
            voluptates in distinctio placeat praesentium. Iusto, aperiam nobis
            dolor incidunt esse, necessitatibus totam recusandae corrupti"
          </p>
        </div>

        {/* Footer */}
        <div className="mt-2 border-gray-200/30">
          <button className="text-xs inline-flex items-center gap-2 text-black underline hover:no-underline hover:scale-105 transition duration-300 ease-in-out">
            Read more
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
