
import React from 'react';
const cardData = [
    {
        title: "API Interoperability by Design",
        content: "Every field, information point, or functionality you offer will automatically have a dedicated API endpoint, ensuring that your services are inherently interoperable. Integration is seamlessly baked into your product's DNA."
    },
    {
        title: "Proactive Monitoring and Recommendations",
        content: "As part of this subscription, our expert team proactively monitors and tests your core product. We provide API recommendations on a regular basis, either weekly or monthly, in the form of a straightforward, distributed report."
    },
    {
        title: "Streamlined API Expansion",
        content: "The next time you make changes, such as adding an extra information field to a form or screen, you'll have the option to include an API endpoint alongside it. We also offer suggestions to enhance the integrability of your product"
    },
    {
        title: "Cost-Effective API Development",
        content: "Easily and cost-effectively consolidate your API development efforts. This ensures that your customers and partners can integrate with your product in the way that best suits their needs"
    }
];
const PriceOutline = [
    {
        item: "Connector Development",
        desc: "End-to-end understanding of your API and process to develop and publish your Connector (approx. 3 weeks).",
        es: true,
        ms: true,
        ns: true
    },
    {
        item: "Alphabot Skill Product video",
        desc: "We will showcase your Connector used in an automation / integration. Jointly market it across LinkedIn, Twitter, YouTube and feature on alphalake.ai. Includes an embed link to add to your own website.",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Listing on workato.com",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Listing on alphalake.ai",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Proactive management and marketing optimisation",
        desc: "We manage your listing including optimised search results, meta tags, dedicated feature in Alphalake's and Workato's social media posts.",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Featuring in upto 4 Alphabot Skill Product Video per year",
        desc: "Market your capability for plug and play interoperability, leveraging Gartner-leading modern no-code integration technology.",
        es: false,
        ms: false,
        ns: true
    },
    {
        item: "Proactive API Monitoring for automatic Connector updates",
        desc: "Our team will monitor your API documentation and email you on a routine basis to help proactively manage and ensure that your connector is kept up to date with your lates API capabilities.",
        es: false,
        ms: false,
        ns: true
    },
    {
        item: "Continuous Improvement",
        desc: "An ongoing consultancy service to gain full understanding of your product and business offering to advise new automation Triggers and Actions that can be added to address market need and improve your market-facing capability.",
        es: false,
        ms: false,
        ns: true
    }
];

const TickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56" fill="none">
        <path d="M22.75 42L7 26.25L9.4745 23.7755L22.75 37.0493L46.5255 13.2755L49 15.75L22.75 42Z" fill="#00fc54" />
    </svg>
);

const PricingTable = () => {
    return (
        <div className="pt-4 max-w-full overflow-x-auto overflow-y-hidden sm:overflow-visible p-20 mt-10">
            <section className="container mx-auto max-w-screen-xl px-6 md:px-12 py-8">
                <div>
                    <h1 className="text-center text-6xl md:text-7xl text-white font-semibold fw-600">
                        Bring an API first approach to your digital health product
                    </h1>
                    <p className="text-center font-robo text-primary text-base md:text-lg mt-8">
                        Introducing our API Build and Maintain subscription! With this service,
                        you can say goodbye to worries about the interoperability of your system,
                        app, or service. Your API will evolve alongside your product, ensuring seamless
                        integration at every step.
                    </p>
                </div>
            </section>

            <section className="px-4">
                <div className="flex flex-wrap justify-center gap-8 my-12">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="w-full md:w-[300px] p-4 rounded-[20px] bg-[rgba(2,45,51,0.25)] backdrop-blur-sm 
                                     shadow-[-6px_8px_10px_rgba(2,45,51,1)] transition-all duration-300 
                                     hover:shadow-none hover:translate-x-[-6px] hover:translate-y-[8px]"
                        >
                            <div className="mt-2 text-primary font-semibold text-lg uppercase text-center">
                                {card.title}
                            </div>
                            <div className="mt-2 font-robo text-white text-sm text-center">
                                {card.content}
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <section className="container mx-auto max-w-screen-xl px-6 md:px-12 py-8">

                <table className="w-full font-mont text-white">
                    <thead>
                        <tr>
                            <th className="w-[30%] pl-4 text-2xl pb-6 min-w-[70vw] sm:min-w-0"></th>
                            {["Starter", "Managed", "Proactive", "Consultancy"].map((plan) => (
                                <th key={plan} className="w-[15%] pb-6 text-center min-w-[100px]">
                                    <div className="relative mx-2">
                                        <div className="absolute inset-0 border border-dashed border-[#0D9B9C] rounded-lg bg-[rgba(2,45,51,0.25)]"></div>
                                        <div className="relative z-10 py-1 text-lg sm:text-base font-normal">{plan}</div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-[rgba(2,45,51,0.75)]">
                        <tr className="bg-[rgba(2,45,51,0.75)]">
                            <td className="p-4 font-semibold">Subscription / Pricing</td>
                            {[
                                { price: "Free", note: "* £300 per end customer" },
                                { price: "£70 month", note: "* £300 per end customer" },
                                { price: "£150 month", note: "* £300 per end customer" },
                                { price: "£250 month", note: "* £300 per end customer" }
                            ].map((item, i) => (
                                <td key={i} className="p-2 text-xs text-center relative before:content-[''] before:w-[calc(100%-10px)] before:h-full before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C] before:rounded-lg first:before:rounded-t-lg last:before:h-[calc(100%+15px)]">
                                    {item.price}<br />{item.note}
                                </td>
                            ))}
                        </tr>
                        {PriceOutline.map((item, index) => (
                            <tr key={index} className="hover:bg-[rgba(2,45,51,0.75)] transition-all duration-200 text-sm sm:text-base">
                                <td className="p-4 max-w-[50%] relative group">
                                    {item.item}
                                    {item.desc && (
                                        <p className="absolute invisible group-hover:visible left-2 p-2 bg-[#0D9B9C] text-sm mb-0 z-20">
                                            {item.desc}
                                        </p>
                                    )}
                                </td>

                                <td className="p-4 text-center relative before:content-[''] before:w-[calc(100%-10px)] before:h-full before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.es && <TickIcon />}
                                </td>
                                <td className="p-4 text-center relative before:content-[''] before:w-[calc(100%-10px)] before:h-full before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.ms && <TickIcon />}
                                </td>
                                <td className="p-4 text-center relative before:content-[''] before:w-[calc(100%-10px)] before:h-full before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.ns && <TickIcon />}
                                </td>
                                <td className="p-4 text-center relative before:content-[''] before:w-[calc(100%-10px)] before:h-full before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    <TickIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default PricingTable;