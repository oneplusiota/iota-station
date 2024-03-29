import React from "react";

type Props = {};

function Skills({}: Props) {
  const skills = [
    { name: "C/C++", level: "Advanced" },
    { name: "Java", level: "Advanced" },
    { name: "Python", level: "Advanced" },
    { name: "Javascript", level: "Advanced" },
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Advanced" },
    { name: "Tailwind CSS", level: "Intermediate" },
    { name: "React", level: "Intermediate" },
    { name: "Node.js", level: "Advanced" },
    { name: "Express.js", level: "Advanced" },
    { name: "Next.js", level: "Intermediate" },
    { name: "Nest.js", level: "Advanced" },
    { name: "Springboot", level: "Intermediate" },
    { name: "Jest", level: "Intermediate" },
    { name: "AWS/Azure", level: "Intermediate" },
    { name: "GCP", level: "Advanced" },
    { name: "Postman", level: "Intermediate" },
  ];

  return (
    <div className="container mx-auto p-10 md:w-[70%] w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Skills</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="p-4 rounded border-black dark:border-white border-[1px] flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <span className="text-gray-500">{skill.level}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
