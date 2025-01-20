// "use client";
// // import { onFormSubmit as action } from "./action";
// import { useFormStatus } from "react-dom";
// import { useCallback } from "react";
// import styles from "./styles.module.css";

// type DownloadButtonProps = {
//     code: string;
//     link: string;
//     text: string;
//     icon?: string;
// }
// export default function DownloadButton({ code, text, icon, link }: DownloadButtonProps) {

//     const { pending } = useFormStatus();
//     const onClick = useCallback(async () => {
//         const res = await action({ code, email: localStorage.getItem("EMAIL") });
//         alert(res);

//         setTimeout(() => {
//             window.open(link, "_blank");
//         }, 100);
//     }, [code, link]);

//     return (
//         <button onClick={onClick} className={styles.dl_link} title={text} aria-disabled={pending}>
//             <i className={`bi ${icon} text-primary-3`}></i>
//             <span className="text-white fw-600">{text}</span>
//         </button>
//     )
// }