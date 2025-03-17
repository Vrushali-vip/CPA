// import { NextRequest, NextResponse } from "next/server";
// import pb from "@/lib/pocketbase"; 


// const secretKey = process.env.SECRET_KEY;

// if (!secretKey) {
//   throw new Error('SECRET_KEY is not defined in the environment variables');
// }

// export async function POST(request: NextRequest) {
//   const logData = await request.json();
//     try {
//         const logEntry = {
//             filename: logData.filename,
//             uuid: logData.uuid,
//             rows_count: logData.rows_count || null,
//             run_time: logData.run_time || null,
//             exception_pod_image: logData.exception_pod_image || null,
//             exception_pod_url: logData.exception_pod_url || null,
//             exception_proof_image: logData.exception_proof_image || null,
//             exception_search_result: logData.exception_search_result || null,
//             success_count: logData.success_count,
//             failure_count: logData.failure_count,
//         };

//         await pb.collection("xpo_logs").create(logEntry);

//         return NextResponse.json({ message: 'Log successfully posted to xpo_logs collection' });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("Error posting logs:", error);
//         return NextResponse.json({ error: "Internal Server Error", details: error.message });
//       } else {
//         console.error("Unknown error:", error);
//         return NextResponse.json({ error: "Internal Server Error" });
//       }
//     }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Joi from "joi";
// import pb from "@/lib/pocketbase";

// const secretKey = process.env.SECRET_KEY;

// if (!secretKey) {
//   throw new Error("SECRET_KEY is not defined in the environment variables");
// }

// const logSchema = Joi.object({
//   collection: Joi.string().required(),
//   entry: Joi.object({
//     filename: Joi.string().required(),
//     uuid: Joi.string().required(),
//     rows_count: Joi.number().optional().allow(null),
//     run_time: Joi.number().required(),
//     exception_pod_image: Joi.any().optional().allow(null),
//     exception_pod_url: Joi.any().optional().allow(null),
//     exception_proof_image: Joi.any().optional().allow(null),
//     exception_search_result: Joi.any().optional().allow(null),
//     success_count: Joi.number().required(),
//     failure_count: Joi.number().required(),
//   }).required(),
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { collection, entry } = await request.json();
//     const { error, value } = logSchema.validate({ collection, entry });

//     if (error) {
//       return NextResponse.json(
//         { error: "Validation Error", details: error.details },
//         { status: 400 }
//       );
//     }

//     await pb.collection(value.collection).create(value.entry);

//     return NextResponse.json({
//       message: `Entry successfully posted to the ${value.collection} collection`,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error posting entry:", error);
//       return NextResponse.json(
//         { error: "Internal Server Error", details: error.message },
//         { status: 500 }
//       );
//     } else {
//       console.error("Unknown error:", error);
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       );
//     }
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import pb from "@/lib/pocketbase";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}

const logSchema = Joi.object({
  collection: Joi.string().required(),
  entry: Joi.object({
    filename: Joi.string().required(),
    uuid: Joi.string().required(),
    rows_count: Joi.number().optional().allow(null),
    run_time: Joi.number().required(),
    exception_pod_image: Joi.any().optional().allow(null),
    exception_pod_url: Joi.any().optional().allow(null),
    exception_proof_image: Joi.any().optional().allow(null),
    exception_search_result: Joi.any().optional().allow(null),
    success_count: Joi.number().required(),
    failure_count: Joi.number().required(),
  }).required(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, value } = logSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { error: "Validation Error", details: error.details },
        { status: 400 }
      );
    }

    const { collection, entry } = value;

    await pb.collection(collection).create(entry);

    return NextResponse.json({
      message: `Entry successfully posted to the ${collection} collection`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error posting entry:", error);
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
