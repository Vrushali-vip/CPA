// import DownloadButton from "./DownloadButton";
import styles from "./styles.module.css";

export type ServiceComponentProps = {
    country?: "IN" | "UK"
}

export type ServiceDescriptionProps = {
    country: "IN" | "UK",
    data: {
        title: string,
        desc: string,
        priceTitle: {
            "UK": string;
            "IN": string;
        },
        priceDesc: string,
        multipack?: boolean,
        downloads: {
            text: string,
            link: string,
            code: string,
            icon?: string
        }[]
    }
}

// async function onDowloadClick(docLink: string, docCode: string) {
//     if (!docLink) return;
//     const email = localStorage.getItem("EMAIL");
//     if (email) {
//         registerDownload(docCode);
//         openDoc(docLink);
//     } else {
//     }
// }

// async function registerDownload(docCode: string, email?: string) {
//     if (!docCode) return;
//     let em = email || localStorage.getItem("EMAIL");

//     let lastSentRef = localStorage.getItem(docCode);
//     if (lastSentRef) {
//         let lastSentExpire = parseInt(lastSentRef);
//         let nowTime = new Date().getTime();

//         if (nowTime < lastSentExpire) return;
//     }

//     try {
//         // await axios.post("/api/download", { email: em, doc: docCode, code: localStorage.getItem("REF") });
//         localStorage.setItem(docCode, (new Date().getTime() + 86400000).toString());
//         // alert("A copy will be sent to "+em);
//     } catch (error) {
//         console.log(error);
//     }
// }

// function openDoc(docLink: string) {
//     setTimeout(() => {
//         window.open(docLink, "_blank");
//     }, 100);
// }

export default function ServiceDescriptionCard({ data, country }: ServiceDescriptionProps) {

    // async function onDownload(formData: FormData) {
    //     'use server';
    //     const code = formData.get('code');
    //     const link = formData.get('link');


    // }

    return (
        <>
            <div className={styles.sd_card}>
                <div className={`${styles.sd_main} col-lg-7 col-xl-8 col-md-12 col-12`}>
                    <h4 className=" fw-600 text-white">
                        {data.title}
                    </h4>
                    {
                        Boolean(data.desc) &&
                        <p className="text-white">
                            {data.desc}
                        </p>
                    }
                    {
                        data.multipack ?
                            <div className={`${styles.multipack}`}>
                                <span>
                                    Scale up efficiently with Multi-packs
                                </span>
                            </div> : <></>
                    }
                </div>
                <div className={`${styles.sd_price} col-lg-4 col-xl-3 col-md-6`}>
                    <div>
                        <h5 className="fw-600 text-white">{data.priceTitle[country]}</h5>
                        <p className="font-roboto text-white ">
                            {data.priceDesc}
                        </p>
                    </div>
                </div>
                {/* <div className={`${styles.sd_download} col-lg-7 col-xxl-9 col-md-6 col-12`}>
                    {
                        data.downloads.map((dl, idx) => <DownloadButton
                            key={idx}
                            text={dl.text}
                            link={dl.link}
                            code={dl.code}
                            icon={dl.icon}
                        />)
                    }
                </div> */}
            </div>
        </>
    )
}