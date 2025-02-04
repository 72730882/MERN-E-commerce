/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    
    const bestProduct = products.filter((item) => (item.bestseller === true ));
    setBestSeller(bestProduct); // Display all best sellers
  },[products]);

  useEffect(() => {
    const container = containerRef.current;

    // Auto-scroll logic
    const scrollAmount = 10; // Pixels to scroll at each step
    const scrollInterval = 20; // Interval for scrolling in milliseconds

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        // Reset to the beginning if we reach the end
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }, scrollInterval);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST "} text2={"SELLERS"} />
        <p
          className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600"
          style={{
            overflowWrap: "break-word", // Forces long words to break
          }}
        >
          Showcasing all the best sellers with smooth scrolling.
        </p>
      </div>

      <div
        className="best-seller-container flex overflow-x-auto gap-4 py-4"
        ref={containerRef}
        style={{
          scrollBehavior: "smooth", // Enables smooth manual scrolling
        }}
      >
        {bestSeller.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto", // Prevent shrinking or growing
              width: "200px", // Adjust based on image size
            }}
          >
            <ProductItem
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
