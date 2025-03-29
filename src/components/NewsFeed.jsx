
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Volume2, RefreshCw } from "lucide-react";
import Button from "./Button";
import { FastAverageColor } from "fast-average-color";



const categories = {
  "Top Stories": Array.from({ length: 10 }, (_, i) => ({
    image: `https://picsum.photos/400/600?random=${i + 1}`,
    source: "BBC",
    headline: `Breaking News #${i + 1}`,
  })),
  Tech: Array.from({ length: 10 }, (_, i) => ({
    image: `https://picsum.photos/400/600?random=${i + 11}`,
    source: "TechCrunch",
    headline: `Tech Update #${i + 1}`,
  })),
  Fashion: Array.from({ length: 10 }, (_, i) => ({
    image: `https://picsum.photos/400/600?random=${i + 21}`,
    source: "Vogue",
    headline: `Fashion Trend #${i + 1}`,
  })),
  Finance: Array.from({ length: 10 }, (_, i) => ({
    image: `https://picsum.photos/400/600?random=${i + 31}`,
    source: "Bloomberg",
    headline: `Market News #${i + 1}`,
  })),
};

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState("Top Stories");
  const [articleIndex, setArticleIndex] = useState(0);
  const [bgColor, setBgColor] = useState("grey"); 

  const articles = categories[activeCategory];

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
    <div className="flex flex-col h-screen w-full bg-gray-100"  style={{ backgroundColor: bgColor }}>
      <div className="flex justify-center gap-4 p-4 bg-white shadow-md sticky top-0 z-10">
        {Object.keys(categories).map((cat) => (
          <motion.button
            key={cat}
            className={`px-6 py-2 font-semibold rounded-lg transition-all duration-200 ${
              activeCategory === cat ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setActiveCategory(cat);
              setArticleIndex(0);
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="relative flex-1 flex items-center justify-center p-6">
        <motion.div
          key={articleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-[50vw] h-[66vh] flex flex-col items-center justify-center bg-white shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <img
            src={articles[articleIndex].image}
            alt="News"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <p className="text-sm opacity-80 font-light">{articles[articleIndex].source}</p>
            <h2 className="text-2xl font-bold">{articles[articleIndex].headline}</h2>
          </div>
        </motion.div>

        <div className="absolute right-6 flex flex-col gap-3">
          <Button variant="ghost" size="icon" onClick={() => changeArticle("up")}>
            <ArrowUp className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => changeArticle("down")}>
            <ArrowDown className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Volume2 className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={()=>{
            window.location.reload()
          }}>
          <RefreshCw />
          </Button>
        </div>
      </div>
    </div>
  );
}
