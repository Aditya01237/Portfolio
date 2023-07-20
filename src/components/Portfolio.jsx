import React from "react";
import hostelEats from "../assets/portfolio/HostelEats.png"
import hivechat from "../assets/portfolio/Hivechat.png"
import travelcard from "../assets/portfolio/TravelCard.png"
import signin from "../assets/portfolio/SignIn.png"
import sherlock from "../assets/portfolio/Sherlock.png"
import brahma from "../assets/portfolio/Brahma.png"

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: hostelEats,
      code: "https://github.com/Aditya01237/HostelEats/tree/master/seller_app",
      demo: "https://github.com/Aditya01237/HostelEats/tree/master/seller_app"
    },
    {
      id: 2,
      src: hivechat,
      code: "https://github.com/Aditya01237/ChatApp",
      demo: "https://github.com/Aditya01237/ChatApp",
    },
    {
      id: 3,
      src: travelcard,
      code: "https://github.com/Aditya01237/TravelCard",
      demo: "https://aditya01237.github.io/TravelCard/"
    },
    {
      id: 4,
      src: signin,
      code: "https://github.com/Aditya01237/Sign_In_Page",
      demo: "https://github.com/Aditya01237/Sign_In_Page"
    },
    {
      id: 5,
      src: sherlock,
      code: "https://github.com/Aditya01237/sherlockHolmes.github.io/tree/main/assets",
      demo: "https://aditya01237.github.io/sherlockHolmes.github.io/"
    },
    {
      id: 6,
      src: brahma,
      code: "https://github.com/Aditya01237/Brahma",
      demo: "https://github.com/Aditya01237/Brahma"
    },
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Portfolio
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map(({ id, src,code,demo }) => (
            <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
              <img
                src={src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <a className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105" href={demo}>Demo</a>
                <a className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105" href={code}>Code</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
