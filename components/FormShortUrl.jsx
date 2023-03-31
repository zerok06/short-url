import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RegExr } from "../helpers/ExpresionReg";
import useQrState from "../store/useQrStore";
import ShortUrlPreview from "./ShortUrlPreview";
import Spinner from "./Spinner";

const FormShortUrl = () => {
  const { urlShort, setUrlShort } = useQrState((state) => state);
  const [isLoading, setIsLoading] = useState(null);
  const [fetchData, setFetchData] = useState({});
  const [FormData, setFormData] = useState({
    urlBase: "",
    isValid: null,
  });

  const handleUrlBase = ({ target: { value } }) => {
    if (!/(http\:\/\/|https\:\/\/)/.test(value)) {
      setFormData(() => ({
        ...FormData,
        urlBase: value,
        isValid: false,
      }));
    } else {
      if (value == "") {
        setIsLoading(null);
        setUrlShort({ value: "" });
      }
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
    });
    setFetchData(data);
    setUrlShort({ value: data?.shortUrl, status: true });
    setIsLoading(true);
    if (data?.msg) {
      toast(data?.msg, { icon: "🙄", duration: 5000 });
    } else {
      toast.success("URL acortada correctamente.");
    }
  };

  return (
    <>
      <form
        action="#"
        className="flex flex-col gap-4 w-full items-center lg:items-start
         "
        onSubmit={handleForm}
      >
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
              style={{ top: "-3rem" }}
              className=" py-1 px-2 text-sm bg-white rounded-md mt-3 absolute shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
            >
              ❌ Verifique que la url tenga el protocolo 'http://'.
            </motion.span>
          )}
        </label>
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
    </>
  );
};

export default FormShortUrl;
