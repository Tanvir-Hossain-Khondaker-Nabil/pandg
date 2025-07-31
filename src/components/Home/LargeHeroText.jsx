import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants'; // adjust path if needed

const LargeHeroText = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/home_one');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setHeroData(data[0]); // Assuming the API returns an array with one item
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
  if (!heroData) return <div className="text-center py-20">No data available</div>;

  return (
    <div className="bg-white text-black flex justify-center px-4 py-10">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl w-full gap-10">

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 px-3"
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {heroData.title}
          </h1>
          <div 
            className="mt-6 text-base md:text-lg text-gray-700" 
            dangerouslySetInnerHTML={{ __html: heroData.description }} 
          />
          <motion.a
            href={heroData.button_link}
            variants={fadeIn().hover}
            whileHover="hover"
            className="bg-[#25184F] text-white px-6 py-2 rounded-md mt-6 w-fit inline-block"
          >
            {heroData.button_text}
          </motion.a>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full h-auto md:w-1/2 px-5"
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <img
            src={`https://dev.pandgholding.binary-group.com/admin/${heroData.photo}`}
            alt="Hero"
            className="w-full h-auto rounded-[24px] object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default LargeHeroText;