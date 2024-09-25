import React from 'react'
import { motion } from 'framer-motion'
import bg from "../assets/bg.jpeg";
import { GiReceiveMoney , GiTakeMyMoney } from "react-icons/gi";
import { IoCalendarSharp } from "react-icons/io5";

const Hero = () => {
  return (
    <div>
        <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-5xl text-violet-400"
      >
        Welcome To Ofin Finance
      </motion.h1>
      <h3 className="text-center text-3xl text-amber-100 font-bold font-sans mb-10 ml-20 mr-20 ">A credit score below 600, coupled with a history of late or missed payments on previous loans or credit cards, settlements, or write-offs, will likely result in loan applications being denied.</h3>
      <div className="flex justify-center rounded-lg mb-10 ">
        <img src={bg} alt=""  width={"80%"} height={"30%"} />
      </div>
      <div className=" mt-5 mb-10 ">
        <p className="text-center text-3xl text-white ">Our Mission Is To Help People <br />Achieve Financial Freedom.</p>
      </div>
      <div className="flex justify-center">
       <GiReceiveMoney size={50}  color='yellow'/>
        <p className=' m-5 text-center text-white'>Rate Us Low as <h6>From 0.70%</h6></p>
      </div>
      <div className="flex justify-center">
       <GiTakeMyMoney size={50}  color='yellow'/>
        <p className=' m-5 text-center text-white'>MAXIMUM LOAN <h6>1K to 200 Cr</h6></p>
      </div>
      <div className="flex justify-center">
       <IoCalendarSharp size={50}  color='yellow'/>
        <p className=' m-5 text-center text-white'>FAST SAFE & EASY PROCESS <h6>1 to 7 Days</h6></p>
      </div>
    </div>
  )
}

export default Hero
