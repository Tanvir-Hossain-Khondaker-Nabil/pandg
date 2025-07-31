import React, { useState, useEffect } from 'react';
import { fadeIn } from '../../variants';
import { motion } from 'framer-motion';

const InsightsBody = () => {
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/insight_one');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setInsightData(data[0]);
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
  if (!insightData) return <div className="text-center py-20">No data available</div>;

  return (
    <div className="bg-white max-w-7xl mx-auto text-black flex flex-col gap-16 py-10 px-4">
      {/* Main Insight Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Text Section */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full md:w-1/2 px-4"
        >
          <h1 className="font-bold text-3xl mb-6">{insightData.title}</h1>
          <div 
            className="font-zilla text-base md:text-xl text-gray-700"
            dangerouslySetInnerHTML={{ __html: insightData.description }} 
          />
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full md:w-1/2 h-auto px-4"
        >
          <img
            src={`https://dev.pandgholding.binary-group.com/admin/${insightData.photo}`}
            alt={insightData.title}
            className="w-full h-full rounded-[24px] object-cover shadow-md"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InsightsBody;