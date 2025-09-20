// src/components/Profile.jsx
import { useContext } from "react";
import { AuthContext } from "../Components/context/AuthContext";


export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">WebsiteName</h1>
            <h2 className="text-2xl text-gray-600">User Profile</h2>
          </div>
          
          {/* User Info Card */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              {/* User Avatar and Basic Info */}
              <div className="flex flex-col items-center mb-6">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img 
                      src={user.photoURL || "https://via.placeholder.com/150"} 
                      alt="User Avatar" 
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center">
                  {user.displayName || "User"}
                </h3>
                <p className="text-gray-500 text-center">
                  {user.email}
                </p>
              </div>

              <div className="divider"></div>
              
              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">User ID</h4>
                  <p className="text-sm font-mono bg-base-300 p-2 rounded mt-1">
                    {user.uid}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Email Verified</span>
                  <span className={`badge ${user.emailVerified ? 'badge-success' : 'badge-warning'}`}>
                    {user.emailVerified ? "Yes" : "No"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Account Created</span>
                  <span>{new Date(user.metadata.creationTime).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Last Sign In</span>
                  <span>{new Date(user.metadata.lastSignInTime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}