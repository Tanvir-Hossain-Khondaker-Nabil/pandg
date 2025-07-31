import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { fadeIn } from "../variants";
import { axiosInstance } from "../utils/axios";

export const ManageService = () => {
  const [data, setData] = useState(null);
  console.log(data);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/cards"); // Await the Promise
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
  try {
    console.log("Deleting card with ID:", id);
    await axiosInstance.delete(`/cards/delete/${id}`);
    fetchData();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};


  useEffect(() => {
    fetchData();
  }, []);
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
            Discover Our Perspective In Key Areas
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6 sm:flex sm:flex-col md:grid md:grid-cols-4 md:gap-6 px-2">
          {data?.map((perspective, index) => (
            <motion.div
              key={perspective.id}
              className="bg-[#EEE9FF] rounded-[16px] p-6 shadow-md flex flex-col items-start gap-4"
              variants={fadeIn("up", index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <img src={perspective.imageUrl} alt="" />
              </div>
              <h3 className="text-xl font-semibold">{perspective.title}</h3>
              <p className="text-sm text-left text-gray-700">
                {perspective.description}
              </p>
              <button
                onClick={() => handleDelete(perspective._id)}
                className="flex items-center text-purple-600 font-medium hover:text-purple-500 transition"
              >
                delete
              </button>

              <button className="flex items-center text-[#4F46E5] font-medium hover:text-[#3730a3] transition">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
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
