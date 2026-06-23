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
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 animate-fadeIn text-center text-gray-400 text-sm">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-medium text-gray-900">My profile</h3>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="inline-flex items-center gap-1.5 bg-[#185FA5] text-white rounded-md px-4 py-1.5 text-xs font-sans hover:bg-[#0C447C] transition-all disabled:opacity-60"
        >
          <i className="ti ti-device-floppy" aria-hidden="true"></i> {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {profileMessage && (
        <div className={`mb-4 text-sm px-3 py-2 rounded-lg ${profileMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {profileMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#E6F1FB] flex items-center justify-center text-3xl font-medium text-[#185FA5]">
            {initials || 'AD'}
          </div>
          <div className="text-center">
            <div className="text-[15px] font-medium text-gray-900">{name}</div>
            <div className="text-xs text-gray-400">{role}</div>
          </div>
          <button className="border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-1">
            <i className="ti ti-upload" aria-hidden="true"></i> Change photo
          </button>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
              />
            </div>
          </div>

          <div className="h-[0.5px] bg-gray-200 my-5"></div>
          <p className="text-[13px] font-medium text-gray-900 mb-3">Change password</p>

          {passwordMessage && (
            <div className={`mb-3 text-sm px-3 py-2 rounded-lg ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {passwordMessage.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Current password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">New password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="border border-gray-200 rounded-md px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 disabled:opacity-60"
            >
              <i className="ti ti-key" aria-hidden="true"></i> {changingPassword ? 'Changing...' : 'Change password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}