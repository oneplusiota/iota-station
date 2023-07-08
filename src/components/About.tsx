import Image from "next/image";
import React from "react";

const about = `I'm Shivam Nayak, a passionate Backend Developer with expertise
            in Java Springboot and Node.js. I'm currently pursuing my final
            year at the prestigious IIT Kharagpur. With a deep love for coding
            and problem-solving, I enjoy creating robust and efficient web
            applications that deliver exceptional user experiences. In my
            journey as a developer, I have gained extensive experience in
            building scalable and secure back-end systems. From designing APIs
            to optimizing database performance, I strive to create seamless
            connections between the front-end and back-end, ensuring smooth data
            flow and efficient functionality. I believe in the power of
            collaboration and continuously seek opportunities to work with
            diverse teams.`;

type Props = {};

function About({}: Props) {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-center">About Me</h2>
      <div className="container flex flex-col-reverse md:flex-row justify-center items-center h-full mt-5 md:w-[75%] w-full">
        <div className="flex justify-center items-center w-full md:w-1/2 px-5 mt-4">
          <p className="text-2xl font-poppins md:text-left text-center">
            {about}
          </p>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2">
          <Image
            src="/profile.jpg"
            alt="shivam nayak"
            fill
            className="object-contain !relative max-w-[80%]"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
