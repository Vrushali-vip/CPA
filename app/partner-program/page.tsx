
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Program"
}

export default function PartnerProgram() {
  return (
    <main className="min-h-screen bg-[#000912]">
      <article className="container mx-auto px-4 max-w-6xl">
        <div className="text-center pt-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-16">
            Alphalake Partner Program
          </h1>
          <h4 className="text-xl font-semibold text-[#059B9C] mb-8">
            What is the partner Program?
          </h4>
          <p className="mx-auto max-w-4xl font-robo text-gray-300 text-lg">
            This program is designed to help you grow your business by
            providing you with a simple and effective way to generate leads and sales.
            As an Alphalake Partner, you will be given a unique link that you
            can use to promote our services to your network. When someone clicks on
            your link and signs up for a service, you will earn a commission.
            The commission rate is based on the type of service that is purchased.
          </p>
        </div>
      </article>

      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h3 className="font-mont text-white text-3xl font-semibold">Why should I join?</h3>
        </div>
        <div className="flex flex-wrap justify-around gap-8">
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/commission.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Earn a commission on every sale that you generate
            </p>
          </div>
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/social.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Promote our services to your network and earn money
            </p>
          </div>
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/marketing.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Access to our marketing materials
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 my-8">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <h4 className="text-center font-mont text-white text-2xl font-semibold">
            Need help or <br /> need more information?
          </h4>
          <Link href="contact" className="bg-[#059B9C] font-mont font-semibold rounded-[25px] border border-[#059B9C] px-6 py-2 text-white">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}