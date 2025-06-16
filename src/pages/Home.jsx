import React from "react";
import { Header } from "../components/Header";
import { Steps } from "../components/Steps";
import { BgSlider } from "../components/BgSlider";

export const Home = () => {
  return (
    <>
      <div>
        <Header />
        <Steps/>
        <BgSlider/>
      </div>
    </>
  );
};
