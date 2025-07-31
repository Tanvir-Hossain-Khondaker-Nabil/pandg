import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants'; // Adjust this path if needed

const OurPlanetCard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Investing In Our Planet");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.pandgholding.binary-group.com/admin/api/home_two');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCardsData(data);
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
  if (cardsData.length === 0) return <div className="text-center py-20">No data available</div>;

  return (
    <section className="flex justify-center items-center bg-white py-16 px-4 text-black">
      <div className="w-full max-w-7xl flex flex-col gap-10 overflow-hidden">
        
        {/* Header */}
        <motion.div
          className="px-2 md:px-4 text-left md:text-center"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-start text-center sm:text-4xl font-bold">{sectionTitle}</h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 md:gap-16 justify-between items-center sm:items-stretch">
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              className="w-full md:w-[365px] bg-[#EEE9FF] rounded-[16px] p-8 shadow-md flex flex-col justify-between gap-4"
              variants={fadeIn("up", index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
            >
              <img
                src={`https://dev.pandgholding.binary-group.com/admin/${card.photo}`}
                alt={`Illustration for ${card.title}`}
                className="w-full h-[180px] object-contain rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
              <div 
                className="text-sm text-gray-700 mt-2 flex-1" 
                dangerouslySetInnerHTML={{ __html: card.description }} 
              />
              <button className="bg-white text-[#4F46E5] font-medium px-6 py-2 rounded-md hover:bg-[#f2f2f2] transition mt-4">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPlanetCard;