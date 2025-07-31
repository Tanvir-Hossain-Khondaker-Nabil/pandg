import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { fadeIn } from "../../variants";

const KeyArea = () => {
  const [homeFourData, setHomeFourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeFourData = async () => {
    try {
      const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/home_four');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const apiData = await response.json();
      if (apiData.length > 0) {
        setHomeFourData(apiData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeFourData();
  }, []);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!homeFourData) return <div className="text-center py-16">No data available</div>;

  // Create an array of container data for easier mapping
  const containers = [
    {
      id: 1,
      title: homeFourData.first_container_title,
      description: homeFourData.first_container_description,
      buttonText: homeFourData.first_container_button_text,
      buttonLink: homeFourData.first_container_button_link,
    },
    {
      id: 2,
      title: homeFourData.second_container_title,
      description: homeFourData.second_container_description,
      buttonText: homeFourData.second_container_button_text,
      buttonLink: homeFourData.second_container_button_link,
    },
    {
      id: 3,
      title: homeFourData.third_container_title,
      description: homeFourData.third_container_description,
      buttonText: homeFourData.third_container_button_text,
      buttonLink: homeFourData.third_container_button_link,
    },
    {
      id: 4,
      title: homeFourData.four_container_title,
      description: homeFourData.four_container_description,
      buttonText: homeFourData.four_container_button_text,
      buttonLink: homeFourData.four_container_button_link,
    },
  ];

  return (
    <section className="flex justify-center items-center bg-white py-16 px-4 text-black">
      <div className="w-full max-w-7xl flex flex-col gap-10 overflow-hidden">
        {/* Heading */}
        <motion.div
          className="px-4"
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {homeFourData.title || "Discover Our Perspective In Key Areas"}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6 sm:flex sm:flex-col md:grid md:grid-cols-4 md:gap-6 px-2">
          {containers.map((container, index) => (
            <motion.div
              key={container.id}
              className="bg-[#EEE9FF] rounded-[16px] p-6 shadow-md flex flex-col items-start gap-4"
              variants={fadeIn("up", index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">{container.title}</h3>
              <div
                className="text-sm text-left text-gray-700"
                dangerouslySetInnerHTML={{ __html: container.description }}
              />
              <a
                href={container.buttonLink || "#"}
                className="flex items-center text-[#4F46E5] font-medium hover:text-[#3730a3] transition"
              >
                {container.buttonText || "Learn More"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.button
            whileHover="hover"
            variants={fadeIn().hover}
            className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-2 rounded-md transition"
          >
            See All
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyArea;