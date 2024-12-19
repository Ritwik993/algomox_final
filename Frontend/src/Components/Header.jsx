import React from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-auto md:h-[34vw] m-[30px] md:m-[60px] bg-blue-500 rounded-3xl overflow-hidden md:flex ">
      <div className="md:w-1/2 m-4 p-4 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Book Your Events Here
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad numquam deleniti sit earum veritatis provident! Impedit iusto quidem nostrum laboriosam nam eum expedita consectetur! Beatae quod odit qui natus nulla.
        </p>
        <button className=" w-32 rounded-lg border-2 border-gray-500 py-2 px-4 text-white bg-transparent hover:bg-gray-500 hover:text-green-300 transition duration-300">
          <Link to="/food-menu">View Events</Link>
        </button>
      </div>
      <div className="md:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg"
          alt=""
          className="h-auto md:h-full w-full object-cover opacity-9"
        
        />
      </div>
    </div>
  );
};

export default Header;
