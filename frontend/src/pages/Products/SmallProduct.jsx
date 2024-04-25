import { Link } from "react-router-dom";
import HeartIcon from './HeartIcon'; 
import React, { useState } from 'react';
const SmallProduct = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
    className="w-[15rem] ml-[4rem] p-2 rounded-[15px] my-[1rem]"
    style={{ backgroundColor: isHovered ? 'pink' : ' #FFFFFF', transform: isHovered ? 'translateY(-5px)' : 'none',  boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none', }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className="relative" style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }}>
      <img
        src={product.image}
        alt={product.name}
        className="h-[160px] w-[300px] rounded-[15px]"
      />
    <HeartIcon  product={product} />
      
    </div>

    <div className="p-2.5" style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }}>
      <Link to={`/product/${product._id}`}>
        <h2 className="flex justify-between items-center">
          <div>{product.name}</div>
          <span className="bg-pink-100 text-[#49b595] text-xs font-bold mr-2 px-2.5 py-.5 rounded-full dark:bg-green-900 dark:text-green-300">
            ${product.price}
          </span>
        </h2>
      </Link>
    </div>
  </div>
  );
};

export default SmallProduct;
