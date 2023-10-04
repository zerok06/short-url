'use client'
import Adsense, { AdUnit } from "@eisberg-labs/next-google-adsense";
import React, { useEffect } from "react";
const Ads = () => {

  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }, []);

  return (
    <div className="w-2/4 h-80 bg-gray-100 flex justify-center items-center relative rounded-lg">
      <span className="absolute right-0 top-0 text-sm">Anuncio</span>
      <Adsense client_id="4750405414089553" />
      <AdUnit className="block text-center adsbygoogle"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4750405414089553"
        data-ad-slot="3539473228" />
    </div>
  );
};

export default Ads;
