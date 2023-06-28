import Image from "next/image";
import React from "react";

type Props = {};

function About({}: Props) {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-3xl font-bold">About Me</h2>
      <div className="container flex flex-col-reverse md:flex-row justify-center items-center h-full">
        <div className="flex justify-center items-center w-full md:w-2/3">
          <p className="text-2xl font-poppins w-2/3">
            I&apos;m Shivam Nayak, a passionate Backend Developer with expertise
            in Java Springboot and Node.js. I&apos;m currently pursuing my final
            year at the prestigious IIT Kharagpur. With a deep love for coding
            and problem-solving, I enjoy creating robust and efficient web
            applications that deliver exceptional user experiences. In my
            journey as a developer, I have gained extensive experience in
            building scalable and secure back-end systems. From designing APIs
            to optimizing database performance, I strive to create seamless
            connections between the front-end and back-end, ensuring smooth data
            flow and efficient functionality. I believe in the power of
            collaboration and continuously seek opportunities to work with
            diverse teams.
          </p>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/3">
          <Image
            src="/profile.jpg"
            alt="shivam nayak"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
