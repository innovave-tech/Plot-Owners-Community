import { Link } from 'react-router-dom';
import { ASSOCIATION } from '../lib/constants';
import { CheckCircle, Vote, Users, MapPin, Shield, FileText } from 'lucide-react';

export default function Membership() {

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section - Task 4.1 */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">
            Est. {ASSOCIATION.established}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Membership
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Jagannathapuram Plot Owners Welfare Association (JPOWA) provides membership to eligible plot owners and ensures equal participation in the administration and welfare of the community.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Eligibility Section - Task 4.2 */}
        <section id="eligibility">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Eligibility for Membership
            </h2>
          </div>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Any person owning a plot in Jagannathapuram and above 18 years of age is eligible.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Membership is obtained upon ownership of a plot.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  An entrance fee of ₹1000 is payable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  The membership fee is non-refundable.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Membership Benefits - Task 4.3 */}
        <section id="benefits">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Membership Benefits
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Vote, title: "Voting Rights", desc: "Members can participate in association decisions." },
              { icon: Users, title: "Representation", desc: "Members can attend General Body Meetings." },
              { icon: MapPin, title: "Access to Common Amenities", desc: "Members can enjoy facilities maintained by the Association." },
              { icon: Shield, title: "Participation", desc: "Members may contest elections and become committee members." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transfer of Membership - Task 4.4 */}
        <section id="transfer">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Membership is Transferred
            </h2>
          </div>
          <div className="card">
            <div className="space-y-6">
              {[
                "Seller clears all outstanding dues.",
                "Seller returns membership card.",
                "Seller obtains No Objection Certificate (NOC).",
                "Buyer submits ownership documents.",
                "Buyer pays ₹1000 membership fee.",
                "New membership card is issued."
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2 border-l-2 border-gray-200 pl-4 last:border-l-0">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Joint Ownership - Task 4.5 */}
        <section id="joint-ownership">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Joint Ownership
            </h2>
          </div>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Only one joint owner can become a member.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  One family, company, or association is treated as a single unit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Only one vote is permitted irrespective of the number of plots owned.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Maintenance Charges - Task 4.6 */}
        <section id="maintenance">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Maintenance Charges
            </h2>
          </div>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Members are required to pay maintenance charges decided by the General Body.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Delay in payment may result in suspension of common amenities.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Penalties may be imposed for late payments.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Members must obtain an NOC before selling their property.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Membership Disqualification - Task 4.7 */}
        <section id="disqualification">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Disqualification
            </h2>
          </div>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Members whose dues remain unpaid for more than 180 days lose voting rights.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Re-admission is subject to the decision of the Executive Committee.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Record of Members - Task 4.8 */}
        <section id="records">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Member Records
            </h2>
          </div>
          <div className="card">
            <p className="text-gray-700 mb-4">
              The Association maintains a register containing:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Owner details.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Next of kin information.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Passport-size photographs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Membership records.</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-6 italic">
              These records are available for verification by members.
            </p>
          </div>
        </section>

        {/* Membership Form Section */}
        <section id="apply" className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Apply for Membership
          </h2>
          <p className="text-gray-600 mb-8">
            Ready to join? Fill out the membership application form.
          </p>
          <Link to="/membership-form" className="btn-accent text-base px-10 py-4 inline-flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Get Membership Form
          </Link>
        </section>
      </div>
    </div>
  );
}
