import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const WhoWeServe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/about_four');
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

  // Transform the API data into our card format
  const serveItems = [
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
    },
    {
      id: 5,
      title: data.five_container_title,
      description: data.five_container_description
    },
    {
      id: 6,
      title: data.six_container_title,
      description: data.six_container_description
    }
  ];

  return (
    <section className="flex justify-center items-center bg-[#F8F9FA] py-16 px-4 text-black">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        
        {/* Heading */}
        <motion.div
          className="px-4"
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-left md:text-center text-[#25184F]">
            {data.title}
          </h2>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-2 sm:px-0">
          {serveItems.map((item, index) => (
            <motion.div
              variants={fadeIn("up", (index + 1) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              key={item.id}
              className="bg-[#EEE9FF] rounded-[16px] p-6 shadow-md flex flex-col items-start gap-4" 
            >
              <h3 className="text-xl font-semibold text-[#25184F]">{item.title}</h3>
              <p className="text-sm text-left text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;