"use client";

export default function MapPage() {
  return (
    <div className="w-screen h-screen rounded-xl overflow-hidden p-6">
      <iframe
        src="https://map-ashen-two.vercel.app/"
        title="Map"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
