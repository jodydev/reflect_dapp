import { Calendar, Clock, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const NewsCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      exit="hidden"
      className="relative z-10 flex flex-col w-full h-full rounded-3xl bg-dark p-6 shadow-sm backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white text-2xl font-bold">Reflect latest News</h3>

        <button
          onClick={toggleExpand}
          className="text-xs inline-flex items-center gap-2 text-white underline hover:scale-105 transition duration-300 ease-in-out"
        >
          {isExpanded ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Meta info */}
          <div className="flex items-center gap-4 mb-4 text-white text-sm transition-all">
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
            <p className="text-white/60 leading-relaxed text-sm">
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
              voluptates in distinctio placeat praesentium. Iusto, aperiam nobis
              dolor incidunt esse, necessitatibus totam recusandae corrupti"
            </p>
          </div>

          <div className="mt-2 border-gray-200/30">
            <a
              href="/"
              className="text-white underline flex flex-row items-center gap-x-2 text-xs"
            >
              Read More <ArrowRight size={14} />
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default NewsCard;
