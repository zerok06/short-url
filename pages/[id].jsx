import { useRouter } from "next/router";
import React from "react";
import { useTimeoutFn } from "react-use";
import Ads from "../components/Ads";
import Clock from "../components/Clock";
import NavBar from "../components/NavBar";
import axiosInstance from "../config/axiosRequest";

const Query = ({ urlBase }) => {
  const router = useRouter();
  console.log(urlBase);
  const redirect = () => {
    router.push(urlBase);
  };
  const [] = useTimeoutFn(redirect, 3000);
  return (
    <>
      <NavBar />
      <section className="flex w-full flex-col items-center justify-center pt-20 h-screen gap-3">
        <Clock />
        <p className="text-gray-400">Por favor, espere un momento...</p>
        <Ads />
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await axiosInstance.post("/short-url/search", { id });
  console.log(data);
  return {
    props: { ...data },
  };
}

export default Query;
