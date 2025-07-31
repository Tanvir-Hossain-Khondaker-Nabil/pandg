import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from "../../variants";

const OurPlanetCorporate = () => {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Investing in Our Planet");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/corporate_three');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setContentData(data);
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
  if (contentData.length === 0) return <div className="text-center py-20">No data available</div>;

  return (
    <div className="bg-white max-w-7xl mx-auto text-black flex flex-col gap-8 py-8 px-4">
      <motion.h1 
        className="font-bold text-3xl"
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        {sectionTitle}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contentData.map((item, index) => (
          <div key={item.id} className="">
            {/* Image Section */}
            <motion.div 
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="w-full px-8"
            >
              <div className="w-full aspect-[4/3] overflow-hidden rounded-[24px] shadow-md">
                <img
                  src={`https://dev.pandgholding.binary-group.com/admin/${item.photo}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial={{...fadeIn("right",0.2).hidden,opacity:1,scale:0.5}}
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="w-full p-4"
            >
              <h2 className="font-outfit font-medium text-[20px] leading-[32px] tracking-normal">
                {item.title}
              </h2>
              <div 
                className="font-zilla text-[14px] md:text-[16px] leading-[22px] tracking-[0.05em] mt-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }} 
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPlanetCorporate;