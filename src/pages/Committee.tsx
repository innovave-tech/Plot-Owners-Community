import { useEffect, useState } from 'react';
import { Phone, Mail, User, Loader2, CheckCircle, Users, Calendar, Clock, Award, Briefcase, DollarSign, FileText, Shield, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CommitteeMember } from '../lib/types';
import { ASSOCIATION } from '../lib/constants';

const positionColors: Record<string, string> = {
  'President': 'bg-primary-100 text-primary-800',
  'Secretary': 'bg-accent-100 text-accent-800',
  'Treasurer': 'bg-orange-100 text-orange-800',
  'PRO': 'bg-blue-100 text-blue-800',
  'Executive Committee Member': 'bg-gray-100 text-gray-700',
};

const committeeStructure = [
  'President',
  'Vice President',
  'Secretary',
  'Assistant Secretary',
  'Treasurer',
  'Assistant Treasurer',
  'Committee Members'
];

const executiveFunctions = [
  {
    icon: Award,
    title: 'Promote Association Objectives',
    desc: 'Promote the primary aims and objectives of JPOWA.'
  },
  {
    icon: FileText,
    title: 'Annual Reports and Budgets',
    desc: 'Prepare annual reports, accounts, and budgets.'
  },
  {
    icon: DollarSign,
    title: 'Fund Management',
    desc: 'Manage funds and ensure proper utilization.'
  },
  {
    icon: Briefcase,
    title: 'Collection of Payments',
    desc: 'Ensure timely collection of maintenance charges and dues.'
  },
  {
    icon: Users,
    title: 'Appointment of Sub-Committees',
    desc: 'Constitute sub-committees whenever required.'
  },
  {
    icon: Shield,
    title: 'Maintenance of Common Facilities',
    desc: 'Maintain common areas, utilities, and infrastructure.'
  },
  {
    icon: FileText,
    title: 'Recording Minutes',
    desc: 'Maintain records of AGM and committee meetings.'
  },
  {
    icon: Users,
    title: 'Staff Management',
    desc: 'Appoint or remove employees and contractors.'
  },
  {
    icon: Award,
    title: 'Invite Experts',
    desc: 'Seek advice from specialists whenever necessary.'
  },
  {
    icon: FileText,
    title: 'Amend Rules',
    desc: 'Frame and amend rules with members\' approval.'
  }
];

export default function Committee() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('committee_members')
      .select('*')
      .eq('active', true)
      .order('display_order')
      .then(({ data }) => {
        setMembers(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section - Task 6.1 */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">
            Est. {ASSOCIATION.established}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Executive Committee
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Executive Committee is responsible for the administration, financial management, and overall welfare activities of the Jagannathapuram Plot Owners' Welfare Association.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Committee Structure - Task 6.2 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Committee Structure
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {committeeStructure.map((pos, idx) => (
              <div key={idx} className="card text-center p-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-900" />
                </div>
                <h4 className="font-semibold text-gray-900">{pos}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility - Task 6.3 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Eligibility
          </h2>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Only resident plot owners are eligible.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Authorized family members representing plot owners may also serve.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Members should actively participate in the Association.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Term of Office and Committee Meetings - Tasks 6.4 & 6.5 */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Term of Office - Highlighted */}
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-900" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900">Term of Office</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-accent-800">Executive Committee members are elected during the AGM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-accent-800">The term of office is one year.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-accent-800">Members are eligible for re-election.</span>
              </li>
            </ul>
          </div>

          {/* Committee Meetings */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Committee Meetings</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Meetings are conducted at least once every month.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Meetings may be held physically or virtually.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Current Members - Keep original section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Current Members
          </h2>
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
            </div>
          ) : (
            <>
              {members.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {members.slice(0, 3).map((m) => (
                      <div key={m.id} className="card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gray-100 ring-4 ring-primary-100 group-hover:ring-accent-200 transition-all">
                          {m.photo_url ? (
                            <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${positionColors[m.position] || positionColors['Executive Committee Member']}`}>
                          {m.position}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">{m.name}</h3>
                        <div className="space-y-2 text-sm text-gray-500">
                          {m.phone && (
                            <a href={`tel:${m.phone}`} className="flex items-center justify-center gap-2 hover:text-primary-900 transition-colors">
                              <Phone className="w-4 h-4" /> {m.phone}
                            </a>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`} className="flex items-center justify-center gap-2 hover:text-primary-900 transition-colors truncate">
                              <Mail className="w-4 h-4 flex-shrink-0" /> {m.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {members.length > 3 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {members.slice(3).map((m) => (
                        <div key={m.id} className="card flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-gray-100">
                            {m.photo_url ? (
                              <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${positionColors[m.position] || positionColors['Executive Committee Member']}`}>
                              {m.position}
                            </span>
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{m.name}</h3>
                            {m.phone && (
                              <a href={`tel:${m.phone}`} className="text-xs text-gray-500 flex items-center gap-1 hover:text-primary-900 transition-colors mt-1">
                                <Phone className="w-3 h-3" /> {m.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Committee member details will be updated soon.</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Position Responsibilities - Tasks 6.6-6.8 */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* President */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">President</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Overall in-charge of JPOWA.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Conducts AGM and Special Meetings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Supervises records and correspondence.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Responsible for movable and immovable assets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Coordinates the activities of committee members and sub-committees.</span>
              </li>
            </ul>
          </div>

          {/* Secretary */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Secretary</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Calls meetings and issues notices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Operates bank accounts jointly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Maintains registers and records.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Supervises maintenance works.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Maintains meeting minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Oversees manpower and administration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Conducts preventive maintenance activities.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Coordinates with government and outside organizations.</span>
              </li>
            </ul>
          </div>

          {/* Treasurer */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Treasurer</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Maintains financial records.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Handles payments and receipts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Operates bank accounts jointly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Collects maintenance charges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Issues reminders to defaulters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Prepares balance sheets and annual accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Prepares budgets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Arranges audits.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Functions of Executive Committee - Task 6.9 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Functions of the Executive Committee
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {executiveFunctions.map((fn, idx) => (
              <div key={idx} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <fn.icon className="w-5 h-5 text-primary-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{fn.title}</h4>
                    <p className="text-sm text-gray-500">{fn.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use of Common Facilities */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Use of Common Facilities</h2>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Amenities are exclusively for members.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Usage charges may apply.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Proper use of facilities is expected.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Financial Transparency */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Financial Transparency</h2>
          <div className="card">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Responsible use of funds.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Timely collection of dues.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Regular audits.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Removal from Office - Task 6.10 */}
        <section>
          <div className="card bg-orange-50 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-orange-800" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900">Removal from Office</h3>
            </div>
            <p className="text-orange-800">
              A committee member who remains absent from three consecutive meetings without valid reason may forfeit Executive Committee membership. Such members are eligible for re-nomination and re-election.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
