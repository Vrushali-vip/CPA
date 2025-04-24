import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from "react";
import Image from "next/image";
import HamburgerMenu from "@/components/custom/HamburgerMenu";
import authOptions from "../api/auth/[...nextauth]/authOptions";

interface ProjectDocument {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  filename: string;
  description: string;
  type: string;
  client: string;
  file: string;
}


// async function getDocuments(clientSub: string) {
//   const pb = new PocketBase('https://api.alphalake.services');

//   try {
//     console.log("Fetching documents for clientSub:", clientSub);

//     const filterString = `client = ${JSON.stringify(clientSub)}`;
//     console.log("Using filter:", filterString);

//     const resultList = await pb.collection('project_documents').getFullList({
//       sort: '-created',
//     });

//     console.log("All documents:", resultList.map(doc => ({
//       id: doc.id,
//       client: doc.client,
//       type: doc.type,
//       file: doc.file
//     })));

//     return { documents: resultList as ProjectDocument[], error: null };
//   } catch (err) {
//     console.error('Error fetching documents:', err);
//     return { documents: [], error: "Failed to load documents" };
//   }
// }
async function getDocuments(clientSub: string) {
  const pb = new PocketBase('https://api.alphalake.services');

  try {
    const encodedClientSub = encodeURIComponent(clientSub);
    console.log("🔍 Encoded ClientSub being queried:", encodedClientSub);

    const allDocuments = await pb.collection('project_documents').getList(1, 50);
    console.log("📦 All documents in the collection:", allDocuments.items);

    const clientMap: { [key: string]: string } = {
      "O'Sullivan's Pharmacy Group": 'ny1u0pic35bepny',  
    };

    const clientId = clientMap[clientSub];

    if (!clientId) {
      console.log(`❌ No matching client ID for clientSub: ${clientSub}`);
      return { documents: [], error: "Client ID not found" };
    }

    const resultList = await pb.collection('project_documents').getList(1, 50, {
      filter: `client = "${clientId}"`, 
      sort: '-created',  
    });

    console.log("📦 Documents fetched from the server:", resultList.items);

    return { documents: resultList.items as ProjectDocument[], error: null };
  } catch (err) {
    console.error('❌ Error fetching documents:', err);

    return { documents: [], error: "Failed to load documents" };
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'pdf': return '📄';
    case 'svg': return '🖼️';
    case 'doc':
    case 'docx': return '📝';
    case 'xls':
    case 'xlsx': return '📊';
    default: return '📁';
  }
}

export default async function ProjectDocumentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect('/api/auth/signin');

  const clientSub = session.user.sub;
  const pb = new PocketBase('https://api.alphalake.services');

  if (!clientSub) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Project Documents</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 shadow-sm">
          <p className="text-red-800">User account is not associated with any client.</p>
          <Link href="/">
            <span className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Return to Home
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const { documents, error } = await getDocuments(clientSub);
  const isXpoClient = clientSub === "XPO";

  return (
    <div className="flex min-h-screen mt-3">
      <div className="pl-2">
        <HamburgerMenu />
      </div>

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl p-4 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">
              Project Documents for {clientSub}
            </h1>

            {isXpoClient && (
              <Image 
                src="/xpo-logistics.svg" 
                alt="XPO Logistics" 
                width={120} 
                height={40} 
                className="h-6 w-auto block mt-2"
              />
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 shadow-sm mb-6">
              <p className="text-red-800">{error}</p>
              <Link href="/">
                <span className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Return to Home
                </span>
              </Link>
            </div>
          )}

          <Suspense fallback={
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          }>
            {documents.length === 0 ? (
              <div className=" border border-gray-200 rounded-md p-8 text-center">
                <p className=" mb-4">No documents found for your account.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{getFileIcon(doc.type)}</span>
                        <span className="text-sm text-gray-300">{formatDate(doc.created)}</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">{doc.filename}</h3>
                      <p className="text-gray-300 text-sm mb-4">{doc.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {doc.type.toUpperCase()}
                        </span>
                        <a 
                          href={pb.files.getUrl(doc, doc.file)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-primary text-white rounded text-sm"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
