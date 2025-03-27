// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export default function ReskillingHub() {
//   return (
//     <main className="flex flex-col justify-center items-center min-h-screen px-4 mt-12">
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6  p-6 rounded-lg shadow-lg">
        
//         {/* Left Content Section */}
//         <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Reskilling Hub</h1>
//             <div className="flex items-center gap-3 mb-4">
//               <Image
//                 src="/olly.jpg" // Update with actual profile image path
//                 alt="Olly Cogan"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <span className="font-semibold">Olly Cogan</span>
//             </div>
//             <p className=" mb-4">
//               Our Founder and visionary leader <b>Olly Cogan</b> at <b>Alphalake Services</b> feels as artificial intelligence continues 
//               to transform industries, the demand for cutting-edge skills is greater than ever.
//             </p>
//             <p className=" mb-6">
//               At <b>Alphalake Services</b>, we are committed to empowering the people of Wales with the 
//               knowledge and expertise needed to thrive within an AI-driven world.
//             </p>
//             <p className="italic text-gray-400 mb-6">Know More...</p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4">
//             <Button className="text-white px-6 py-2 rounded-md">
//               Start Learning
//             </Button>
            
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
//           <Image
//             src="/OL.jpg" // Update with actual image path
//             alt="Olly Cogan with team"
//             width={400}
//             height={400}
//             className="rounded-lg"
//           />
//         </div>
//       </div>

//       <div className="max-w-5xl w-full text-center mt-12">
//         <h2 className="text-2xl font-bold">How your training journey looks like</h2>
//         <p className=" mt-2">
//           Our training program offers three levels of certification: Beginner, Intermediate, and Advanced, available in both online and offline formats.
//           Each certification is designed to build progressively on the previous level, ensuring a structured learning path.
//         </p>
//     </div>
//       {/* Training Journey Section */}
//       <div className="max-w-4xl w-full text-center mt-6">

//         {/* Training Cards */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Online Training Program */}
//           <div className="bg-gray-800 p-6 rounded-lg flex flex-col text-left">
//             <Image src="/student.png" alt="Online Training" width={50} height={50} />
//             <h3 className="font-semibold mt-4">Online Training Program</h3>
//             <ul className="text-sm mt-2">
//               <li>• Attend live video classes.</li>
//               <li>• Access past lecture recordings.</li>
//               <li>• Schedule live one-on-one mentorship sessions with trainers.</li>
//             </ul>
//           </div>

//           {/* In-Class Course */}
//           <div className="bg-gray-800 p-6 rounded-lg flex flex-col  text-left">
//             <Image src="/training.png" alt="In-Class Course" width={50} height={50} />
//             <h3 className="font-semibold mt-4">In Class Course</h3>
//             <ul className="text-sm mt-2">
//               <li>• Attend in-person classes with trainers.</li>
//               <li>• Discuss doubts after class.</li>
//               <li>• Schedule in-person mentorship sessions with trainers.</li>
//             </ul>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6">
//           <Button className=" text-white px-6 py-2 rounded-md">
//             Start Learning
//           </Button>
          
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ReskillingHub() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4 mt-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg">
        
        {/* Left Content Section */}
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Reskilling Hub</h1>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/olly.jpg"
                alt="Olly Cogan"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold">Olly Cogan</span>
            </div>
            <p className="mb-4">
              Our Founder and visionary leader <b>Olly Cogan</b> at <b>Alphalake Services</b> feels as artificial intelligence continues 
              to transform industries, the demand for cutting-edge skills is greater than ever.
            </p>
            <p className="mb-6">
              At <b>Alphalake Services</b>, we are committed to empowering the people of Wales with the 
              knowledge and expertise needed to thrive within an AI-driven world.
            </p>
            <p className="italic text-gray-400 mb-6">Know More...</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button className="text-white px-6 py-2 rounded-md">
              Start Learning
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
          <Image
            src="/OL.jpg"
            alt="Olly Cogan with team"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Training Journey Section */}
      <div className="max-w-5xl w-full text-center mt-12">
        <h2 className="text-2xl font-bold">How your training journey looks like</h2>
        <p className="mt-2">
          Our training program offers three levels of certification: Beginner, Intermediate, and Advanced, available in both online and offline formats.
          Each certification is designed to build progressively on the previous level, ensuring a structured learning path.
        </p>
      </div>

      <div className="max-w-4xl w-full text-center mt-6">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Online Training Program */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col text-left">
            <Image src="/student.png" alt="Online Training" width={50} height={50} />
            <h3 className="font-semibold mt-4">Online Training Program</h3>
            <ul className="text-sm mt-2">
              <li>• Attend live video classes.</li>
              <li>• Access past lecture recordings.</li>
              <li>• Schedule live one-on-one mentorship sessions with trainers.</li>
            </ul>
          </div>

          {/* In-Class Course */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col text-left">
            <Image src="/training.png" alt="In-Class Course" width={50} height={50} />
            <h3 className="font-semibold mt-4">In Class Course</h3>
            <ul className="text-sm mt-2">
              <li>• Attend in-person classes with trainers.</li>
              <li>• Discuss doubts after class.</li>
              <li>• Schedule in-person mentorship sessions with trainers.</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6">
          <Button className="text-white px-6 py-2 rounded-md">Start Learning</Button>
        </div>
      </div>

      {/* Get Certified Section */}
      <div className="max-w-5xl w-full text-left mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get Certified</h2>

          <h3 className="font-semibold">Advanced Certification</h3>
          <ul className="text-sm mb-4">
            <li>• The Advanced Certification is awarded to participants who complete three additional courses after achieving the Intermediate level.</li>
            <li>• This level focuses on expert knowledge, strategic implementation, and high-level problem-solving.</li>
            <li>• Graduates with this certification showcase mastery in their field, making them highly qualified professionals.</li>
          </ul>

          <h3 className="font-semibold">Beginner Certification</h3>
          <ul className="text-sm mb-4">
            <li>• To earn a Beginner Certification, participants must complete five introductory courses.</li>
            <li>• This level provides foundational knowledge and skills, preparing learners for more advanced concepts.</li>
            <li>• Upon successful completion, participants receive a certification acknowledging their understanding of the fundamentals.</li>
          </ul>

          <h3 className="font-semibold">Intermediate Certification</h3>
          <ul className="text-sm">
            <li>• To qualify for an Intermediate Certification, participants must complete four additional courses beyond the Beginner level.</li>
            <li>• This level delves deeper into industry-specific skills and practical applications.</li>
            <li>• Earning this certification demonstrates proficiency in intermediate concepts and readiness for advanced training.</li>
          </ul>
        </div>

        {/* Certification Image */}
        <div className="flex justify-center">
          <Image
            src="/certificate.png"
            alt="Certificate"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
