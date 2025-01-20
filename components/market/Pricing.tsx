import styles from "./styles.module.css";
import data from "@/utils/pricingData";
import ServiceDescriptionCard from "./ServiceDescriptionCard";

export type PricingPageProps = {
    country: "IN" | "UK"
}

export default function Pricing({ country }: PricingPageProps) {
    return <>
        <div className="container">
            <h1 className="font-mont text-white  fw-600">
                Alpha ServiceHub 24/7 Follow-the-sun Support Services
            </h1>
        </div>
        {data.map((d, idx) => {
            return <section id={d.sectionTitle} key={idx} className={styles.service_section}>
                <div className="container">
                    <h6 className="text-primary-1 font-roboto fs-3">{d.sectionTitle}</h6>
                    <br />
                    <p className="text-white fw-600 fs-4">
                        {d.sectionDesc}
                    </p>
                    <br />
                    {
                        d.cards?.length &&
                        <div className={styles.sd_wrap}>
                            {
                                d.cards.map((c, i) => <ServiceDescriptionCard key={i} data={c} country={country}/>)
                            }
                            {/* <div className={styles.caught_eyes}>
                                <h5 className="fw-600 text-white">
                                    Something catch your eye? Get in touch!
                                </h5>
                                <div className={styles.caught_form}>
                                    <InterestForm buttonLabel="Book Demo" path="demo" service={d.sectionTitle} />
                                </div>
                            </div> */}
                        </div>
                    }
                    {
                        d.sections?.length && <div className={styles.sd_wrap_slant}>
                            {
                                d.sections.map((s, ix) => {
                                    return <div key={ix}>
                                        <h6 className={`text-primary-1 font-roboto ${styles.stitle}`}>{s.head}</h6>
                                        {
                                            s.cards.map((c, i) => <ServiceDescriptionCard key={i} data={c} country={country}/>)
                                        }
                                    </div>
                                })
                            }

                            {/* <div className={styles.caught_eyes}>
                                <h5 className="fw-600 text-white">
                                    Something catch your eye? Get in touch!
                                </h5>
                                <div className={styles.caught_form}>
                                    <InterestForm buttonLabel="Book Demo" path="demo" service={d.sectionTitle} />
                                </div>
                            </div> */}
                        </div>
                    }
                </div>
            </section>
        })}
    </>
}