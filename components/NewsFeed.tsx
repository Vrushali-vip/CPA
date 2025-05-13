// import { Card, CardContent } from "@/components/ui/card";
// import { Newspaper } from "lucide-react";

// const mockNews = [
//   {
//     title: "New Safety Measures Introduced for Travelers",
//     summary: "Compass Point Assist rolls out new safety protocols for individuals visiting high-risk zones.",
//     date: "April 26, 2025",
//   },
//   {
//     title: "Humanitarian Access Expanded in Eastern Ukraine",
//     summary: "Agencies report better access to affected communities, improving support delivery.",
//     date: "April 23, 2025",
//   },
//   {
//     title: "Ukraine Travel Advisory Updated",
//     summary: "Foreign offices adjust travel guidance based on latest geopolitical developments.",
//     date: "April 20, 2025",
//   },
// ];

// export function NewsFeed() {
//   return (
//     <section className="space-y-4">
//       <div className="flex items-center gap-2 text-xl font-semibold">
//         <Newspaper className="w-5 h-5" /> News Feed
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {mockNews.map((news, idx) => (
//           <Card key={idx} className="hover:shadow-lg transition-shadow duration-200">
//             <CardContent className="p-4 space-y-2">
//               <h3 className="text-lg font-bold">{news.title}</h3>
//               <p className="text-muted-foreground text-sm">{news.date}</p>
//               <p>{news.summary}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }


import { Card, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const mockNews = [
  {
    title: "New Safety Measures Introduced for Travelers",
    summary:
      "Compass Point Assist rolls out new safety protocols for individuals visiting high-risk zones.",
    date: "April 26, 2025",
  },
  {
    title: "Humanitarian Access Expanded in Eastern Ukraine",
    summary:
      "Agencies report better access to affected communities, improving support delivery.",
    date: "April 23, 2025",
  },
  {
    title: "Ukraine Travel Advisory Updated",
    summary:
      "Foreign offices adjust travel guidance based on latest geopolitical developments.",
    date: "April 20, 2025",
  },
];

export function NewsFeed() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Newspaper className="w-5 h-5" /> News Feed
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockNews.map((news, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-bold">{news.title}</h3>
                <p className="text-muted-foreground text-sm">{news.date}</p>
                <p>{news.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
