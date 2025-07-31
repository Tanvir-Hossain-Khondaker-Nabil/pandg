import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const JoiningPG = () => {
  const [joinData, setJoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/home_five');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setJoinData(data[0]); // Assuming the API returns an array with one item
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20 text-white"></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!joinData) return <div className="text-center py-20 text-white">No data available</div>;

  return (
    <div className="bg-[#25184f] rounded-[4px] text-white flex justify-center p-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl w-full mt-10 gap-10">

        {/* Text Section with Motion */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
          className="w-full md:w-1/2 h-auto px-3"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight whitespace-nowrap">
            {joinData.title}
          </h1>
          <div 
            className="mt-6 text-sm md:text-base text-ellipsis overflow-hidden"
            dangerouslySetInnerHTML={{ __html: joinData.description }} 
          />
          <motion.a
            href={joinData.button_link}
            variants={fadeIn().hover}
            whileHover="hover"
            className="bg-white text-black px-6 py-2 rounded-md mt-8 w-fit hover:bg-gray-100 transition inline-block"
          >
            {joinData.button_text}
          </motion.a>
        </motion.div>

        {/* Image Section with Motion */}
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full md:w-1/2"
        >
          <img
            src={`https://dev.pandgholding.binary-group.com/admin/${joinData.photo}`}
            alt={joinData.title}
            className="w-full h-auto rounded-[24px] object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default JoiningPG;