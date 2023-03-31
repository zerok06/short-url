import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-hot-toast";
import useQrState from "../store/useQrStore";

const ShortUrlPreview = () => {
  let { urlShort } = useQrState((state) => state);
  urlShort = "http://" + window.location.host + "/" + urlShort;
  const copyText = (e) => {
    navigator.clipboard
      ?.writeText(urlShort)
      .then(() => {
        toast("URL copiada!", {
          icon: "📝",
        });
      })
      .catch(() => {
        toast("Navegador no soportado!", {
          icon: "❌",
        });
      });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delayChildren: 0.1 } }}
      exit={{ opacity: 0 }}
      className=" py-4 px-4   rounded-lg flex items-center gap-4 bg-gray-100"
    >
      <p className="font-light text-base">
        <a href={urlShort} target="_blank">
          {urlShort}
        </a>
      </p>
      <button onClick={copyText} className=" px-2 py-1 rounded bg-gray-200">
        Copiar
      </button>
    </motion.div>
  );
};

export default ShortUrlPreview;
