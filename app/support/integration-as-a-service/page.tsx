// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const PricingPage = () => {
//   return (
//     <div className="min-h-screen p-8">
//       <section className=" py-16">
//         <div className="max-w-6xl mx-auto space-y-8">
//           <h1 className="text-4xl font-bold mb-6 text-center">Transform Your Healthcare Integration</h1>
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <p className="text-white font-robo mb-4 ">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </p>
//               <p className="text-white font-robo mb-6">
//                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//               <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center">
//                 Get Started <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//             <div className="flex justify-center">
//               <div className="w-full max-w-md">
//                 <img src="/api/placeholder/600/400" alt="Image to be provided" className="rounded-lg shadow-lg" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="container mx-auto px-4">

//           <div className="flex justify-between items-start gap-8">
//             <div className="self-start">
//               <span className="text-3xl font-bold mb-8">Integration Partner Packs</span>
//             </div>

//             <div className="bg-gray-800 p-6 rounded-lg max-w-md">
//               <h3 className="font-semibold mb-2">Prerequisite:</h3>
//               <p className="text-sm text-white font-robo">
//                 For integrations utilising API Integration or healthcare iPaaS Connectors, health tech suppliers and/or healthcare providers will need to obtain access to API(s) in scope. Application and approval process for APIs can be supported by Alphalake.
//               </p>
//             </div>
//           </div>

//           <h5 className="text-lg font-semibold mb-4">Per implementation, one-time billed:</h5>
//           <div className="grid md:grid-cols-1 gap-6 mb-8">
//             <div className="bg-gray-300 p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4 text-black">Complexity Level 1</h3>
//               <ul className="mb-4 font-robo text-black">
//                 <li>Max of *2 apps/systems*, 4 API endpoints / database tables, 25 data points / fields, 10 RPA steps</li>
//                 <li>Typically delivered within 3 months turnaround, 1 weekly project stand-up meeting and up to 4 hours of initial workshops/planning meetings with stakeholders and SME&apos;</li>
//               </ul>
//               <p className="text-2xl font-bold text-gray-700 ">£5,600</p>
//             </div>

//             <div className="bg-primary p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4">Complexity Level 2</h3>
//               <ul className="mb-4  font-robo">
//                 <li>Max of 2 apps/systems*, 8 API endpoints / database tables, 50 data points / fields, 20 RPA steps</li>
//                 <li>Typically still delivered within 3 months turnaround, 1 weekly project stand-up meeting and up to 4 hours of initial workshops/planning meetings with stakeholders and SME&apos;</li>
//               </ul>
//               <p className="text-2xl font-bold">£12,800</p>
//             </div>

//             <div className="bg-teal-900 p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4">Complexity Level 3</h3>
//               <ul className="mb-4  font-robo">
//                 <li>Max of 3 apps/systems*, 20 API endpoints / database tables, 200 data points / fields, 50 RPA steps</li>
//                 <li>Typically delivered within 6 months turnaround, 1 weekly project stand-up meeting and up to 8 hours of initial workshops/planning meetings with stakeholders and SME&apos;</li>
//               </ul>
//               <p className="text-2xl font-bold ">£27,600</p>
//             </div>
//           </div>

//           <div className="bg-yellow-500 p-6 rounded-lg shadow-md mb-8">
//             <h3 className="text-xl font-bold mb-4 text-black">Custom Pricing</h3>
//             <ul className="text-black font-robo">
//               <li>Individual process beyond complexity level 3 limits</li>
//               <li>Larger programme of works, typically involving multiple</li>
//               <li>Custom pricing is also available to all customers who prefer to be quoted on a T&M basis, however requires a discovery and scoping fixed fee of £1,500 culminating in a costed Statement of Works document.</li>
//             </ul>
//           </div>

//           <div className=" p-8 rounded-lg shadow-lg">
//             <h3 className="text-2xl font-bold mb-6 text-center">Healthcare Integration Lifecycle</h3>
//             <div className="flex justify-center">
//               <img src="/snip-image.png" alt="Healthcare Integration Lifecycle" className="max-w-full" />
//             </div>
//           </div>
    
//           <p className="text-sm text-gray-500 mt-8 text-center">
//             *this maximum does not include email receiving/sending and authenticator apps
//           </p>
//         </div>
//       </section>

//       <footer className=" py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-600">
//             Prior to Planning and Analysis, Alphalake offers all customer a 1 hour initial assessment meeting to establish feasibility, tooling and whether our solutions and services are a good fit.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PricingPage;

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import Image from 'next/image';

const PricingPage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8 text-white">

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-8"> 
          <h1 className="text-4xl font-bold mb-6 text-center">Transform Your Healthcare Integration</h1>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 font-robo mb-4 "> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-300 font-robo mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img src="https://via.placeholder.com/600x400/1A2B42/FFFFFF?text=Integration+Example" alt="Healthcare Integration Example" className="rounded-lg shadow-lg" /> 
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div> 
              <h2 className="text-3xl font-bold">Integration Partner Packs</h2> 
            </div>
            <div className="bg-[#1A2B42] p-6 rounded-lg max-w-xl w-full md:w-auto"> 
              <h3 className="font-semibold mb-2 text-white">Prerequisite:</h3>
              <p className="text-sm text-gray-300 font-robo">
                For integrations utilising API Integration or healthcare iPaaS Connectors, health tech suppliers and/or healthcare providers will need to obtain access to API(s) in scope. Application and approval process for APIs can be supported by Alphalake.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  items-start">

            <div className="space-y-6">
              <h5 className="text-lg font-semibold mb-4">Per implementation, one-time billed:</h5>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-start gap-4">
                 <div className='flex-grow'>
                    <h3 className="text-xl font-bold mb-2 text-black">Complexity Level 1</h3>
                    <ul className="mb-4 font-robo text-sm text-gray-700 list-disc list-inside">
                      <li>Max of *2 apps/systems*, 4 API endpoints / database tables, 25 data points / fields, 10 RPA steps</li>
                      <li>Typically delivered within 3 months turnaround, 1 weekly project stand-up meeting and upto 4 hours of initial workshops/planning meetings with stakeholders and SME&apos;s (can be mix Alphalake, customer and end customer as project demands).</li>
                    </ul>
                 </div>
                 <p className="text-2xl font-bold text-gray-900 whitespace-nowrap">£5,600</p>
              </div>

              <div className="bg-[#1D7A82] p-6 rounded-lg shadow-md text-white flex justify-between items-start gap-4">
                 <div className='flex-grow'>
                    <h3 className="text-xl font-bold mb-2">Complexity Level 2</h3>
                    <ul className="mb-4 font-robo text-sm list-disc list-inside">
                      <li>Max of 2 apps/systems*, 8 API endpoints / database tables, 50 data points / fields, 20 RPA steps</li>
                      <li>Typically still delivered within 3 months turnaround, 1 weekly project stand-up meeting and upto 4 hours of initial workshops/planning meetings with stakeholders and SME&apos;s (can be mix Alphalake, customer and end customer as project demands).</li>
                    </ul>
                 </div>
                 <p className="text-2xl font-bold whitespace-nowrap">£12,800</p>
              </div>

              <div className="bg-[#0D4C5A] p-6 rounded-lg shadow-md text-white flex justify-between items-start gap-4">
                 <div className='flex-grow'>
                    <h3 className="text-xl font-bold mb-2">Complexity Level 3</h3>
                    <ul className="mb-4 font-robo text-sm list-disc list-inside">
                      <li>Max of 3 apps/systems*, 20 API endpoints / database tables, 200 data points / fields, 50 RPA steps</li>
                      <li>Typically delivered within 6 months turnaround, 1 project stand-up meeting and upto 8 hours of initial workshops/planning meetings with stakeholders and SME&apos;s (can be mix Alphalake, customer and end customer as project demands).</li>
                    </ul>
                 </div>
                 <p className="text-2xl font-bold whitespace-nowrap">£27,600</p>
              </div>

              <div className="bg-[#FACC15] p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-black">Custom Pricing</h3>
                <ul className="text-black font-robo text-sm list-disc list-inside">
                  <li>Individual process beyond complexity level 3 limits</li>
                  <li>Larger programme of works, typically involving multiple</li>
                  <li>Custom pricing is also available to all customers who prefer to be quoted on a T&M basis, however requires a discovery and scoping fixed fee of £1,500 culminating in a costed Statement of Works document.</li>
                </ul>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-left">
                *this maximum does not include email receiving/sending and authenticator apps
              </p>
            </div> 

            <div className="flex flex-col justify-center items-center h-full">
               <div className="flex flex-col items-center w-full max-w-lg">
                 <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                   <Image width={400} height={400} src="/snip-image.png" alt="Healthcare Integration Lifecycle" className="max-w-full h-auto" />
                 </div>

                 <p className="text-sm text-gray-400 text-center">
                   Prior to Planning and Analysis, Alphalake offers all customer a 1 hour initial assessment meeting to establish feasibility, tooling and whether our solutions and services are a good fit.
                 </p>
               </div>
            </div> 

          </div> 

        </div>
      </section>

    </div>
  );
};

export default PricingPage;