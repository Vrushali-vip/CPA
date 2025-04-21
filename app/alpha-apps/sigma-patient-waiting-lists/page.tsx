import Link from 'next/link';

export default function SigmaUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
      <section className=" space-y-4">
        <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-0">About Sigma</h3>
        <p className=" text-base leading-relaxed">
          Sigma is the brainchild of a team of ex-NHS leaders. After witnessing first-hand the data and software struggles faced by the NHS
          and the challenges this created for waiting times, and overall patient care, they wanted to find a long-term solution.
        </p>
        <p className="text-base leading-relaxed">
          Co-designed with NHS organisations, Sigma integrates data from multiple sources and harnesses the power of automation, data analytics
          and real-time intelligence – all working together in harmony to improve productivity and reduce patient waiting times.
        </p>
        <Link
          href="#"
          className="inline-block px-5 py-2 bg-primary font-semibold rounded-md "
        >
          More information →
        </Link>
      </section>
      <section>
        <h1 className="text-4xl font-bold mb-4 text-primary">Increased productivity</h1>
        <h2 className="text-3xl font-semibold mb-2">Smarter pathways</h2>
        <h2 className="text-3xl font-semibold mb-6">Better care</h2>

        <p className="mb-6 text-lg">
          Boost productivity at every stage of a patient’s pathway, using our seamless integration and automation platform,
          to achieve a reduction in patient waiting times and risk of harm.
        </p>

        <Link
          href="#"
          className="inline-block px-6 py-2 bg-primary font-semibold rounded-md "
        >
          Book a demo 📩
        </Link>
      </section>

      <section>
        <p className="text-lg">
          Whatever the needs of your organisation, Sigma has the right solution. With the option of <strong>Pulse</strong>, <strong>Intelligence</strong> and <strong>View</strong>,
          all seamlessly integrate with your existing EPR or PAS system.
        </p>
      </section>

      <section className="text-white text-base leading-relaxed">
        <h3 className="text-2xl font-semibold mb-4">Sigma View Impact</h3>
        <p className="mb-4">
          Sigma View provides next generation automated patient pathway management, enabling NHS Trusts and ICSs to: enhance productivity,
          reduce patient waiting times and identify health inequalities.
        </p>
        <p>
          Spanning physical and mental health, it integrates data from multiple clinical systems so every patient, pathway and activity is
          visible and tracked accurately, in real-time. In acute settings, overall productivity has improved by 25%, data quality by 65%
          and waiting times reduced 40% faster.
        </p>
      </section>
      <section>
        <div className="rounded-xl p-6 bg-gray-800 mb-8">
          <h3 className="text-xl font-bold mb-2">Sigma View</h3>
          <p className="text-white text-sm">
            Incorporating the benefits of SigmaPulse and SigmaIntelligence, an intuitive visual interface to streamline workflows
            and transform pathway management.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-primary text-lg font-medium bg-gray-800 mt-6 p-4 rounded-lg shadow-lg">
          <div>
            <img src="/people.png" alt="Pathways validated" className="mx-auto mb-2 h-16" />
            <div className="text-3xl font-bold">&gt;1,000,000</div>
            <div className="mt-1 text-sm">Pathways validated</div>
          </div>
          <div>
            <img src="/clock.png" alt="Hours saved" className="mx-auto mb-2 h-16" />
            <div className="text-3xl font-bold">&gt;35,000</div>
            <div className="mt-1 text-sm">Hours saved</div>
          </div>
          <div>
            <img src="/piggy.png" alt="Cost savings" className="mx-auto mb-2 h-16" />
            <div className="text-3xl font-bold">£500,000</div>
            <div className="mt-1 text-sm">Cost savings</div>
          </div>
          <div>
            <img src="/gain.png" alt="Productivity gain" className="mx-auto mb-2 h-16" />
            <div className="text-3xl font-bold">&gt;25%</div>
            <div className="mt-1 text-sm">Productivity gain</div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          <div className="rounded-xl p-6 bg-gray-800 shadow-lg">

            <h3 className="text-xl font-bold mb-2">Sigma Pulse</h3>
            <p className="text-white text-sm">
              Rapid data quality assessment providing a snapshot of your current position.
            </p>
          </div>
          <div className="rounded-xl p-6 bg-gray-800 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Sigma Intelligence</h3>
            <p className="text-white text-sm">
              A fully customisable software plug-in that provides real-time insights to enhance productivity and accuracy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
