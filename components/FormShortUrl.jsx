import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RegExr } from "../helpers/ExpresionReg";
import useQrState from "../store/useQrStore";
import ShortUrlPreview from "./ShortUrlPreview";
import Spinner from "./Spinner";
import ConfettiExplosion from "react-confetti-explosion";

const FormShortUrl = () => {
  const { urlShort, setUrlShort } = useQrState((state) => state);
  const [isLoading, setIsLoading] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [fetchData, setFetchData] = useState({});
  const [FormData, setFormData] = useState({
    urlBase: "",
    redirectFast: false,
    isValid: null,
  });
  const handleRedirectFast = (e) => {
    setFormData(() => ({
      ...FormData,
      redirectFast: true,
    }));
  };
  const handleUrlBase = ({ target: { value } }) => {
    if (value == "") {
      if (!window.matchMedia("only screen and (max-width: 768px)").matches) {
        setIsExploding(false);
      }
      setIsLoading(null);
      setUrlShort({ value: "" });
    }
    if (!/(http\:\/\/|https\:\/\/)/.test(value)) {
      setFormData(() => ({
        ...FormData,
        urlBase: value,
        isValid: false,
      }));
    } else {
      setFormData(() => ({
        ...FormData,
        urlBase: value,
        isValid: true,
      }));
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    console.log(FormData);
    const { data } = await axios.post("/api/short-url", {
      urlBase: FormData.urlBase,
      redirectFast: FormData.redirectFast,
    });
    if (!window.matchMedia("only screen and (max-width: 768px)").matches) {
      setIsExploding(true);
    }
    setFetchData(data);
    setUrlShort({ value: data?.shortUrl, status: true });
    setIsLoading(true);
    if (data?.msg) {
      toast(data?.msg, { icon: "🙄", duration: 5000 });
    } else {
      toast.success("URL acortada correctamente.");
    }
  };
  useEffect(() => {
    console.log(isExploding);
  }, [isExploding]);

  return (
    <>
      <form
        action="#"
        className="flex flex-col gap-4 w-full items-center lg:items-start
         "
        onSubmit={handleForm}
      >
        <h3 className="italic text-sm text-center lg:text-lg lg:text-left">
          1️⃣ Primero, ingresa una URL.
        </h3>
        <label
          htmlFor=""
          className="flex flex-col mt-3 w-full relative items-center lg:items-start"
        >
          <input
            type="url"
            placeholder="www.google.com"
            className="rounded leading-10 px-7 text-center outline-none w-3/4 focus:w-4/4 transition-all bg-gray-200 shadow-2xl bg-opacity-70 placeholder:text-gray-500"
            onChange={handleUrlBase}
            value={FormData.urlBase}
          />
          {FormData.isValid == false && (
            <motion.span
              layout
              style={{ top: "-3rem" }}
              className=" py-1 px-2 text-sm bg-white rounded-md mt-3 absolute shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              ❌ Verifique que la url tenga el protocolo 'http://'.
            </motion.span>
          )}
        </label>
        <label className="text-gray-400">
          Redirecionamiento rapido
          <input type="checkbox" onChange={handleRedirectFast} />
        </label>
        <h3 className="italic text-sm text-center lg:text-lg lg:text-left">
          2️⃣Por Ultimo, presiona el boton de "Acortar".
        </h3>

        <span className="flex gap-4 items-center">
          <button
            type="submit"
            disabled={!FormData.isValid}
            className="border-rose-400 opacity-100 text-black rounded-md border-2 leading-10 hover:bg-rose-400 hover:text-white transition w-48 disabled:grayscale"
          >
            Acortar
          </button>
          {isLoading == false && <Spinner />}
        </span>
      </form>
      {isExploding && (
        <>
          <ConfettiExplosion
            force={0.8}
            duration={5000}
            particleCount={300}
            width={3000}
          />
          <audio src="/fiesta.mp3" autoPlay></audio>
        </>
      )}
    </>
  );
};

export default FormShortUrl;
