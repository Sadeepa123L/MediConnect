import { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile, changeMyPassword } from '../services/userService';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const user = await getMyProfile();
      setName(user.name);
      setEmail(user.email);
      setRole(user.roles[0] || 'USER');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setProfileMessage(null);
    try {
      setSaving(true);
      await updateMyProfile({ name, email });
      setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to update profile.';
      setProfileMessage({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage(null);

    if (!currentPassword || !newPassword) {
      setPasswordMessage({ type: 'error', text: 'Please fill in both password fields.' });
      return;
    }

    try {
      setChangingPassword(true);
      await changeMyPassword({ currentPassword, newPassword });
      setPasswordMessage({ type: 'success', text: 'Password changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to change password.';
      setPasswordMessage({ type: 'error', text: msg });
    } finally {
      setChangingPassword(false);
    }
  };

  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (loading) {
    return (
      <div className="bg-white border border-[#E8DFD0]/40 rounded-[28px] p-8 mb-6 animate-fadeIn text-center text-[#A39A8C] text-sm shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E8DFD0]/40 rounded-[28px] p-6 md:p-8 mb-6 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            My profile
          </h2>
          <p className="text-sm text-[#5C5249] mt-1">Manage your account information and password.</p>
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="inline-flex items-center justify-center gap-1.5 bg-[#2A6B63] text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-[#235953] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 w-full sm:w-auto"
        >
          <i className="ti ti-device-floppy text-base" aria-hidden="true"></i> {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {profileMessage && (
        <div className={`mb-6 text-sm px-4 py-3 rounded-xl border font-medium shadow-xs ${profileMessage.type === 'success' ? 'bg-[#EAF3DE] text-[#3B6D11] border-[#EAF3DE]/35' : 'bg-[#FCEBEB] text-[#A32D2D] border-[#FCEBEB]/35'}`}>
          {profileMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 shrink-0 rounded-full bg-[#A8C4B0]/20 flex items-center justify-center text-3xl font-semibold text-[#2A6B63] border-2 border-[#2A6B63]/15 shadow-inner">
            {initials || 'AD'}
          </div>
          <div className="mt-3">
            <div className="text-sm sm:text-[15px] font-semibold text-[#332B25]">{name}</div>
            <div className="text-xs text-[#5C5249] bg-[#FBF6EF] px-2.5 py-0.5 rounded-full inline-block mt-1 font-medium border border-[#E8DFD0]/40">{role}</div>
            <button className="mt-3.5 border border-[#E8DFD0] hover:bg-[#FBF6EF] rounded-xl px-4 py-2 text-xs font-semibold text-[#5C5249] transition-all cursor-pointer flex items-center gap-1.5 justify-center w-full">
              <i className="ti ti-upload text-sm" aria-hidden="true"></i> Change photo
            </button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              />
            </div>
          </div>

          <div className="h-px bg-[#F4EDE1] my-8"></div>
          <h4 className="text-base font-semibold text-[#332B25] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Change password
          </h4>

          {passwordMessage && (
            <div className={`mb-4 text-sm px-4 py-3 rounded-xl border font-medium shadow-xs ${passwordMessage.type === 'success' ? 'bg-[#EAF3DE] text-[#3B6D11] border-[#EAF3DE]/35' : 'bg-[#FCEBEB] text-[#A32D2D] border-[#FCEBEB]/35'}`}>
              {passwordMessage.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Current password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">New password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="inline-flex items-center justify-center gap-1.5 bg-[#EF8354] hover:bg-[#DD6E3D] hover:shadow-md hover:-translate-y-0.5 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-60 w-full sm:w-auto"
            >
              <i className="ti ti-key text-base" aria-hidden="true"></i> {changingPassword ? 'Changing...' : 'Change password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}