import { Card, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const mockNews = [
  {
    title: "New Safety Measures Introduced for Travelers",
    summary: "Compass Point Assist rolls out new safety protocols for individuals visiting high-risk zones.",
    date: "April 26, 2025",
  },
  {
    title: "Humanitarian Access Expanded in Eastern Ukraine",
    summary: "Agencies report better access to affected communities, improving support delivery.",
    date: "April 23, 2025",
  },
  {
    title: "Ukraine Travel Advisory Updated",
    summary: "Foreign offices adjust travel guidance based on latest geopolitical developments.",
    date: "April 20, 2025",
  },
];

export default function NewsPage() {
  return (
    <section className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <Newspaper className="w-6 h-6" />
        News Feed
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.map((news, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-xl font-bold">{news.title}</h3>
              <p className="text-sm text-muted-foreground">{news.date}</p>
              <p>{news.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
