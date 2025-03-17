import Image from 'next/image';

export default function Hubspot() {
  return (
    <section className="mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 max-w-7xl min-h-screen ">
      <div>
        <h1 className="text-3xl font-bold text-center mt-10 mb-10 font-robo">Hubspot Recipe</h1>
        <div className="min-h-screen flex  p-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row  gap-8">
            <div className="flex-1">
              <p className="text-lg font-robo">
                When a deal was marked as won the recipe would then replicate the deal with the correct line items across the pipeline in the corresponding months and years to forecast the income. Once these newly created deals hit their due date the bot will then send an invoice to Xero matching the line items and values from the HubSpot deal.
              </p>
            </div>
            <div className="flex-1">
              <Image
                src="/hubspot.png"
                alt="Illustration of deal replication and invoicing"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}