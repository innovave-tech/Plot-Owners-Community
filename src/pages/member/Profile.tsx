import { useState } from 'react';
import { User, Phone, MapPin, CreditCard, Save, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function MemberProfile() {
  const { profile, user } = useAuth();
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state_pin: profile?.state_pin || '',
    aadhar_number: profile?.aadhar_number || '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('profiles').update({ ...form, updated_at: new Date().toISOString() }).eq('id', user!.id);
    if (error) { setStatus('error'); setErrorMsg(error.message); }
    else { setStatus('success'); setTimeout(() => setStatus('idle'), 3000); }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Update your personal information</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile?.full_name?.charAt(0) || 'M'}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-lg">{profile?.full_name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-medium rounded-full capitalize">
              {profile?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                <User className="w-4 h-4 inline mr-1" />Full Name
              </label>
              <input name="full_name" value={form.full_name} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                <Phone className="w-4 h-4 inline mr-1" />Phone Number
              </label>
              <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              <MapPin className="w-4 h-4 inline mr-1" />Address
            </label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2} className="input-field resize-none" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">State - PIN</label>
              <input name="state_pin" value={form.state_pin} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              <CreditCard className="w-4 h-4 inline mr-1" />Aadhar Number
            </label>
            <input name="aadhar_number" value={form.aadhar_number} onChange={handleChange} className="input-field" maxLength={12} />
          </div>

          {errorMsg && <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>}

          <button type="submit" disabled={status === 'loading'} className="btn-primary">
            {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> :
             status === 'success' ? <><CheckCircle className="w-4 h-4" /> Saved!</> :
             <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}
