import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronRight, Shield, Zap, Building2, DollarSign, Lock, Droplets, TreePine, MessageCircle } from 'lucide-react';
import { ASSOCIATION } from '../lib/constants';

const detailedObjectives = [
  { icon: Shield, title: 'Property Protection', desc: 'Protect owners from illegal transactions and encroachments on plots and common areas.' },
  { icon: Zap, title: 'Infrastructure Development', desc: 'Develop and maintain roads, drainage, electricity and water facilities for all residents.' },
  { icon: Building2, title: 'Community Asset Management', desc: 'Protect and maintain common properties and association assets for generations.' },
  { icon: DollarSign, title: 'Financial Welfare', desc: 'Utilize association funds responsibly and transparently for community benefit.' },
  { icon: Lock, title: 'Security Services', desc: '24x7 security management ensuring safety and peace of mind for all plot owners.' },
  { icon: CheckCircle, title: 'Accounts Transparency', desc: 'Maintain, audit, and publish accounts regularly for member review.' },
  { icon: Droplets, title: 'Banking & Operations', desc: 'Handle maintenance and operational expenses through proper banking channels.' },
  { icon: TreePine, title: 'Community Development', desc: 'Support welfare activities, events, and improvements for community wellbeing.' },
  { icon: MessageCircle, title: 'Issue Resolution', desc: 'Address member concerns effectively and provide timely resolutions to all issues.' },
];

const sections = [
  {
    title: 'Section 1: Membership',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Plot owner must be above 18 years.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Membership is obtained after purchasing a plot.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Membership fee is ₹1000.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Membership fee is non-refundable.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Transfer of Membership</h4>
          <p className="text-gray-700 mb-2">When selling a plot:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Seller clears all dues.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Returns membership card.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Obtains NOC from the Association.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Buyer pays ₹1000 membership fee.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>New membership is issued.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Joint Ownership</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Only one person gets membership.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>One family/company is treated as one unit.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>One vote per member.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Membership Termination</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Membership automatically ends after sale or transfer of plot.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Voting Rights Suspension</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Voting rights are forfeited if dues remain unpaid for more than 180 days.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 2: Voting Rights',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Voting</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Every member has one vote.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Decisions are made by majority.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Tie Situation</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>President has the casting vote.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Proxy Voting</h4>
          <p className="text-gray-700 mb-2">Members unable to attend can authorize:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Family members.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Residents.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Non-voting members.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Plot licensees.</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Authorization must be submitted in writing.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Tenants</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Can attend General Body Meetings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Cannot vote.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Disqualification</h4>
          <p className="text-gray-700 mb-2">Members with unpaid dues for more than six months:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Cannot vote.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Cannot contest elections.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 3: AGM and Meetings',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Annual General Meeting (AGM)</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Conducted every year.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Held during April to June.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>21 days' notice is given.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">General Body Meeting</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Must be conducted at least once every 9 months.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Special Meeting</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Requires minimum 7 days' notice.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Can be requested by 5 or more members.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Extra-Ordinary General Body Meeting</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Called when 70% of members request it.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Quorum</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>51% members are required.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Adjourned Meeting</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>If quorum is absent, meeting may be postponed.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>At least 10 members form quorum in adjourned meeting.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Chairman</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>President presides.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Secretary presides in absence of President.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 4: Executive Committee',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Committee Structure</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>President</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Vice President</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Secretary</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Assistant Secretary</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Treasurer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Assistant Treasurer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Committee Members</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Term</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>One year.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Members may seek re-election.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Only resident owners or authorized family members are eligible.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Meetings</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Executive Committee meets at least once every month.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Removal</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>A member absent from three consecutive meetings without valid reason loses membership.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 5: Accounts and Funds',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Bank Account</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Opened in a nationalized bank.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Payments above ₹25,000 by cheque.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Secretary and another board member jointly sign cheques.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Petty Cash</h4>
          <p className="text-gray-700 mb-2">Maximum limit:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>₹25,000</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Annual Financial Statement</h4>
          <p className="text-gray-700 mb-2">Prepared before April 30 every year.</p>
          <p className="text-gray-700 mb-2">Includes:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Profit and Loss Account.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Receipts and Expenditure Statement.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Assets and Liabilities.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Corpus Fund</h4>
          <p className="text-gray-700 mb-2">Contribution:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>₹10,000 per plot.</span>
            </li>
          </ul>
          <p className="text-gray-700 mb-2">Purpose:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Improvements.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Replacements.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Emergency capital works.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Sinking Fund</h4>
          <p className="text-gray-700 mb-2">Purpose:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Major repairs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>One-time maintenance activities.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 6: Rules and Regulations',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Members Must</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Pay maintenance charges.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Cooperate with the Executive Committee.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Obtain NOC before selling property.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Inform association about new owners.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Use facilities responsibly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✔</span>
              <span>Follow rules and regulations.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Members Shall Not</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-xl">❌</span>
              <span>Display advertisements without approval.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">❌</span>
              <span>Collect funds without EC approval.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">❌</span>
              <span>Misuse common amenities.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">❌</span>
              <span>Engage in illegal activities.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 7: Rights and Obligations',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Owner Responsibilities</h4>
          <p className="text-gray-700 mb-2">Owners are responsible for:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Maintenance of their plots.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Preventing damage to others.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Liability</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Any damage caused due to negligence is owner's responsibility.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Right of Entry</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Board members may enter a property during emergencies.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: 'Section 8: Legal Matters',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Association Seal</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>The official seal remains with the Secretary.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Notice Board</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Important notices and reports are displayed on notice boards.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Inspection Rights</h4>
          <p className="text-gray-700 mb-2">Members may inspect:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Registers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Minutes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Documents.</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Copies may be obtained upon payment of fees.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Legal Status</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>The Association can sue and be sued.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Jurisdiction</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>All disputes fall under Hyderabad courts.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Dissolution</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>Remaining assets after dissolution will be transferred according to members' resolutions.</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Governing Act</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <span>The Association functions under the Telangana Societies Registration Act, 1960.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
];

export default function About() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Est. {ASSOCIATION.established}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            A decade of dedicated service to the plot owners of Jagannathapuram Layout
          </p>
        </div>
      </div>

      {/* Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Vision</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Smooth and sustainable administration of Jagannathapuram.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images/layouts/main bg.jpeg"
                alt="Community"
                className="w-full rounded-3xl shadow-2xl object-cover aspect-video"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">120+</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">320+</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plots</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Serving the Jagannathapuram Community Since 2015
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                We are a registered Plot Owners Welfare Association dedicated to protecting the interests of
                all plot owners and ensuring continuous development of the layout. Our association was founded
                with a vision to create a harmonious, well-governed community where every plot owner's rights
                are protected.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                With over a decade of service, we have successfully managed the layout's infrastructure,
                resolved numerous member disputes, and created a strong sense of community among our
                {' '}{ASSOCIATION.totalMembers}+ members owning {ASSOCIATION.totalPlots}+ plots.
              </p>
              <div className="space-y-3">
                {['Registered under the Societies Registration Act', 'Transparent governance and accounting', 'Regular general body meetings', 'Active welfare programs'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Details */}
      <section className="py-12 bg-primary-50 dark:bg-primary-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card border-l-4 border-primary-900">
            <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                <p className="text-xl font-bold text-primary-900 dark:text-primary-300">{ASSOCIATION.regNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Established</p>
                <p className="text-xl font-bold text-primary-900 dark:text-primary-300">Year {ASSOCIATION.established}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Office Address</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug whitespace-pre-line">{ASSOCIATION.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Objectives</h2>
          </div>
          
          {/* Current Objectives */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Maintain harmony among plot owners.',
                'Ensure proper management.',
                'Protect rights of owners and tenants.',
                'Manage common facilities.',
                'Provide administrative support.',
              ].map((objective, idx) => (
                <div key={idx} className="card flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0" />
                  <p className="text-gray-700">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Objectives with Icons */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-10 text-center">Detailed Objectives</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailedObjectives.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card hover:shadow-md transition-shadow group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-900 transition-colors">
                      <Icon className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Member Responsibilities & Rules */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Member Responsibilities & Rules</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Responsibilities */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Responsibilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Pay maintenance charges promptly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Cooperate with the Executive Committee.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Obtain NOC before selling a property.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Inform the association about ownership changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Ensure family members and representatives follow Association rules.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✔</span>
                  <span className="text-gray-700">Maintain their own properties.</span>
                </li>
              </ul>
            </div>

            {/* Restrictions */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Restrictions</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-xl">❌</span>
                  <span className="text-gray-700">No advertisements without approval.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">❌</span>
                  <span className="text-gray-700">No unauthorized fund collection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">❌</span>
                  <span className="text-gray-700">No misuse of common facilities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">❌</span>
                  <span className="text-gray-700">No illegal activities.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Right of Entry */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Right of Entry</h3>
              <p className="text-gray-700">
                In emergencies, authorized Board Members may enter a property to prevent damage or address safety concerns.
              </p>
            </div>

            {/* Inspection of Records */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection of Records</h3>
              <p className="text-gray-700">
                Members have the right to inspect Association records and documents.
              </p>
            </div>

            {/* Jurisdiction */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Jurisdiction</h3>
              <p className="text-gray-700">
                All disputes are subject to Hyderabad courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bylaws Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Association Bylaws</h2>
            <p className="text-gray-600 text-lg">Complete rules and regulations governing the association</p>
          </div>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.title} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  {expanded === section.title ? (
                    <ChevronDown className="w-6 h-6 text-accent-600" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-accent-600" />
                  )}
                </button>
                {expanded === section.title && (
                  <div className="px-6 pb-6 bg-gray-50 border-t border-gray-200">
                    <div className="pt-6">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
