

// "use client";

// import React, { useState, useEffect } from 'react';
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// const InfoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
//   </svg>
// );
// const ChevronDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//   </svg>
// );
// const ChevronUpIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
//   </svg>
// );


// export default function ReskillingHub() {

//   const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
//   const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [slidePosition, setSlidePosition] = useState(0);

//   const courses = [
//     { name: "Building automations with Python", info: "Details about Python automation." },
//     { name: "Getting it right - tool selection in automation", info: "Getting It Right - Tool Selection in Automation:\n• Understanding Business Requirements.\n• Evaluating Tool Features.\n• Comparing Open-Source and Proprietary Solutions.\n• Implementing a Test Environment." },
//     { name: "Working with Large Language Models", info: "Details about working with LLMs." },
//     { name: "Using RPA to build automations", info: "Details about using RPA." },
//     { name: "Using AI Large Language Models (LLM) to automate", info: "Details about LLM automation." },
//     { name: "Introduction to process automation", info: "Details about process automation intro." },
//     { name: "Using Integration Platform as a Service (IPaaS) to automate processes", info: "Details about using IPaaS." },
//     { name: "The history and future of automation and integration.", info: "Details about history/future of automation." },
//     { name: "Introduction to No Code and Low Code in automation and integration.", info: "Details about No Code/Low Code intro." }
//   ];

//   const levels = ["Beginner", "Intermediate", "Advanced"];
//   const priceOptions = ["Online: 40£ / month", "Offline: 100£ / month"];

//   const trainers = [
//     { name: "Olly Cogan", title: "Founder at Alphalake AI", imgSrc: "/olly.jpg" },
//     { name: "Nischay Chandra", title: "Full Stack Developer", imgSrc: "/nischay.png" }, // Replace with actual path
//     { name: "Lewis Urwin", title: "Service Hub & Data Engineer", imgSrc: "/Lewis_Urwin.jpeg" }, // Replace with actual path
//     { name: "Andrew Massey", title: "Project Manager", imgSrc: "/andrew.png" }, // Replace with actual path
//     { name: "Tony O'Neill", title: "Sr Business System Analyst", imgSrc: "/tony.png" } // Replace with actual path
//   ];

//   const rpaPrograms = [
//     { title: "Trial / Demo", imgSrc: "/course1.png" },
//     { title: "Past Class", imgSrc: "/course1.png" },
//     { title: "Live Class", imgSrc: "/course1.png" },
//     { title: "E-book", imgSrc: "/course1.png" }
//   ];

//   // Modified carousel logic for continuous scrolling
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update the active dot
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);

//       // Continuously move slides to the left
//       setSlidePosition(prevPos => prevPos + 25);

//       // When we've gone through all slides once, reset position but maintain visual continuity
//       if (slidePosition >= 100) {
//         setTimeout(() => {
//           // Get the element and check if it exists first
//           const carouselTrack = document.getElementById('carousel-track');

//           if (carouselTrack) {
//             // Only proceed if the element exists
//             carouselTrack.style.transition = 'none';
//             setSlidePosition(0);

//             // Restore transition after a brief moment
//             setTimeout(() => {
//               carouselTrack.style.transition = 'transform 500ms ease-in-out';
//             }, 50);
//           }
//         }, 500);
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [slidePosition]);

//   const handleToggleDropdown = (key: string) => {
//     setOpenDropdownKey(prevKey => (prevKey === key ? null : key));
//   };

//   const handleSelectOption = (key: string, value: string) => {
//     setSelectedValues(prevValues => ({
//       ...prevValues,
//       [key]: value,
//     }));
//     setOpenDropdownKey(null);
//   };


//   return (
//     <main className="flex flex-col justify-center items-center min-h-screen px-4 mt-12">

//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 p-6 rounded-lg  text-white">

//         <div className="p-6 rounded-lg flex flex-col justify-between bg-gray-800 shadow-md ">
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Reskilling Hub</h1>
//             <div className="flex items-center gap-3 mb-4">
//               <Image
//                 src="/olly.jpg"
//                 alt="Olly Cogan"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <span className="font-semibold">Olly Cogan</span>
//             </div>
//             <p className="mb-4">
//               Our Founder and visionary leader <b>Olly Cogan</b> at <b>Alphalake Services</b> feels as artificial intelligence continues
//               to transform industries, the demand for cutting-edge skills is greater than ever.
//             </p>
//             <p className="mb-6">
//               At <b>Alphalake Services</b>, we are committed to empowering the people of Wales with the
//               knowledge and expertise needed to thrive within an AI-driven world.
//             </p>
//             <p className="italic text-gray-400 mb-6">Know More...</p>
//           </div>
//           <div className="flex gap-4">
//             <Button>Start Learning</Button>
//           </div>
//         </div>

//         <div className="p-6 rounded-lg flex items-center justify-center bg-gray-800 shadow-md">
//           <Image
//             src="/OL.jpg"
//             alt="Olly Cogan with team"
//             width={400}
//             height={400}
//             className="rounded-lg"
//           />
//         </div>

//       </div>



//       <div className="max-w-5xl w-full text-center mt-16">
//         <h2 className="text-2xl font-bold">How your training journey looks like</h2>
//         <p className="mt-2">
//           Our training program offers three levels of certification: Beginner, Intermediate, and Advanced, available in both online and offline formats.
//           Each certification is designed to build progressively on the previous level, ensuring a structured learning path.
//         </p>
//       </div>


//       <div className="max-w-4xl w-full text-center mt-12">
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
//             <Image src="/student.png" alt="Online Training" width={50} height={50} />
//             <h3 className="font-semibold mt-4">Online Training Program</h3>
//             <ul className="text-sm mt-2 list-disc list-inside">
//               <li>Attend live video classes.</li>
//               <li>Access past lecture recordings.</li>
//               <li>Schedule live one-on-one mentorship sessions with trainers.</li>
//             </ul>
//           </div>
//           <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
//             <Image src="/training.png" alt="In-Class Course" width={50} height={50} />
//             <h3 className="font-semibold mt-4">In Class Course</h3>
//             <ul className="text-sm mt-2 list-disc list-inside">
//               <li>Attend in-person classes with trainers.</li>
//               <li>Discuss doubts after class.</li>
//               <li>Schedule in-person mentorship sessions with trainers.</li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-10">
//           <Button>Start Learning</Button>
//         </div>
//       </div>



//       <div className="max-w-5xl w-full text-left mt-16">
//         <div className="float-right ml-6 mb-4 w-[400px]">
//           <Image
//             src="/certificate.png"
//             alt="Certificate"
//             width={400}
//             height={300}
//             className="rounded-lg block"
//           />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Get Certified</h2>
//           <h3 className="font-semibold">Advanced Certification</h3>
//           <ul className="text-sm mb-4 list-disc list-inside">
//             <li>The Advanced Certification is awarded to participants who complete three additional courses after achieving the Intermediate level.</li>
//             <li>This level focuses on expert knowledge, strategic implementation, and high-level problem-solving.</li>
//             <li>Graduates with this certification showcase mastery in their field, making them highly qualified professionals.</li>
//           </ul>
//           <h3 className="font-semibold">Beginner Certification</h3>
//           <ul className="text-sm mb-4 list-disc list-inside">
//             <li>To earn a Beginner Certification, participants must complete five introductory courses.</li>
//             <li>This level provides foundational knowledge and skills, preparing learners for more advanced concepts.</li>
//             <li>Upon successful completion, participants receive a certification acknowledging their understanding of the fundamentals.</li>
//           </ul>
//           <h3 className="font-semibold">Intermediate Certification</h3>
//           <ul className="text-sm list-disc list-inside">
//             <li>To qualify for an Intermediate Certification, participants must complete four additional courses beyond the Beginner level.</li>
//             <li>This level delves deeper into industry-specific skills and practical applications.</li>
//             <li>Earning this certification demonstrates proficiency in intermediate concepts and readiness for advanced training.</li>
//           </ul>
//         </div>
//         <div className="clear-both"></div>
//       </div>

//       {/* ----- Customized For You Section (MODIFIED)----- */}
//       <section className="w-full py-12 px-4 mt-16">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-center text-3xl font-bold mb-8">
//             Customized for you
//           </h2>

//           <div className="grid grid-cols-4 gap-3 sm:gap-4">
//             {/* Header Row */}
//             <div className="bg-gray-800  font-semibold p-3 rounded-lg text-center">
//               Course Name
//             </div>
//             {levels.map((level) => (
//               <div key={level} className="bg-gray-800  font-semibold p-3 rounded-lg text-center">
//                 {level}
//               </div>
//             ))}

//             {courses.map((course, courseIndex) => (
//               <React.Fragment key={course.name}>
//                 <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center relative group h-full">
//                   <span className="text-sm">{course.name}</span>
//                   <button className="ml-2 flex-shrink-0 relative">
//                     <InfoIcon />
//                     {course.info && (
//                       <div className={`absolute bottom-full right-0 mb-2 w-max max-w-xs p-3
//                                 bg-white text-gray-700 text-xs rounded-md shadow-lg border border-gray-300
//                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-pre-line
//                                 transition-opacity duration-300 pointer-events-none z-20`}>
//                         {course.info}
//                       </div>
//                     )}
//                   </button>
//                 </div>

//                 {levels.map((level, levelIndex) => {
//                   const cellKey = `${courseIndex}-${levelIndex}`;
//                   const isOpen = openDropdownKey === cellKey;
//                   const selectedValue = selectedValues[cellKey];

//                   return (
//                     <div key={cellKey} className="relative h-full">
//                       <button
//                         type="button"
//                         onClick={() => handleToggleDropdown(cellKey)}
//                         className={`bg-gray-800  p-3 rounded-lg flex justify-center items-center cursor-pointer w-full h-full text-sm ${selectedValue ? ' font-medium' : ''}`}
//                       >
//                         <span>{selectedValue ? selectedValue.split(':')[0] : 'Select'}</span>

//                         {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//                       </button>

//                       {isOpen && (
//                         <div className="absolute top-full left-0 mt-1 w-full rounded-md shadow-lg border border-gray-300 z-10">
//                           {priceOptions.map((option) => (
//                             <button
//                               key={option}
//                               type="button"
//                               onClick={() => handleSelectOption(cellKey, option)}
//                               className="block w-full text-left px-4 py-2 bg-gray-700 text-sm hover:bg-gray-800"
//                             >
//                               {option}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>

//           <div className="mt-8 flex justify-center relative group">
//             <Button>
//               Buy Now
//             </Button>
//             <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-2
//                           bg-white text-gray-700 text-xs rounded-md shadow-lg border border-gray-300
//                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                           transition-opacity duration-300 pointer-events-none z-10`}>
//               Personalized demo
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full max-w-6xl mx-auto py-12 px-4">
//         <h2 className="text-center text-3xl font-bold mb-10">
//           Meet the Trainers
//         </h2>

//         <div className="flex flex-wrap justify-center gap-6">
//           {trainers.map((trainer) => (
//             <div key={trainer.name} className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-48 text-center"> {/* Fixed width card */}
//               <div className="relative h-56 w-full"> {/* Container for image */}
//                 <Image
//                   src={trainer.imgSrc}
//                   alt={trainer.name}
//                   layout="fill" // Fill the container
//                   objectFit="cover" // Crop image to fit container
//                   className="rounded-t-lg" // Only round top corners if needed, but objectFit might make this less obvious
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold">{trainer.name}</h3>
//                 <p className="text-sm mt-1">{trainer.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modified RPA Training Program Section */}
//       <section className="w-full max-w-6xl mx-auto py-12 px-4 mt-4">
//         <h2 className="text-center text-3xl font-bold mb-8">
//           RPA training program
//         </h2>

//         <div className="bg-gray-800 p-6 rounded-lg">
//           <div className="relative overflow-hidden">
//             <div
//               id="carousel-track"
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${slidePosition}%)` }}
//             >
//               {/* First set of slides */}
//               {rpaPrograms.map((program, index) => (
//                 <div key={`set1-${index}`} className="min-w-[25%] px-2">
//                   <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square">
//                     <div className="flex items-center justify-center h-44 w-44 ">
//                       <Image
//                         src={program.imgSrc}
//                         alt={program.title}
//                         width={140}
//                         height={140}
//                       />
//                     </div>
//                     <p className="text-center font-medium">{program.title}</p>
//                   </div>
//                 </div>
//               ))}

//               {/* Second set of slides for continuous effect */}
//               {rpaPrograms.map((program, index) => (
//                 <div key={`set2-${index}`} className="min-w-[25%] px-2">
//                   <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square">
//                     <div className="flex items-center justify-center h-44 w-44 ">
//                       <Image
//                         src={program.imgSrc}
//                         alt={program.title}
//                         width={140}
//                         height={140}
//                       />
//                     </div>
//                     <p className="text-center font-medium">{program.title}</p>
//                   </div>
//                 </div>
//               ))}

//               {/* Third set to ensure continuous flow */}
//               {rpaPrograms.map((program, index) => (
//                 <div key={`set3-${index}`} className="min-w-[25%] px-2">
//                   <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square">
//                     <div className="flex items-center justify-center h-44 w-44 ">
//                       <Image
//                         src={program.imgSrc}
//                         alt={program.title}
//                         width={140}
//                         height={140}
//                       />
//                     </div>
//                     <p className="text-center font-medium">{program.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center mt-6">
//             <div className="flex gap-2">
//               {[0, 1, 2, 3].map((dot) => (
//                 <span
//                   key={dot}
//                   className={`h-2 w-2 rounded-full ${currentSlide === dot ? 'bg-gray-100' : 'bg-gray-500'}`}
//                 ></span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }

// "use client";

// import React, { useState, useEffect } from 'react';
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// // InfoIcon remains the same
// const InfoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
//   </svg>
// );

// // Define Tab Names
// const TABS = [
//   "Online Self-learn Course",
//   "Online Trainer-led Classroom",
//   "In-person Training"
// ];

// // Define Levels (used as keys in the price structure)
// const LEVELS = ["Beginner(2 months)", "Intermediate(4 months)", "Advanced(8 months)"];


// const PRICES = {
//   [TABS[0]]: { // Online Self-learn Course Prices
//     [LEVELS[0]]: "40£ / month", // Beginner
//     [LEVELS[1]]: "55£ / month", // Intermediate
//     [LEVELS[2]]: "70£ / month", // Advanced
//   },
//   [TABS[1]]: { // Online Trainer-led Classroom Prices
//     [LEVELS[0]]: "150£ / month", // Beginner
//     [LEVELS[1]]: "180£ / month", // Intermediate
//     [LEVELS[2]]: "220£ / month", // Advanced
//   },
//   [TABS[2]]: { // In-person Training Prices
//     [LEVELS[0]]: "£1200 / month", // Beginner (Example: one-time fee)
//     [LEVELS[1]]: "£1500 / month", // Intermediate
//     [LEVELS[2]]: "£1800 / month", // Advanced
//   },
// };


// export default function ReskillingHub() {

//   const [activeTab, setActiveTab] = useState<string>(TABS[0]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [slidePosition, setSlidePosition] = useState(0);

//   const courses = [
//     { name: "Building automations with Python", info: "Details about Python automation." },
//     { name: "Getting it right - tool selection in automation", info: "Getting It Right - Tool Selection in Automation:\n• Understanding Business Requirements.\n• Evaluating Tool Features.\n• Comparing Open-Source and Proprietary Solutions.\n• Implementing a Test Environment." },
//     { name: "Working with Large Language Models", info: "Details about working with LLMs." },
//     { name: "Using RPA to build automations", info: "Details about using RPA." },
//     { name: "Using AI Large Language Models (LLM) to automate", info: "Details about LLM automation." },
//     { name: "Introduction to process automation", info: "Details about process automation intro." },
//     { name: "Using Integration Platform as a Service (IPaaS) to automate processes", info: "Details about using IPaaS." },
//     { name: "The history and future of automation and integration.", info: "Details about history/future of automation." },
//     { name: "Introduction to No Code and Low Code in automation and integration.", info: "Details about No Code/Low Code intro." }
//   ];

//   // Use the LEVELS constant defined above for headers
//   // const levels = ["Beginner", "Intermediate", "Advanced"]; // Replaced by LEVELS constant

//   const trainers = [
//     { name: "Olly Cogan", title: "Founder at Alphalake AI", imgSrc: "/olly.jpg" },
//     { name: "Nischay Chandra", title: "Full Stack Developer", imgSrc: "/nischay.png" },
//     { name: "Lewis Urwin", title: "Service Hub & Data Engineer", imgSrc: "/Lewis_Urwin.jpeg" },
//     { name: "Andrew Massey", title: "Project Manager", imgSrc: "/andrew.png" },
//     { name: "Tony O'Neill", title: "Sr Business System Analyst", imgSrc: "/tony.png" }
//   ];

//   const rpaPrograms = [
//     { title: "Trial / Demo", imgSrc: "/course1.png" },
//     { title: "Past Class", imgSrc: "/course1.png" },
//     { title: "Live Class", imgSrc: "/course1.png" },
//     { title: "E-book", imgSrc: "/course1.png" }
//   ];

//   // Carousel logic remains the same
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
//       setSlidePosition(prevPos => prevPos + 25);
//       if (slidePosition >= 100) {
//         setTimeout(() => {
//           const carouselTrack = document.getElementById('carousel-track');
//           if (carouselTrack) {
//             carouselTrack.style.transition = 'none';
//             setSlidePosition(0);
//             setTimeout(() => {
//               carouselTrack.style.transition = 'transform 500ms ease-in-out';
//             }, 50);
//           }
//         }, 500);
//       }
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [slidePosition]);


//   return (
//     <main className="flex flex-col justify-center items-center min-h-screen px-4 mt-12 text-white">

//       {/* --- Hero Section --- */}
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 p-6 rounded-lg text-white">
//          {/* Content unchanged */}
//          <div className="p-6 rounded-lg flex flex-col justify-between bg-gray-800 shadow-md ">
//            <div>
//              <h1 className="text-3xl font-bold mb-4">Reskilling Hub</h1>
//              <div className="flex items-center gap-3 mb-4">
//                <Image
//                  src="/olly.jpg"
//                  alt="Olly Cogan"
//                  width={40}
//                  height={40}
//                  className="rounded-full"
//                />
//                <span className="font-semibold">Olly Cogan</span>
//              </div>
//              <p className="mb-4">
//                Our Founder and visionary leader <b>Olly Cogan</b> at <b>Alphalake Services</b> feels as artificial intelligence continues
//                to transform industries, the demand for cutting-edge skills is greater than ever.
//              </p>
//              <p className="mb-6">
//                At <b>Alphalake Services</b>, we are committed to empowering the people of Wales with the
//                knowledge and expertise needed to thrive within an AI-driven world.
//              </p>
//              <p className="italic text-gray-400 mb-6">Know More...</p>
//            </div>
//            <div className="flex gap-4">
//              <Button>Start Learning</Button>
//            </div>
//          </div>
//          <div className="p-6 rounded-lg flex items-center justify-center bg-gray-800 shadow-md">
//            <Image
//              src="/OL.jpg"
//              alt="Olly Cogan with team"
//              width={400}
//              height={400}
//              className="rounded-lg"
//            />
//          </div>
//       </div>

//       {/* --- Training Journey Section --- */}
//       <div className="max-w-5xl w-full text-center mt-16">
//         {/* Content unchanged */}
//         <h2 className="text-2xl font-bold">How your training journey looks like</h2>
//          <p className="mt-2">
//            Our training program offers three levels of certification: Beginner, Intermediate, and Advanced, available in both online and offline formats.
//            Each certification is designed to build progressively on the previous level, ensuring a structured learning path.
//          </p>
//       </div>

//       {/* --- Training Programs Section --- */}
//       <div className="max-w-4xl w-full text-center mt-12">
//          {/* Content unchanged */}
//          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//            <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
//              <Image src="/student.png" alt="Online Training" width={50} height={50} />
//              <h3 className="font-semibold mt-4">Online Training Program</h3>
//              <ul className="text-sm mt-2 list-disc list-inside">
//                <li>Attend live video classes.</li>
//                <li>Access past lecture recordings.</li>
//                <li>Schedule live one-on-one mentorship sessions with trainers.</li>
//              </ul>
//            </div>
//            <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
//              <Image src="/training.png" alt="In-Class Course" width={50} height={50} />
//              <h3 className="font-semibold mt-4">In Class Course</h3>
//              <ul className="text-sm mt-2 list-disc list-inside">
//                <li>Attend in-person classes with trainers.</li>
//                <li>Discuss doubts after class.</li>
//                <li>Schedule in-person mentorship sessions with trainers.</li>
//              </ul>
//            </div>
//          </div>
//          <div className="mt-10">
//            <Button>Start Learning</Button>
//          </div>
//       </div>

//       {/* --- Certification Section --- */}
//       <div className="max-w-5xl w-full text-left mt-16">
//         {/* Content unchanged */}
//          <div className="float-right ml-6 mb-4 w-[400px]">
//            <Image
//              src="/certificate.png"
//              alt="Certificate"
//              width={400}
//              height={300}
//              className="rounded-lg block"
//            />
//          </div>
//          <div>
//            <h2 className="text-2xl font-bold mb-4">Get Certified</h2>
//            <h3 className="font-semibold">Advanced Certification</h3>
//            <ul className="text-sm mb-4 list-disc list-inside">
//              <li>The Advanced Certification is awarded to participants who complete three additional courses after achieving the Intermediate level.</li>
//              <li>This level focuses on expert knowledge, strategic implementation, and high-level problem-solving.</li>
//              <li>Graduates with this certification showcase mastery in their field, making them highly qualified professionals.</li>
//            </ul>
//            <h3 className="font-semibold">Beginner Certification</h3>
//            <ul className="text-sm mb-4 list-disc list-inside">
//              <li>To earn a Beginner Certification, participants must complete five introductory courses.</li>
//              <li>This level provides foundational knowledge and skills, preparing learners for more advanced concepts.</li>
//              <li>Upon successful completion, participants receive a certification acknowledging their understanding of the fundamentals.</li>
//            </ul>
//            <h3 className="font-semibold">Intermediate Certification</h3>
//            <ul className="text-sm list-disc list-inside">
//              <li>To qualify for an Intermediate Certification, participants must complete four additional courses beyond the Beginner level.</li>
//              <li>This level delves deeper into industry-specific skills and practical applications.</li>
//              <li>Earning this certification demonstrates proficiency in intermediate concepts and readiness for advanced training.</li>
//            </ul>
//          </div>
//          <div className="clear-both"></div>
//       </div>

//       <section className="w-full py-12 px-4 mt-16">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-center text-3xl font-bold mb-8">
//             Customized for you
//           </h2>

//           <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
//             {TABS.map((tabName) => (
//               <button
//                 key={tabName}
//                 onClick={() => setActiveTab(tabName)}
//                 className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 ease-in-out
//                             ${activeTab === tabName
//                               ? 'bg-primary text-white shadow-md'
//                               : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                             }`}
//               >
//                 {tabName}
//               </button>
//             ))}
//           </div>


//           <div className="grid grid-cols-4 gap-3 sm:gap-4">
//             {/* Header Row */}
//             <div className="bg-gray-800 font-semibold p-3 rounded-lg text-center">
//               Course Name
//             </div>
//             {/* Use LEVELS constant for headers */}
//             {LEVELS.map((level) => (
//               <div key={level} className="bg-gray-800 font-semibold p-3 rounded-lg text-center">
//                 {level}
//               </div>
//             ))}

//             {/* Table Body */}
//             {courses.map((course) => (
//               <React.Fragment key={course.name}>
//                 {/* Course Name Cell */}
//                 <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center relative group h-full">
//                   <span className="text-sm">{course.name}</span>
//                   <button className="ml-2 flex-shrink-0 relative">
//                     <InfoIcon />
//                     {course.info && (
//                       <div className={`absolute bottom-full right-0 mb-2 w-max max-w-xs p-3
//                                 bg-white text-gray-700 text-xs rounded-md shadow-lg border border-gray-300
//                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-pre-line
//                                 transition-opacity duration-300 pointer-events-none z-20`}>
//                         {course.info}
//                       </div>
//                     )}
//                   </button>
//                 </div>

//                 {/* Price Cells based on Active Tab AND Level */}
//                 {/* Use LEVELS constant for mapping */}
//                 {LEVELS.map((level) => {
//                   const cellKey = `${course.name}-${level}-${activeTab}`; // More specific key
//                   // --- MODIFIED PRICE LOOKUP ---
//                   // Get price for the current tab AND the current level
//                   // Use optional chaining (?.) and nullish coalescing (??) for safety
//                   const price = PRICES[activeTab]?.[level] ?? "N/A";
//                   // --- END MODIFIED PRICE LOOKUP ---

//                   return (
//                     <div
//                       key={cellKey}
//                       className="bg-gray-800 p-3 rounded-lg flex justify-center items-center text-sm font-medium h-full"
//                     >
//                       <span>{price}</span>
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Buy Now Button (Unchanged) */}
//           <div className="mt-8 flex justify-center relative group">
//             <Button>
//               Buy Now
//             </Button>
//             <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-2
//                           bg-white text-gray-700 text-xs rounded-md shadow-lg border border-gray-300
//                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                           transition-opacity duration-300 pointer-events-none z-10`}>
//               Personalized demo available
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- Meet the Trainers Section --- */}
//       <section className="w-full max-w-6xl mx-auto py-12 px-4">
//         {/* Content unchanged */}
//         <h2 className="text-center text-3xl font-bold mb-10">
//            Meet the Trainers
//          </h2>
//          <div className="flex flex-wrap justify-center gap-6">
//            {trainers.map((trainer) => (
//              <div key={trainer.name} className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-48 text-center">
//                <div className="relative h-56 w-full">
//                  <Image
//                    src={trainer.imgSrc}
//                    alt={trainer.name}
//                    layout="fill"
//                    objectFit="cover"
//                    className="rounded-t-lg"
//                  />
//                </div>
//                <div className="p-4">
//                  <h3 className="font-semibold">{trainer.name}</h3>
//                  <p className="text-sm mt-1">{trainer.title}</p>
//                </div>
//              </div>
//            ))}
//          </div>
//       </section>

//       {/* --- RPA Training Program Section (Carousel) --- */}
//       <section className="w-full max-w-6xl mx-auto py-12 px-4 mt-4">
//         {/* Content unchanged */}
//         <h2 className="text-center text-3xl font-bold mb-8">
//            RPA training program
//          </h2>
//          <div className="bg-gray-800 p-6 rounded-lg">
//            <div className="relative overflow-hidden">
//              <div
//                id="carousel-track"
//                className="flex transition-transform duration-500 ease-in-out"
//                style={{ transform: `translateX(-${slidePosition}%)` }}
//              >
//                {/* Sets 1, 2, 3 unchanged */}
//                {rpaPrograms.map((program, index) => (
//                  <div key={`set1-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
//                ))}
//                {rpaPrograms.map((program, index) => (
//                  <div key={`set2-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
//                ))}
//                {rpaPrograms.map((program, index) => (
//                  <div key={`set3-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
//                ))}
//              </div>
//            </div>
//            <div className="flex justify-center mt-6"> {/* Dots unchanged */}
//              <div className="flex gap-2"> {[0, 1, 2, 3].map((dot) => ( <span key={dot} className={`h-2 w-2 rounded-full ${currentSlide === dot ? 'bg-gray-100' : 'bg-gray-500'}`}></span> ))} </div>
//            </div>
//          </div>
//       </section>

//     </main>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";

// InfoIcon remains the same
const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

// Define Tab Names
const TABS = [
  "Online Self-learn Course",
  "Online Trainer-led Classroom",
  "In-person Training"
];

// Modified Levels definition to separate level name and duration
const LEVELS = [
  { name: "Beginner", duration: "(2 months)" },
  { name: "Intermediate", duration: "(4 months)" },
  { name: "Advanced", duration: "(8 months)" }
];

const PRICES = {
  [TABS[0]]: { // Online Self-learn Course Prices
    [LEVELS[0].name]: "£40 / month",
    [LEVELS[1].name]: "£55 / month",
    [LEVELS[2].name]: "£70 / month",
  },
  [TABS[1]]: {  // Online Trainer-led Classroom Prices
    [LEVELS[0].name]: "£150 / month",
    [LEVELS[1].name]: "£180 / month",
    [LEVELS[2].name]: "£220 / month",
  },
  [TABS[2]]: { // In-person Training Prices
    [LEVELS[0].name]: "£350 / month",
    [LEVELS[1].name]: "£420 / month",
    [LEVELS[2].name]: "£510 / month",
  },
};

export default function ReskillingHub() {

  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePosition, setSlidePosition] = useState(0);

  const courses = [
    { name: "Building automations with Python", info: "Details about Python automation." },
    { name: "Getting it right - tool selection in automation", info: "Getting It Right - Tool Selection in Automation:\n• Understanding Business Requirements.\n• Evaluating Tool Features.\n• Comparing Open-Source and Proprietary Solutions.\n• Implementing a Test Environment." },
    { name: "Working with Large Language Models", info: "Details about working with LLMs." },
    { name: "Using RPA to build automations", info: "Details about using RPA." },
    { name: "Using AI Large Language Models (LLM) to automate", info: "Details about LLM automation." },
    { name: "Introduction to process automation", info: "Details about process automation intro." },
    { name: "Using Integration Platform as a Service (IPaaS) to automate processes", info: "Details about using IPaaS." },
    { name: "The history and future of automation and integration.", info: "Details about history/future of automation." },
    { name: "Introduction to No Code and Low Code in automation and integration.", info: "Details about No Code/Low Code intro." }
  ];

  const trainers = [
    { name: "Olly Cogan", title: "Founder at Alphalake AI", imgSrc: "/olly.jpg" },
    { name: "Nischay Chandra", title: "Full Stack Developer", imgSrc: "/nischay.png" },
    { name: "Lewis Urwin", title: "Service Hub & Data Engineer", imgSrc: "/Lewis_Urwin.jpeg" },
    { name: "Andrew Massey", title: "Project Manager", imgSrc: "/andrew.png" },
    { name: "Tony O'Neill", title: "Sr Business System Analyst", imgSrc: "/tony.png" }
  ];

  const rpaPrograms = [
    { title: "Trial / Demo", imgSrc: "/course1.png" },
    { title: "Past Class", imgSrc: "/course1.png" },
    { title: "Live Class", imgSrc: "/course1.png" },
    { title: "E-book", imgSrc: "/course1.png" }
  ];

  // Carousel logic remains the same
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
      setSlidePosition(prevPos => prevPos + 25);
      if (slidePosition >= 100) {
        setTimeout(() => {
          const carouselTrack = document.getElementById('carousel-track');
          if (carouselTrack) {
            carouselTrack.style.transition = 'none';
            setSlidePosition(0);
            setTimeout(() => {
              carouselTrack.style.transition = 'transform 500ms ease-in-out';
            }, 50);
          }
        }, 500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [slidePosition]);


  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4 mt-12 text-white">

      {/* --- Hero Section --- */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 p-6 rounded-lg text-white">
        {/* Content unchanged */}
        <div className="rounded-lg flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Reskilling Hub</h1>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/olly.jpg"
                alt="Olly Cogan"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="font-semibold text-xl">Olly Cogan</span>
            </div>
            <p className="mb-4 tracking-wider">
              Our Founder and visionary leader <b>Olly Cogan</b> at <b>Alphalake Services</b> feels as artificial intelligence continues
              to transform industries, the demand for cutting-edge skills is greater than ever.
            </p>
            <p className="mb-6 tracking-wider">
              At <b>Alphalake Services</b>, we are committed to empowering the people of Wales with the
              knowledge and expertise needed to thrive within an AI-driven world.
            </p>
            <p className="italic text-gray-400 mb-6">Know More...</p>
          </div>
          <div className="flex gap-4">
            <Button>Start Learning</Button>
          </div>
        </div>
        <div className="rounded-lg flex items-center justify-center shadow-md">
          <Image
            src="/OL.jpg"
            alt="Olly Cogan with team"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* --- Training Journey Section --- */}
      <div className="max-w-5xl w-full text-center mt-16">
        {/* Content unchanged */}
        <h2 className="text-2xl font-bold">How your training journey looks like</h2>
        <p className="mt-2">
          Our training program offers three levels of certification: Beginner, Intermediate, and Advanced, available in both online and offline formats.
          Each certification is designed to build progressively on the previous level, ensuring a structured learning path.
        </p>
      </div>

      {/* --- Training Programs Section --- */}
      <div className="max-w-4xl w-full text-center mt-12">
        {/* Content unchanged */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
            <Image src="/student.png" alt="Online Training" width={50} height={50} />
            <h3 className="font-semibold mt-4">Online Training Program</h3>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Attend live video classes.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Access past lecture recordings.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Schedule live one-on-one mentorship sessions with trainers.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col text-left">
            <Image src="/training.png" alt="In-Class Course" width={50} height={50} />
            <h3 className="font-semibold mt-4">In Class Course</h3>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Attend in-person classes with trainers</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Discuss doubts after class.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Schedule in-person mentorship sessions with trainers.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <Button>Start Learning</Button>
        </div>
      </div>
      <div className="max-w-5xl w-full text-left mt-16">
        <h2 className="text-3xl font-bold mb-6 justify-center text-center">Get Certified</h2>

        <div className="flex justify-center items-center mb-8">
          <div>
            <Image
              src="/certi.png"
              alt="Certificate"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>


        {/* 3-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Beginner Column */}
          <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h3 className="font-semibold text-center mb-3">Beginner Certification</h3>
            <ul className="text-sm space-y-2">
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Complete 5 introductory courses.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Gain foundational knowledge and skills.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Receive certification upon completion.</span>
              </li>
            </ul>
          </div>

          {/* Intermediate Column */}
          <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h3 className="font-semibold text-center mb-3">Intermediate Certification</h3>
            <ul className="text-sm space-y-2">
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Complete 4 additional courses after Beginner level.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Learn industry-specific skills and practical applications.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Demonstrate proficiency in intermediate concepts.</span>
              </li>
            </ul>
          </div>

          {/* Advanced Column */}
          <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h3 className="font-semibold text-center mb-3">Advanced Certification</h3>
            <ul className="text-sm space-y-2">
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Complete 3 additional courses after Intermediate level.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Focus on expert knowledge and strategic implementation.</span>
              </li>
              <li className="flex">
                <span className="mr-2 font-bold">•</span>
                <span>Showcase mastery and high-level problem-solving skills.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="w-full py-12 px-4 mt-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-16">
            Customized for you
          </h2>

          <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
            {TABS.map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 ease-in-out
                            ${activeTab === tabName
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                {tabName}
              </button>
            ))}
          </div>


          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {/* Header Row */}
            <div className="bg-gray-800 font-semibold p-3 rounded-lg text-center">
              Course Name
            </div>
            {/* Modified Level Headers to include duration on new line with smaller text */}
            {LEVELS.map((level) => (
              <div key={level.name} className="bg-gray-800 font-semibold p-3 rounded-lg text-center">
                <div>{level.name}</div>
                <div className="text-xs mt-1 text-gray-300">{level.duration}</div>
              </div>
            ))}

            {/* Table Body */}
            {courses.map((course) => (
              <React.Fragment key={course.name}>
                {/* Course Name Cell */}
                <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center relative group h-full">
                  <span className="text-sm">{course.name}</span>
                  <button className="ml-2 flex-shrink-0 relative">
                    <InfoIcon />
                    {course.info && (
                      <div className={`absolute bottom-full right-0 mb-2 w-max max-w-xs p-3
                                bg-primary text-xs rounded-md shadow-lg
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-pre-line
                                transition-opacity duration-300 pointer-events-none z-20`}>
                        {course.info}
                      </div>
                    )}
                  </button>
                </div>

                {/* Price Cells based on Active Tab AND Level */}
                {LEVELS.map((level) => {
                  const cellKey = `${course.name}-${level.name}-${activeTab}`; // More specific key
                  // Modified price lookup to use level.name
                  const price = PRICES[activeTab]?.[level.name] ?? "N/A";

                  return (
                    <div
                      key={cellKey}
                      className="bg-gray-800 p-3 rounded-lg flex justify-center items-center text-sm font-medium h-full"
                    >
                      <span>{price}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Buy Now Button (Unchanged) */}
          <div className="mt-8 flex justify-center relative group">
            <Button>
              Buy Now
            </Button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-2
                          bg-white text-gray-700 text-xs rounded-md shadow-lg border border-gray-300
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-opacity duration-300 pointer-events-none z-10`}>
              Personalized demo available
            </div>
          </div>
        </div>
      </section>

      {/* --- Meet the Trainers Section --- */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4">
        {/* Content unchanged */}
        <h2 className="text-center text-3xl font-bold mb-10">
          Meet the Trainers
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-48 text-center">
              <div className="relative h-56 w-full">
                <Image
                  src={trainer.imgSrc}
                  alt={trainer.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{trainer.name}</h3>
                <p className="text-sm mt-1">{trainer.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- RPA Training Program Section (Carousel) --- */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 mt-4">
        {/* Content unchanged */}
        <h2 className="text-center text-3xl font-bold mb-8">
          RPA training program
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="relative overflow-hidden">
            <div
              id="carousel-track"
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slidePosition}%)` }}
            >
              {/* Sets 1, 2, 3 unchanged */}
              {rpaPrograms.map((program, index) => (
                <div key={`set1-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
              ))}
              {rpaPrograms.map((program, index) => (
                <div key={`set2-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
              ))}
              {rpaPrograms.map((program, index) => (
                <div key={`set3-${index}`} className="min-w-[25%] px-2"> <div className="bg-gray-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square"> <div className="flex items-center justify-center h-44 w-44 "> <Image src={program.imgSrc} alt={program.title} width={140} height={140} /> </div> <p className="text-center font-medium">{program.title}</p> </div> </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6"> {/* Dots unchanged */}
            <div className="flex gap-2"> {[0, 1, 2, 3].map((dot) => (<span key={dot} className={`h-2 w-2 rounded-full ${currentSlide === dot ? 'bg-gray-100' : 'bg-gray-500'}`}></span>))} </div>
          </div>
        </div>
      </section>

    </main>
  );
}