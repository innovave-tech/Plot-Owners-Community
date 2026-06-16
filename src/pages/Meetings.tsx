import { ASSOCIATION } from '../lib/constants';
import { CheckCircle, Users, Calendar, Clock, AlertCircle, Vote, User, Building2, Wallet, FileText, PiggyBank, Shield, Target } from 'lucide-react';

export default function Meetings() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section - Task 5.1 + 7.1 */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">
            Est. {ASSOCIATION.established}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meetings & Finances
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            JPOWA conducts various meetings and maintains financial discipline and transparency to ensure effective governance and welfare of all members.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Meetings Grid - First Row */}
        <section>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Annual General Meeting - Task 5.2 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Annual General Meeting</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">AGM is held every year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">It is conducted during the first quarter of the financial year (April to June).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Members are given at least 21 days' notice before the meeting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">The AGM elects the Executive Committee and reviews the Association's accounts and activities.</span>
                </li>
              </ul>
            </div>

            {/* General Body Meeting - Task 5.3 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">General Body Meeting</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">The General Body is the highest authority of the Association.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">A General Body Meeting must be held at least once every nine months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Members discuss important matters concerning the Association.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Meetings Grid - Second Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Special Meetings - Task 5.4 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Special Meetings</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Special meetings may be called whenever necessary.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">A minimum notice period of 7 days is required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Such meetings can be requested by five or more members.</span>
                </li>
              </ul>
            </div>

            {/* Extra-Ordinary General Body Meeting - Task 5.5 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Extra-Ordinary General Body Meeting</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">The President or Secretary may convene an Extra-Ordinary General Body Meeting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Such a meeting can also be requested by at least 70% of the members.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Reasons for calling the meeting must be specified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">The meeting must be arranged within one month of receiving the request.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quorum Requirements - Task 5.6 */}
          <section className="mb-6">
            <div className="card bg-accent-50 border-accent-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-900" />
                </div>
                <h3 className="text-xl font-semibold text-accent-900">Quorum Requirements</h3>
              </div>
              <p className="text-accent-800 text-lg">
                51% of the members or their authorized representatives constitute the quorum for a meeting.
              </p>
            </div>
          </section>

          {/* Adjourned Meetings - Task 5.7 */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Adjourned Meetings</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">If sufficient quorum is not present, the meeting may be adjourned.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The adjourned meeting can be held after one hour.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">If quorum is still absent, ten members present shall constitute the quorum.</span>
              </li>
            </ul>
          </div>

          {/* Voting Rights - Task 5.8 */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Vote className="w-5 h-5 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Voting Rights</h3>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Every member has one vote.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">In case of a tie, the Presiding Officer has a casting vote.</span>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Proxy Voting</h4>
            <p className="text-gray-700 mb-2">Members unable to attend may authorize:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Family members.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Residents.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Non-voting members.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Plot licensees.</span>
              </li>
            </ul>
            <p className="text-gray-700 mb-6 italic">Authorization must be given in writing.</p>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Tenant Participation</h4>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Tenants may attend General Body Meetings if authorized.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Tenants do not possess voting rights.</span>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Disqualification</h4>
            <p className="text-gray-700 mb-2">Members with dues outstanding for more than six months:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Cannot vote.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Cannot contest elections.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Cannot be co-opted to the Committee.</span>
              </li>
            </ul>
          </div>

          {/* Presiding Officer - Task 5.9 */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Presiding Officer</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The President presides over General Body Meetings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">In the President's absence, the Secretary presides.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">If both are absent, members present may elect a chairman from among themselves.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- Funds & Accounts Sections --- */}

        {/* Bank Account - Task 7.2 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Bank Account
          </h2>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The Association maintains its bank account with a nationalized bank.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The branch should be located near Jagannathapuram.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The account includes cheque book facilities.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Payments and Transactions - Task 7.3 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Payments and Transactions
          </h2>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Payments exceeding ₹25,000 shall be made through cheque.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Cheques are jointly signed by the Secretary and one other Board Member.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Proper records of transactions are maintained.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Petty Cash - Task 7.4 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Petty Cash
          </h2>
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent-900" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900">Petty Cash Limit</h3>
            </div>
            <p className="text-accent-800 text-lg">
              A petty cash amount not exceeding <span className="font-bold text-2xl">₹25,000</span> may be maintained in the custody of the Secretary or Treasurer.
            </p>
          </div>
        </section>

        {/* Annual Financial Statement - Task 7.5 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Annual Financial Statement
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Every year, before 30th April, the Treasurer prepares the annual financial statement containing:
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Profit and Loss Account", desc: "Details of income and expenditure." },
              { title: "Receipts and Expenditure Statement", desc: "Summary of collections and payments." },
              { title: "Assets and Liabilities", desc: "Valuation of properties and liabilities." },
              { title: "Property Evaluation", desc: "Depreciation and appreciation of assets." }
            ].map((item, idx) => (
              <div key={idx} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Corpus Fund - Task 7.6 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Corpus Fund
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Contribution: <span className="font-bold text-2xl text-accent-700">₹10,000 per plot</span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: Shield, title: "General Operating Reserve", desc: "Maintains financial stability." },
              { icon: Building2, title: "Improvements", desc: "Supports infrastructure improvements." },
              { icon: Target, title: "Replacement Works", desc: "Helps replace aging facilities." },
              { icon: AlertCircle, title: "Emergency Capital Works", desc: "Funds urgent development requirements." }
            ].map((item, idx) => (
              <div key={idx} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Corpus funds are invested in nationalized banks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">In emergencies, the Association may temporarily utilize these funds.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Such amounts are to be restored within one year without interest.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Sinking Fund - Task 7.7 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Sinking Fund
          </h2>
          <div className="card mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Every member contributes as decided by the Executive Committee.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Contributions may be based on plot size.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Funds are maintained with nationalized banks.</span>
              </li>
            </ul>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Major Repairs", desc: "Used for large maintenance activities." },
              { title: "One-Time Maintenance", desc: "Supports special repair requirements." },
              { title: "Infrastructure Renewal", desc: "Ensures long-term upkeep of common facilities." }
            ].map((item, idx) => (
              <div key={idx} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="w-5 h-5 text-primary-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget and Audit - Task 7.8 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Budget and Audit
          </h2>
          <div className="card">
            <p className="text-gray-700 mb-4">
              The Treasurer is responsible for:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Preparing annual budgets.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Presenting budget proposals during the AGM.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Preparing balance sheets.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Arranging audits of accounts.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Maintaining accurate financial records.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Financial Transparency - Task 7.9 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Financial Transparency
          </h2>
          <div className="card bg-primary-50 border-primary-200">
            <p className="text-gray-800 mb-6">
              JPOWA ensures:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Proper maintenance of accounts.",
                "Timely collection of dues.",
                "Responsible use of funds.",
                "Regular audits.",
                "Transparent financial administration."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-700" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
