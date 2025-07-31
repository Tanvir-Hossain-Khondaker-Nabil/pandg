import React from 'react';
import img from "../../assets/Frame.png";
``
import { fadeIn } from '../../variants'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Career = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white text-black p-8 " >
      <div className="flex flex-col mt-30 mb-10 justify-center items-center gap-6 max-w-2xl text-center">

        <motion.div 
        variants={fadeIn("right",0.2)}
        initial={"hidden"}
       whileInView={"show"}
        viewport={{once:false,amount:0.4}}

        className="flex flex-col justify-center items-center gap-2 px-2">
          <h1 className="text-4xl sm:text-5xl font-bold">Sorry!</h1>
          <p className="text-lg sm:text-xl font-semibold">
            There are no job opportunities available
          </p>
        </motion.div>

        <motion.img
         variants={fadeIn("up",0.2)}
        initial="hidden"
       whileInView={"show"}
        viewport={{once:false,amount:0.3}}
          src={img}
          alt="No jobs"
          className="w-1/2 max-w-xs sm:max-w-sm object-contain"
        />

        <motion.button
        onClick={() => navigate('/')}
        variants={fadeIn("left",0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once:false,amount:0.1}}
        whileHover={"hover"}
         transition={{ type: "spring", stiffness: 300 }}
        className="bg-[#25184F] text-white px-6 py-2 rounded-lg mt-8 shadow-md hover:shadow-xl 
             hover:bg-[#3c2b85] transition-all duration-200 ease-linear">
          Go Home
        </motion.button>


      </div>
    </div>
  );
};

export default Career;
