import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from "../../variants";

const InView = () => {
  const [corporateData, setCorporateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/corporate_two');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setCorporateData(data[0]);
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
  if (!corporateData) return <div className="text-center py-20">No data available</div>;

  // Transform API data into content format
  const contentList = [
    {
      title: corporateData.first_container_title,
      description: corporateData.first_container_description,
      photo: corporateData.first_container_photo
    },
    {
      title: corporateData.two_container_title,
      description: corporateData.two_container_description,
      photo: corporateData.two_container_photo
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
        {corporateData.title}
      </motion.h1>

      {contentList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          } justify-between items-center w-full mx-auto gap-8`}
        >
          {/* Text Section */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial={{...fadeIn("right",0.2).hidden,opacity:1,scale:0.3}}
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full md:w-1/2 px-4 flex flex-col"
          >
            <h2 className="font-outfit font-medium text-2xl leading-[1.2] tracking-normal">
              {item.title}
            </h2>
            <p className="font-zilla text-xl md:text-2xl leading-[1.5] tracking-[0.05em] mt-4 text-gray-700">
              {item.description}
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full md:w-1/2 px-4 flex flex-col"
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-[24px] shadow-md">
              <img
                src={`https://dev.pandgholding.binary-group.com/admin/${item.photo}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default InView;