import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>

        <p className="text-xl mt-20">
          I'm Aditya, an aspiring developer passionate about creating websites and mobile applications 
          using React and Flutter. As a fresher, I approach every project with curiosity and a determination 
          to solve problems creatively. I may not have extensive experience, but I make up for it with a 
          willingness to learn and adapt.
        </p>

        <br />

        <p className="text-xl">
          My portfolio showcases projects that highlight my dedication and eagerness to grow in this 
          ever-evolving field. I believe in crafting user-centric experiences and collaborating with
          experienced professionals to enhance my skills. If you have a project that could use a fresh 
          perspective and a proactive mindset, I'd love to be a part of it and contribute my enthusiasm 
          for problem-solving and development.
        </p>
      </div>
    </div>
  );
};

export default About;
