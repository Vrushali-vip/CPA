// components/custom/TicketSkeleton.tsx

export default function TicketSkeleton() {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="animate-pulse p-4 border rounded bg-gray-700">
        <div className="h-6 bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/4 mt-2"></div>
      </div>
    ));
  }
  