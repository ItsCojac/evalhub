import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { Button } from '../components/ui/Button';
import { User, Mail, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-6">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
                  {user?.email?.[0].toUpperCase()}
                </div>
              )}
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.user_metadata?.full_name || 'User'}
                </h2>
                <div className="mt-2 flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </div>
                <div className="mt-1 flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(user?.created_at || '').toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={user?.user_metadata?.full_name || ''}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={user?.email || ''}
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button variant="secondary">Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};