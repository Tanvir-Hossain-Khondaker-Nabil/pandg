import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const AboutPG = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/about_one');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setAboutData(data[0]); // Assuming the API returns an array with one item
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
  if (!aboutData) return <div className="text-center py-20">No data available</div>;

  return (
    <div className="bg-white text-black flex justify-center p-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl w-full mt-10 gap-10">
        
        {/* Text Section */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full h-auto px-3"
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{aboutData.title}</h1>
          <div 
            className="mt-6 text-gray-700"
            dangerouslySetInnerHTML={{ __html: aboutData.description }} 
          />
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full p-8"
        >
          <img
            src={`https://dev.pandgholding.binary-group.com/admin/${aboutData.photo}`}
            alt={aboutData.title}
            className="w-full h-full rounded-[24px] object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPG;