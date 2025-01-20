
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsCondition() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="py-4 px-24 container text-center">
        <h2 className="text-white font-light py-4 text-lg">Terms and Services</h2>
        <div className="border border-gray-400 p-4 rounded-lg">
          <h4 className="font-semibold mb-4 text-primary ">Payment</h4>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-primary font-semibold">1.1</span>
              <p className="ml-2 text-left">
                ALPHALAKE TECHNOLOGIES LIMITED will invoice the Customer in
                accordance with the timescales specified in <i>Reference To Payment Schedule</i>. Payment is due in pounds sterling thirty (30)
                days after the end of the month of the date of such invoice
                unless agreed otherwise.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.2</span>
              <p className="ml-2 text-left">
                No payment will be deemed to have been received until ALPHALAKE
                TECHNOLOGIES LIMITED has received cleared funds.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.3</span>
              <p className="ml-2 text-left">
                Save for any sums disputed in accordance with clause 1.5 below,
                all sums payable to ALPHALAKE TECHNOLOGIES LIMITED under this
                Agreement for Products and Services provided by ALPHALAKE
                TECHNOLOGIES LIMITED prior to the date of termination will
                become due immediately upon termination of this Agreement.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.4</span>
              <p className="ml-2 text-left">
                All payments to be made by the Customer under this Agreement
                will be made in full and without any set-off, restriction or
                condition and without any deduction or withholding for or on
                account of any counterclaim or any present or future taxes,
                levies, duties, charges, fees, deductions or withholdings of any
                nature, unless the Customer is required by law to make any such
                deduction or withholding.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.5</span>
              <p className="ml-2 text-left">
                Acting in good faith at all times, the Customer shall inform
                ALPHALAKE TECHNOLOGIES LIMITED as soon as it is aware that any
                Charges are in dispute, giving ALPHALAKE TECHNOLOGIES LIMITED
                the reason that Charges are considered to be in dispute. The
                Customer shall pay all undisputed sums in accordance with clause
                1.1 above and the Parties shall use all reasonable endeavours to
                resolve any dispute in respect of sums payable and/or due in
                accordance with clause 16, Dispute Resolution Procedure.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.6</span>
              <p className="ml-2 text-left">
                If any undisputed payment remains unpaid under this Agreement 5
                days after the terms of Clause 1.1 it shall be considered
                overdue until the date payment is received by it and ALPHALAKE
                TECHNOLOGIES LIMITED may charge interest on the sum overdue at
                the rate of 8% per annum plus the current base lending rate of
                the Bank of England from the due date until the date payment is
                made to it (both dates inclusive). The Parties agree that this
                shall constitute a substantial remedy in accordance with the
                Late Payment of Commercial Debts (Interest) Act 1998.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-primary font-semibold">1.7</span>
              <p className="ml-2 text-left">
                If Products are delivered in instalments or Services are performed in
                stages then in the absence of an agreed payment schedule in <i>Reference To Payment Schedule</i>, ALPHALAKE TECHNOLOGIES LIMITED reserves the right to
                invoice each instalment or stage as and when delivery is made to the Customer
                or the performance of a stage commences in which case payment shall be due in
                accordance with Clause 1.1 above notwithstanding non-delivery of other
                instalments or stages or fulfilment of the entire Order.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
