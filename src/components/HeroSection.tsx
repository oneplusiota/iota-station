import React from "react";

function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-3xl font-thin text-center">Shivam Nayak</h2>
      <p className="text-xl text-center">
        Software Developer, Final Year - IIT Kharagpur
      </p>
      <a
        className="flex justify-center items-center px-2 py-1 mt-2 rounded-lg border-[1px] border-black bg-slate-300 hover:bg-slate-200 transition ease-in duration-300"
        href="https://drive.google.com/file/d/1F5f4Hk5Z4lJmWwDwV2bBRsUpTCA-pm48/view"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
        </svg>
        <p className="pl-1 dark:text-black">Resume</p>
      </a>
    </div>
  );
}

export default HeroSection;
