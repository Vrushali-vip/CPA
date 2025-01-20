type DataOutline = {
    sectionTitle: string;
    sectionDesc: string;
    cards?: Card[]
    sections?: SectionCard[]
}[];

type Card = {
    title: string;
    desc: string;
    priceTitle: {
        UK: string;
        IN: string;
    },
    priceDesc: string;
    multipack?: boolean;
    downloads: {
        text: string;
        link: string;
        code: string
        icon?: string;
    }[]
}

type SectionCard = {
    head: string;
    cards: Card[]
}

const data: DataOutline = [
    {
        sectionTitle: "Software Development aaS",
        sectionDesc: "Outsource automation via a simple per-process monthly fee.",
        cards: [
            {
                title: "Managed RPA (Low Volume)",
                desc: `For use where apps/systems are older “legacy” software with no access to the database,
                requiring screen-bots to mimic user activity. Can be useful for automating processes
                where strategic transformation is not present.`,
                priceTitle: {
                    "UK": "£380 (billed monthly)",
                    "IN": "₹40,000 (billed monthly)"
                },
                priceDesc: "Per process per month",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "A01SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "A01QSG"
                    },
                    {
                        text: "View Case Study",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-journal-text",
                        code: "A01CS"
                    }
                ]
            },
            {
                title: "Managed RPA (Medium Volume)",
                desc: `For use where apps/systems are older “legacy” software with no access to the database,
                requiring screen-bots to mimic user activity. Can be useful for automating processes
                where strategic transformation is not present.`,
                priceTitle: {
                    "UK": "£900 (billed monthly)",
                    "IN": "₹94,000 (billed monthly)"
                },
                priceDesc: "Per process per month",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "A01SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "A01QSG"
                    },
                    {
                        text: "View Case Study",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-journal-text",
                        code: "A01CS"
                    }
                ]
            },
            {
                title: "Managed RPA (High Volume)",
                desc: `For use where apps/systems are older “legacy” software with no access to the database,
                requiring screen-bots to mimic user activity. Can be useful for automating processes
                where strategic transformation is not present.`,
                priceTitle: {
                    "UK": "£1,650 (billed monthly)",
                    "IN": "₹1,72,000 (billed monthly)"
                },
                priceDesc: "Per process per month",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "A01SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "A01QSG"
                    },
                    {
                        text: "View Case Study",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-journal-text",
                        code: "A01CS"
                    }
                ]
            },
            {
                title: "Managed iPaaS",
                desc: `For use where only modern software is in place,
                providing access to API's or Nocode Automation
                Connectors are already available.`,
                priceTitle: {
                    "UK": "£400 (billed monthly)",
                    "IN": "₹42,000 (billed monthly)"
                },
                priceDesc: "Per process per month",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "A03SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "A03QSG"
                    }
                ]
            }
        ]
    },
    {
        sectionTitle: "IT / User Support aaS",
        sectionDesc: "Buy technology and we'll support you to deliver the solution",
        sections: [
            {
                head: "Solution Delivery",
                cards: [
                    {
                        title: "Process Build for Workato, UiPath, Automation Anywhere, Robocorp, Microsoft",
                        desc: `Process Design and Build from Alphalake's IAOps team on any RPA/iPaaS technology procured from Alphalake.`,
                        priceTitle: {
                            "UK": "£1,200/mth",
                            "IN": "₹1,25,000/mth"
                        },
                        priceDesc: "Priced per process build-time",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "T01SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "T01QSG"
                            },
                            {
                                text: "View Case Study",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-journal-text",
                                code: "T01CS"
                            }
                        ]
                    },
                    {
                        title: "System implementation and setup from Alphalake's SysOps team. Platform partner licensing sold separately.",
                        desc: `Support from IAOps team at a process level. Where within scope of original IAOps build, covers all changes to process engineering, mapping and consultancy, RPA/iPaaS software development, maintenance of process design documentation, monitoring of automations.`,
                        priceTitle: {
                            "UK": "£450/mth",
                            "IN": "₹47,000/mth"
                        },
                        priceDesc: "Priced per process.",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "T02SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "T02QSG"
                            }
                        ]
                    }
                ]
            },
            {
                head: "Solution Support",
                cards: [
                    {
                        title: "System Support for UiPath, Automation Anywhere, Workato, Microsoft",
                        desc: `Platform/System Support from SysOps team. Priced per System connected 
                      to or in a customer environment. Covers technical support for any 
                      environment aspects e.g. networking, connectivity, system access, 
                      infosec, system architecture, cloud, infrastructure and IT management of the system.`,
                        priceTitle: {
                            "UK": "£600/mth",
                            "IN": "₹63,000/mth"
                        },
                        priceDesc: "Priced per System/Platform.",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "T11SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "T11QSG"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        sectionTitle: "Field Engineering and Break-Fix aaS",
        sectionDesc: "Utilise flexible consultancy for workflow strategy and API development",
        sections: [
            {
                head: "Consultancy Packs",
                cards: [
                    {
                        title: "Strategy for Automating Healthcare workflow for Healthcare Providers",
                        desc: `Includes 1.5 days of Consultancy time per month to be used as required,
                        whether that is in strategy sessions with Founders and/or senior mgmt,
                        recommendation reports, strategy documentation or hands-on process understanding
                        and user workshops sessions.`,
                        priceTitle: {
                            "UK": "£1,500/mth",
                            "IN": "₹1,55,000/mth"
                        },
                        priceDesc: "Priced per engagement with Alphalake strategy Consultant.",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "C01SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "C01QSG"
                            },
                            {
                                text: "View Case Study",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-journal-text",
                                code: "C01CS"
                            }
                        ]
                    }
                ]
            },
            {
                head: "Professional Services",
                cards: [
                    {
                        title: "Design and Build your Healthcare API",
                        desc: `Includes building unlimited Endpoints and FHIR Resources by our
                        DevOps team, supported by comprehensive business process analysis
                        via our IAOps team so process and user need drives development.
                        Covers API strategy consultancy, design, documentation and the software
                        build. Also includes an Alphalake/Workato Nocode Connector.`,
                        priceTitle: {
                            "UK": "£2,000/mth",
                            "IN": "₹2,08,000/mth"
                        },
                        priceDesc: "Priced per build-time",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "C11SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "C11QSG"
                            }
                        ]
                    },
                    {
                        title: "API Maintenance for SLA-backed support, documentation and proactive API updates",
                        desc: `Includes all documentation, API versioning, SDLC best practice
                        and management. Whilst subscription is active a Service Level
                        Agreement (SLA) exists to ensure all updates to the API adhere
                        to the agreed turnaround time, managed via our Servicehub response
                        team and DevOps resolution team.`,
                        priceTitle: {
                            "UK": "£400/mth",
                            "IN": "₹42,000/mth"
                        },
                        priceDesc: "Subscription must start from commencement of API Build.",
                        downloads: [
                            {
                                text: "Download Service Description",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-file-earmark-text",
                                code: "C12SD"
                            },
                            {
                                text: "Download Quick Start Guide",
                                link: "https://www.africau.edu/images/default/sample.pdf",
                                icon: "bi-tools",
                                code: "C12QSG"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        sectionTitle: "Add Ons",
        sectionDesc: "Add-Ons to optimise your solution",
        cards: [
            {
                title: "Sysops Monitor aaS - Automation Infrastructure",
                desc: `Realtime monitoring and alerts of any system e.g. a Virtual 
              Machine or Application. Ideal for highly optimised environments 
              or automations and integrations running business critical operations.`,
                priceTitle: {
                    "UK": "£150/mth",
                    "IN": "₹16,000/mth"
                },
                priceDesc: "Priced per System monitored.",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "AD01SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "AD01QSG"
                    },
                    {
                        text: "View Case Study",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-journal-text",
                        code: "AD01CS"
                    }
                ]
            },
            {
                title: "SysOps Monitor aaS - Website Content",
                desc: ``,
                priceTitle: {
                    "UK": "£5/WebPage",
                    "IN": "₹500 /WebPage"
                },
                priceDesc: "",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "AD01SD"
                    }
                ]
            },
            {
                title: "DataOps Monitor for any process automations operated or delivered by Alphalake",
                desc: `Daily PowerBi Reports for any Process Automation. 
              Includes Business Intelligence reports and tailored 
              data visualisation of key management information. 
              Reports are made available and distributed daily`,
                priceTitle: {
                    "UK": "£150/mth",
                    "IN": "₹16,000/mth"
                },
                priceDesc: "Priced per Dashboard.",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "AD02SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "AD02QSG"
                    }
                ]
            },
            {
                title: "ServiceHub Hypercare and Uservoice for assured User Experience excellence",
                desc: `Users have access to suggest/upvote software improvements via Uservice whilst
              Admins gain access to User Acceptance Testing (UAT) levels of support 
              (30 minute target resolution and 5 minute response times 24/7). 
              Includes same-day escalations and access to team Leads.`,
                priceTitle: {
                    "UK": "£2,000/mth",
                    "IN": "₹2,08,000/mth"
                },
                priceDesc: "Priced per Software Product/Solution.",
                downloads: [
                    {
                        text: "Download Service Description",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-file-earmark-text",
                        code: "AD03SD"
                    },
                    {
                        text: "Download Quick Start Guide",
                        link: "https://www.africau.edu/images/default/sample.pdf",
                        icon: "bi-tools",
                        code: "AD03QSG"
                    }
                ]
            }
        ]
    }
];

export default data;