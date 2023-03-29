import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-hot-toast";

const ShortUrlPreview = ({ shortUrl = "" }) => {
  let short = "http://" + window.location.host + "/" + shortUrl;
  const copyText = (e) => {
    navigator.clipboard.writeText(short);
    toast("URL copiada!", {
      icon: "📝",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delayChildren: 0.1 } }}
      exit={{ opacity: 0 }}
      className=" py-4 px-4   rounded-lg flex items-center gap-4 bg-gray-700"
    >
      <p className="font-light text-base">
        <a href={short} target="_blank">
          {short}
        </a>
      </p>
      <button onClick={copyText} className=" px-2 py-1 rounded bg-gray-600">
        copy
      </button>
    </motion.div>
  );
};

export default ShortUrlPreview;
