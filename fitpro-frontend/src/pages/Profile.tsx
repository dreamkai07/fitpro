import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUserProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-white text-center p-10">Loading profile...</div>;

  const roleColors: Record<string, string> = {
    ADMIN: "bg-red-500/20 text-red-400 border-red-500/50",
    TRAINER: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    TRAINEE: "bg-green-500/20 text-green-400 border-green-500/50",
  };
  const roleStyle = userProfile?.role ? roleColors[userProfile.role] : roleColors["TRAINEE"];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
      
      {userProfile ? (
        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700/50">
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-700">
            <div>
              <h2 className="text-3xl font-bold text-white">{userProfile.fullName}</h2>
              <p className="text-slate-400 mt-1">{userProfile.email} &middot; @{userProfile.username}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${roleStyle}`}>
              {userProfile.role}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center">
              <p className="text-slate-400 text-sm mb-2">Age</p>
              <p className="text-2xl font-bold text-white">{userProfile.age} yrs</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center">
              <p className="text-slate-400 text-sm mb-2">Weight</p>
              <p className="text-2xl font-bold text-white">{userProfile.weight} kg</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center">
              <p className="text-slate-400 text-sm mb-2">Height</p>
              <p className="text-2xl font-bold text-white">{userProfile.height} cm</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
              <p className="text-slate-400 text-sm mb-2">Activity Level</p>
              <p className="text-xl font-bold text-white leading-tight">
                {userProfile.activityLevel ? userProfile.activityLevel.replace('_', ' ') : 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-slate-700/30 p-6 rounded-2xl border border-slate-700">
             <h3 className="text-lg font-bold text-white mb-4">Account Details</h3>
             <div className="text-slate-400 space-y-2">
                <p><strong>Member Since:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
                <p><strong>Primary Fitness Goal:</strong> <span className="text-green-400 font-semibold">{userProfile.fitnessGoal ? userProfile.fitnessGoal.replace('_', ' ') : 'NOT SET'}</span></p>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-slate-400">Unable to load profile data.</div>
      )}
    </div>
  );
}
