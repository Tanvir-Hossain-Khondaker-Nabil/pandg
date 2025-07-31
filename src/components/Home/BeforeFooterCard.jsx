import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const BeforeFooterCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/home_six');
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
  const perspectives = [
    {
      id: 1,
      title: data.first_container_title,
      description: data.first_container_description,
      buttonText: data.first_container_button_text,
      buttonLink: data.first_container_button_link
    },
    {
      id: 2,
      title: data.second_container_title,
      description: data.second_container_description,
      buttonText: data.second_container_button_text,
      buttonLink: data.second_container_button_link
    }
  ];

  return (
    <section className="flex justify-center items-center bg-white py-16 px-4 text-black">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 p-4">
        {perspectives.map((perspective, index) => (
          <motion.div
            key={perspective.id}
            variants={fadeIn("up", index * 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="bg-white border border-gray-300 rounded-[16px] p-6 shadow-sm flex items-start gap-6 w-full"
          >
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{perspective.title}</h3>
              <div 
                className="text-sm text-left text-gray-700"
                dangerouslySetInnerHTML={{ __html: perspective.description }} 
              />
              <motion.a
                href={perspective.buttonLink}
                variants={fadeIn().hover}
                whileHover="hover"
                className="flex items-center text-black font-medium hover:underline transition"
              >
                {perspective.buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BeforeFooterCard;