import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Car, Mail, Phone, Edit, QrCode } from 'lucide-react';

const ProfilePage = () => {
  const { userData } = useAuth();

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-primary-700 text-white p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User size={32} className="text-primary-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-primary-100">Account Details</p>
                </div>
              </div>
              <Link
                to="/edit-profile"
                className="bg-white text-primary-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* User Information */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Mail className="text-primary-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Phone className="text-primary-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Car Information */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Car className="text-primary-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">License Plate</p>
                    <p className="font-medium">
                      {userData.car.text_plate} {userData.car.number_plate}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md flex items-center">
                <QrCode className="text-primary-600 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-500">QR Code</p>
                  <div className="mt-2">
                    <img
                      src={userData.car.qr_code_path}
                      alt="Car QR Code"
                      className="w-24 h-24 border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;