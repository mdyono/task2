import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import Button from './Button';
import { FastAverageColor } from "fast-average-color";

import "../../src/index.css";

const articles = Array.from({ length: 10 }, (_, i) => ({
  image: `https://picsum.photos/400/600?random=${i + 1}`,
  source: "News Source",
  headline: `Article #${i + 1}`,
}));

const NewsFeed = () => {
  const [articleIndex, setArticleIndex] = useState(0);
  const [bgColor, setBgColor] = useState("grey"); 

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = articles[articleIndex].image;

    img.onload = () => {
      const color = fac.getColor(img);
      setBgColor(color.rgb);
    };
  }, [articleIndex]);

  const changeArticle = (direction) => {
    setArticleIndex((prev) => {
      if (direction === "up") return prev > 0 ? prev - 1 : articles.length - 1;
      return prev < articles.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center" style={{ backgroundColor: bgColor }}>
      <div className="relative flex flex-col items-center justify-center p-4">
        <motion.div
          key={articleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-[50vw] h-[66vh] flex flex-col items-center justify-center bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300"
        >
          <img
            src={articles[articleIndex].image}
            alt="News"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        <div className="text-center mt-4 bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm opacity-80 font-light text-gray-600">{articles[articleIndex].source}</p>
          <h2 className="text-2xl font-bold text-gray-800">{articles[articleIndex].headline}</h2>
        </div>

        <div className="mt-4 flex  gap-8 ">
          <Button variant="ghost" size="icon" onClick={() => changeArticle("up")} className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <ArrowUp className="text-gray-700 " />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => changeArticle("down")} className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <ArrowDown className="text-gray-700" />
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
