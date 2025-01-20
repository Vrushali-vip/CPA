// "use server";

// import downloadDocsConfig from "@/app/api/download/config";
// import Downloads from "@/models/Downloads";
// import connectDB from "@/utils/connectDB";
// import { sendDownloadMail } from "@/utils/gmail";

// type FormSubmitProps = {
//     code: string;
//     email: string | null;
// }
// export async function onFormSubmit(data: FormSubmitProps) {
//     const { code, email } = data;
//     if (!email) return "Email is required!";

//     const docInfo = downloadDocsConfig[code];
//     if (!docInfo) return "Invalid doc request!";

//     try {
//         await connectDB();
//         if (docInfo) {
//             sendDownloadMail(email, docInfo?.docLink, docInfo?.ref);
//         }
//         await Downloads.create({ email, code, doc: docInfo?.ref });
//         return `A copy sent to ${email}`;
//     } catch (error) {
//         return "Some error occurred!";
//     }
// }