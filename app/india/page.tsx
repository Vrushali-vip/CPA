
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "India",
};

export default function India() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="space-y-8">
        <h1 className="text-2xl font-bold text-center">Alpha ServiceHub 24/7 Follow-the-sun Support Services</h1>

        {/* Software Development aaS Section */}
        <div className="bg-gray-900 text-white p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold font-robo text-primary">Software Development aaS</h2>
          <p>Outsource automation via a simple per-process monthly fee.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Managed RPA (Low Volume)",
                price: "₹4,000",
                description:
                  "For use with applications with smaller 'digests' reducing costs to achieve minimum user activity.",
                per: "per process per month",
              },
              {
                title: "Managed RPA (Medium Volume)",
                price: "₹9,000",
                description:
                  "For use with applications with larger 'digests' allowing scalable automation processes.",
                per: "per process per month",
              },
              {
                title: "Managed RPA (High Volume)",
                price: "₹17,000",
                description:
                  "For high automation needs with maximum data handling and user activity.",
                per: "per process per month",
              },
              {
                title: "Managed iPaaS",
                price: "₹42,000",
                description:
                  "For use with modern software to enable seamless API or NoCode Automation Connectivity.",
                per: "per process per month",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
                <p className="text-lg font-bold">{item.price}</p>
                <p className="text-sm text-gray-400">{item.per}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IT / User Support aaS Section */}
        <div className="bg-gray-900 text-white p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold font-robo text-primary">IT / User Support aaS</h2>
          <p>Buy technology and we will support you to deliver the solution.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Process Build for Workato, UiPath, Automation Anywhere, Robocorp, Microsoft",
                price: "₹1,25,000",
                description:
                  "Process design and build from Alphaiake to run on any RPA/NoCode platform.",
                per: "Priced per process build-time",
              },
              {
                title:
                  "System implementation and setup from Alphaiake's SysOps team",
                price: "₹47,000",
                description:
                  "Includes setup, integration, and ongoing maintenance of tools.",
                per: "Priced per process.",
              },
              {
                title:
                  "System Support for UiPath, Automation Anywhere, Workato, Microsoft",
                price: "₹63,000",
                description:
                  "Ongoing support services for automation tools.",
                per: "Priced per System/Platform.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
                <p className="text-lg font-bold">{item.price}</p>
                <p className="text-sm text-gray-400">{item.per}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Field Engineering and Break-Fix aaS Section */}
        <div className="bg-gray-900 text-white p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold font-robo text-primary">Field Engineering and Break-Fix aaS</h2>
          <p>Utilise flexible consultancy for workflow strategy and API development.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Strategy for Automating Healthcare workflow for Healthcare Providers",
                price: "₹1,65,000",
                description:
                  "Includes 10 days of Consultancy per month to assist and support automation workflow strategies.",
                per: "Priced per engagement",
              },
              {
                title: "Design and Build your Healthcare API",
                price: "₹2,08,000",
                description:
                  "Development and delivery of secure and scalable APIs for healthcare use cases.",
                per: "Priced per build-time",
              },
              {
                title: "API Maintenance for SLA-backed support, documentation and proactive API updates",
                price: "₹42,000",
                description:
                  "Includes ongoing API monitoring, SLA-backed support, and maintenance services.",
                per: "Subscription",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
                <p className="text-lg font-bold">{item.price}</p>
                <p className="text-sm text-gray-400">{item.per}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 text-white p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold font-robo text-primary">Add Ons</h2>
          <p>Add-Ons to optimise your solution.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "SysOps Monitor aaS - Automation Infrastructure",
                price: "₹16,000",
                description:
                  "System monitoring and ongoing support for automation infrastructure.",
                per: "Priced per system monitored.",
              },
              {
                title: "SysOps Monitor aaS - Website Content",
                price: "₹500",
                description:
                  "Monitoring website content for performance and uptime.",
                per: "Priced per webpage.",
              },
              {
                title: "DataOps Monitor for any process automations operated or delivered by Alphaiake",
                price: "₹16,000",
                description:
                  "Daily support and monitoring for automation processes.",
                per: "Priced per dashboard.",
              },
              {
                title: "ServiceHub Hypercare and Userservice for assured User Experience excellence",
                price: "₹2,00,000",
                description:
                  "User experience assurance and advanced support services.",
                per: "Priced per project/solution.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
                <p className="text-lg font-bold">{item.price}</p>
                <p className="text-sm text-gray-400">{item.per}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
