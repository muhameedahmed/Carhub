import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
  const { userData, changePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await changePassword(userData.phone, newPassword);
      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');

    } catch (err) {
      console.error('Password change error:', err);
      setError('Failed to update password. Please try again.');
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/profile')}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Profile
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Edit */}
          <div className="bg-primary-700 text-white p-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-primary-100">Update your password</p>
          </div>

          {/* Form Change Password  */}
          <div className="p-6 ">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            
            {success && (
              <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <Check size={20} className="mr-2" />
                Password updated successfully!
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col align-content-center justify-content-center ">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div className='w-1/2 lg:w-1/4 self-center'>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          {/* User Information */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <p className="text-gray-600 mb-4">
              The following information cannot be changed.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border border-gray-200 rounded-md bg-white">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-md bg-white">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-md bg-white">
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
