import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from "../../variants";

const WhatWeDo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/about_two');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const apiData = await response.json();
        if (apiData.length > 0) {
          setData(apiData[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20"></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-20">No data available</div>;

  // Transform the API data into our content format
  const contentList = [
    {
      title: data.first_container_title,
      description: data.first_container_description,
      photo: data.first_container_photo
    },
    {
      title: data.two_container_title,
      description: data.two_container_description,
      photo: data.two_container_photo
    },
    {
      title: data.three_container_title,
      description: data.three_container_description,
      photo: data.three_container_photo
    },
    {
      title: data.four_container_title,
      description: data.four_container_description,
      photo: data.four_container_photo
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto text-black flex flex-col gap-16 py-10 px-4">
      <motion.h1 
        className="font-bold text-3xl"
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        {data.title}
      </motion.h1>

      {contentList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          } justify-between items-center gap-8`} 
        >
          {/* Text Section */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full md:w-1/2 px-2"
          >
            <h1 className="font-outfit font-medium text-2xl leading-3xl tracking-normal">
              {item.title}
            </h1>
            <div 
              className="font-zilla text-xl leading-2xl tracking-[0.05em] mt-6 text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.description }} 
            />
          </motion.div>

          {/* Image Section */}
          <motion.div 
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full md:w-1/2 px-2"
          >
            <img
              src={`https://dev.pandgholding.binary-group.com/admin/${item.photo}`}
              alt={item.title}
              className="w-full h-full rounded-[24px] object-cover shadow-md"
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default WhatWeDo;