import React from "react";
import { assets, plans } from "../assets/assets.jsx";

export const BuyCredit = () => {
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button>Our Plans</button>
      <h1>Choose the plan that's right for you</h1>
      <div>
        {plans.map((item, indx) => (
          <div>
            <img src={assets.main_logo} alt="" />
            <p>{item.id}</p>
            <p>{item.desc}</p>
            <p>
              <span>${item.price}</span>
            </p>
            <button>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};
