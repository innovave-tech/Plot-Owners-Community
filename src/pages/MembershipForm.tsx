import { useState, useRef } from 'react';
import { Printer, CheckCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ASSOCIATION } from '../lib/constants';
import { PlotEntry } from '../lib/types';

const emptyPlot: PlotEntry = { plot_number: '', survey_number: '', sq_yards: '' };

interface FormData {
  applicant1: {
    first_name: string;
    last_name: string;
    father_spouse: string;
    address: string;
    city: string;
    state_pin: string;
    contact: string;
    email: string;
    aadhar: string;
  };
  applicant2: {
    first_name: string;
    last_name: string;
    father_spouse: string;
    contact: string;
    email: string;
    aadhar: string;
  };
  plots: PlotEntry[];
}

const initial: FormData = {
  applicant1: { first_name: '', last_name: '', father_spouse: '', address: '', city: '', state_pin: '', contact: '', email: '', aadhar: '' },
  applicant2: { first_name: '', last_name: '', father_spouse: '', contact: '', email: '', aadhar: '' },
  plots: [{ ...emptyPlot }],
};

export default function MembershipForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const totalSqYards = form.plots.reduce((sum, p) => sum + (parseFloat(p.sq_yards) || 0), 0);

  function setA1(field: keyof FormData['applicant1'], value: string) {
    setForm(prev => ({ ...prev, applicant1: { ...prev.applicant1, [field]: value } }));
  }
  function setA2(field: keyof FormData['applicant2'], value: string) {
    setForm(prev => ({ ...prev, applicant2: { ...prev.applicant2, [field]: value } }));
  }
  function setPlot(i: number, field: keyof PlotEntry, value: string) {
    setForm(prev => {
      const plots = [...prev.plots];
      plots[i] = { ...plots[i], [field]: value };
      return { ...prev, plots };
    });
  }
  function addPlot() {
    if (form.plots.length < 4) setForm(prev => ({ ...prev, plots: [...prev.plots, { ...emptyPlot }] }));
  }
  function removePlot(i: number) {
    if (form.plots.length > 1) setForm(prev => ({ ...prev, plots: prev.plots.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const { error } = await supabase.from('membership_applications').insert({
      applicant1_first_name: form.applicant1.first_name,
      applicant1_last_name: form.applicant1.last_name,
      applicant1_father_spouse: form.applicant1.father_spouse,
      applicant1_address: form.applicant1.address,
      applicant1_city: form.applicant1.city,
      applicant1_state_pin: form.applicant1.state_pin,
      applicant1_contact: form.applicant1.contact,
      applicant1_email: form.applicant1.email,
      applicant1_aadhar: form.applicant1.aadhar,
      applicant2_first_name: form.applicant2.first_name,
      applicant2_last_name: form.applicant2.last_name,
      applicant2_father_spouse: form.applicant2.father_spouse,
      applicant2_contact: form.applicant2.contact,
      applicant2_email: form.applicant2.email,
      applicant2_aadhar: form.applicant2.aadhar,
      plots: form.plots,
      total_sq_yards: totalSqYards,
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('success');
    }
  }

  function handlePrint() {
    window.print();
  }

  if (status === 'success') {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <CheckCircle className="w-20 h-20 text-accent-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-600 mb-2">Your membership application has been received successfully.</p>
          <p className="text-gray-500 text-sm mb-8">
            Please visit the association office with the required documents (Copy of Sale Deed, Passport Size Photo, Aadhar Card) along with the membership fee of <strong>Rs.1,000/-</strong>.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handlePrint} className="btn-primary">
              <Printer className="w-4 h-4" /> Print Form
            </button>
            <button onClick={() => setStatus('idle')} className="btn-outline">
              New Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-16 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Membership Application</h1>
          <p className="text-gray-600">Join the Jagannathapuram Plot Owners Welfare Association</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mb-6 no-print">
          <button onClick={handlePrint} className="btn-outline text-sm">
            <Printer className="w-4 h-4" /> Print Form
          </button>
        </div>

        {/* The Printable Form */}
        <div ref={printRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden print-page">
          {/* Form Header */}
          <div className="border-b-4 border-red-600 p-6 text-center bg-white">
            <h1 className="text-xl md:text-2xl font-bold text-red-600 uppercase tracking-wide mb-2">
              {ASSOCIATION.name}
            </h1>
            <p className="text-primary-900 font-medium text-sm">(Regd. No. {ASSOCIATION.regNumber})</p>
            <p className="text-primary-900 text-sm">{ASSOCIATION.address}</p>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Membership Form</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-0 bg-white dark:bg-gray-800">
            {/* Applicant Details Table */}
            <div className="border border-gray-300 dark:border-gray-600">
              {/* Headers */}
              <div className="grid grid-cols-[1fr_1fr_auto] border-b border-gray-300 dark:border-gray-600">
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-3 bg-gray-50 dark:bg-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">1st Applicant</span>
                </div>
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-3 bg-gray-50 dark:bg-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">2nd Applicant</span>
                </div>
                <div className="w-48 px-2 py-3 bg-gray-50 dark:bg-gray-700 text-center">
                  <span className="font-semibold text-gray-900 dark:text-white text-xs">Photo</span>
                </div>
              </div>

              {/* First Name */}
              <FormRow
                label="First Name"
                input1={<input className="form-input-cell" value={form.applicant1.first_name} onChange={e => setA1('first_name', e.target.value)} required />}
                input2={<input className="form-input-cell" value={form.applicant2.first_name} onChange={e => setA2('first_name', e.target.value)} />}
                photo={<PhotoBox label="Affix Passport size photo - Applicant 1" />}
                showPhoto
              />

              {/* Last Name */}
              <FormRow
                label="Last Name"
                input1={<input className="form-input-cell" value={form.applicant1.last_name} onChange={e => setA1('last_name', e.target.value)} required />}
                input2={<input className="form-input-cell" value={form.applicant2.last_name} onChange={e => setA2('last_name', e.target.value)} />}
              />

              {/* Father/Spouse */}
              <FormRow
                label="Father/Spouse"
                input1={<input className="form-input-cell" value={form.applicant1.father_spouse} onChange={e => setA1('father_spouse', e.target.value)} />}
                input2={<input className="form-input-cell" value={form.applicant2.father_spouse} onChange={e => setA2('father_spouse', e.target.value)} />}
              />

              {/* Address */}
              <FormRow
                label="Address"
                input1={<textarea className="form-input-cell resize-none h-16" value={form.applicant1.address} onChange={e => setA1('address', e.target.value)} />}
                input2={<div className="form-input-cell h-16" />}
                photo={<PhotoBox label="Affix Passport size photo - Applicant 2" />}
                showPhoto
              />

              {/* City */}
              <FormRow
                label="City"
                input1={<input className="form-input-cell" value={form.applicant1.city} onChange={e => setA1('city', e.target.value)} />}
                input2={<div className="form-input-cell" />}
              />

              {/* State-PIN */}
              <FormRow
                label="State-PIN"
                input1={<input className="form-input-cell" value={form.applicant1.state_pin} onChange={e => setA1('state_pin', e.target.value)} />}
                input2={<div className="form-input-cell" />}
              />

              {/* Contact No */}
              <FormRow
                label="Contact No"
                input1={<input className="form-input-cell" value={form.applicant1.contact} onChange={e => setA1('contact', e.target.value)} required />}
                input2={<input className="form-input-cell" value={form.applicant2.contact} onChange={e => setA2('contact', e.target.value)} />}
              />

              {/* Email */}
              <FormRow
                label="Email Address"
                input1={<input className="form-input-cell" type="email" value={form.applicant1.email} onChange={e => setA1('email', e.target.value)} required />}
                input2={<input className="form-input-cell" type="email" value={form.applicant2.email} onChange={e => setA2('email', e.target.value)} />}
              />

              {/* Aadhar */}
              <FormRow
                label="Aadhar No"
                input1={<input className="form-input-cell" value={form.applicant1.aadhar} onChange={e => setA1('aadhar', e.target.value)} />}
                input2={<input className="form-input-cell" value={form.applicant2.aadhar} onChange={e => setA2('aadhar', e.target.value)} />}
              />
            </div>

            {/* Plot Details */}
            <div className="border border-t-0 border-gray-300 dark:border-gray-600">
              <div className="grid grid-cols-4 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-900 dark:text-white">
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-2">Plot No</div>
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-2">Sy.No</div>
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-2">Sq. Yards</div>
                <div className="px-4 py-2 no-print">Action</div>
              </div>
              {form.plots.map((plot, i) => (
                <div key={i} className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="border-r border-gray-200 dark:border-gray-600 p-1">
                    <input className="form-input-cell text-sm" value={plot.plot_number} onChange={e => setPlot(i, 'plot_number', e.target.value)} placeholder="Plot number" />
                  </div>
                  <div className="border-r border-gray-200 dark:border-gray-600 p-1">
                    <input className="form-input-cell text-sm" value={plot.survey_number} onChange={e => setPlot(i, 'survey_number', e.target.value)} placeholder="Survey number" />
                  </div>
                  <div className="border-r border-gray-200 dark:border-gray-600 p-1">
                    <input className="form-input-cell text-sm" type="number" value={plot.sq_yards} onChange={e => setPlot(i, 'sq_yards', e.target.value)} placeholder="0" />
                  </div>
                  <div className="p-2 flex items-center no-print">
                    {i > 0 && (
                      <button type="button" onClick={() => removePlot(i)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {/* Total */}
              <div className="grid grid-cols-4 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <div className="col-span-2 border-r border-gray-300 dark:border-gray-600 px-4 py-2" />
                <div className="border-r border-gray-300 dark:border-gray-600 px-4 py-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">TOTAL Sq.Y: {totalSqYards || ''}</span>
                </div>
                <div className="px-4 py-2 no-print">
                  {form.plots.length < 4 && (
                    <button type="button" onClick={addPlot} className="flex items-center gap-1 text-xs text-accent-600 dark:text-accent-400 hover:underline">
                      <Plus className="w-3 h-3" /> Add Plot
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="border border-t-0 border-gray-300 dark:border-gray-600 p-4">
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-6">
                I agree to abide Association by and laws and will not interfere against the Association interest.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-xs text-gray-500">Signature:</p>
                    <p className="text-xs text-gray-500 mt-4">(NAME):</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-600 rounded p-3 bg-yellow-50 dark:bg-yellow-900/10">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Received: Rs.1000/-</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">In Words: Rupees One Thousand Only</p>
                  </div>
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-xs text-red-600 font-semibold">Rep Signature:</p>
                    <p className="text-xs text-gray-500 mt-4">(Authorised Signatory) & Date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rep Name & Enclosures */}
            <div className="border border-t-0 border-gray-300 dark:border-gray-600 p-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Enclosures</p>
                  <ol className="text-sm text-gray-700 dark:text-gray-200 space-y-1 list-decimal list-inside">
                    <li>Copy of Sale Deed</li>
                    <li>Passport Size Photo</li>
                    <li>Valid Identity proof (Adhaar card)</li>
                  </ol>
                </div>
                <div>
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-xs text-red-600 font-semibold">(Representative NAME):</p>
                    <p className="text-xs text-gray-500 mt-4">(Authorised Signatory) & Date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 no-print">
              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm mb-4">
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary text-base px-10 py-4 justify-center"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                <button type="button" onClick={handlePrint} className="btn-outline text-base px-10 py-4 justify-center">
                  <Printer className="w-5 h-5" /> Print Form
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                Please bring Rs.1,000/- membership fee, Sale Deed copy, Passport Photo, and Aadhar card to the association office.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, input1, input2, photo, showPhoto }: {
  label: string;
  input1: React.ReactNode;
  input2: React.ReactNode;
  photo?: React.ReactNode;
  showPhoto?: boolean;
}) {
  return (
    <div className={`grid ${showPhoto ? 'grid-cols-[1fr_1fr_auto]' : 'grid-cols-[1fr_1fr_auto]'} border-b border-gray-200 dark:border-gray-600`}>
      <div className="border-r border-gray-200 dark:border-gray-600">
        <div className="flex items-stretch">
          <div className="w-32 flex-shrink-0 px-3 py-2 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex items-center">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
          </div>
          <div className="flex-1 p-1">{input1}</div>
        </div>
      </div>
      <div className="border-r border-gray-200 dark:border-gray-600 p-1">{input2}</div>
      {showPhoto ? <div className="w-48">{photo}</div> : <div className="w-48" />}
    </div>
  );
}

function PhotoBox({ label }: { label: string }) {
  return (
    <div className="h-full min-h-[80px] border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-2">
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-tight">{label}</p>
    </div>
  );
}
