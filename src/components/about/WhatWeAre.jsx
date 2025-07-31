import React, { useState, useEffect } from 'react';
import { MapPin } from "lucide-react";
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const WhatWeAre = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/about_three');
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

  if (loading) return <div className="text-center py-20 text-white"></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-20 text-white">No data available</div>;

  // Transform the API data into our card format
  const perspectives = [
    {
      id: 1,
      title: data.first_container_title,
      description: data.first_container_description
    },
    {
      id: 2,
      title: data.two_container_title,
      description: data.two_container_description
    },
    {
      id: 3,
      title: data.three_container_title,
      description: data.three_container_description
    },
    {
      id: 4,
      title: data.four_container_title,
      description: data.four_container_description
    }
  ];

  return (
    <section className="flex justify-center items-center bg-[#25184f] rounded-[4px] py-16 px-4 text-black">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        
        {/* Heading */}
        <div className="px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white md:text-center text-left">
            {data.title}
          </h2>
        </div>

        {/* Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2"
        >
          {perspectives.map((perspective, index) => (
            <motion.div
              variants={fadeIn("right", (index + 1) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              key={perspective.id}
              className="bg-white rounded-[16px] p-6 shadow-md flex flex-col items-start gap-4"
            >
              <div className="w-8 h-8 bg-purple-200 rounded-[10px] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>

              <h3 className="text-xl font-semibold">{perspective.title}</h3>
              <div 
                className="text-sm text-left text-gray-700"
                dangerouslySetInnerHTML={{ __html: perspective.description }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeAre;