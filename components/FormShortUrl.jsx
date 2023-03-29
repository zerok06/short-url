import axios from "axios";
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
    if (value == "") {
      setIsLoading(null);
      setUrlShort({ value: "" });
    }
    setFormData(() => ({
      ...FormData,
      urlBase: value,
      isValid: RegExr.urlDetetor.test(value),
    }));
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
        className="flex flex-col gap-4 w-full items-center"
        onSubmit={handleForm}
      >
        <label htmlFor="" className="flex flex-col w-full items-center">
          <input
            type="text"
            placeholder="www.google.com"
            className="rounded  leading-10 px-7 text-center outline-none w-1/3 focus:w-2/4 transition-all bg-gray-600"
            onChange={handleUrlBase}
            value={FormData.urlBase}
          />
        </label>
        <button
          type="submit"
          disabled={!FormData.isValid}
          className="border-rose-400 opacity-100  rounded-md border-2 leading-10 hover:bg-rose-400 transition w-48 disabled:grayscale"
        >
          Acortar
        </button>
      </form>
      {isLoading == true && <ShortUrlPreview {...fetchData} />}
      {isLoading == false && <Spinner />}
    </>
  );
};

export default FormShortUrl;
