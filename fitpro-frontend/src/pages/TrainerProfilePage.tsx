import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Verified, Trophy, Clock, Users, ArrowLeft } from "lucide-react";
import { getTrainerProfile } from "../api/trainerApi";
import { requestBooking } from "../api/bookingApi";

export default function TrainerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      fetchTrainer(Number(id));
    }
  }, [id]);

  const fetchTrainer = async (trainerId: number) => {
    try {
      const data = await getTrainerProfile(trainerId);
      setTrainer(data);
    } catch (error) {
      console.error("Failed to fetch trainer", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTrainer = async () => {
    if (!trainer) return;
    setBookingLoading(true);
    try {
      await requestBooking({ trainerId: trainer.userId, notes });
      setBookingSuccess(true);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to book trainer");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Loading profile...</div>;
  }

  if (!trainer) {
    return <div className="text-white text-center py-20">Trainer not found.</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <button 
        onClick={() => navigate("/trainers")}
        className="text-slate-400 hover:text-white flex items-center gap-2 transition"
      >
        <ArrowLeft size={20} /> Back to Marketplace
      </button>

      {/* Hero Section */}
      <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative">
        <div className="h-48 md:h-64 bg-slate-700 relative">
          <img 
             src={trainer.profilePhotoUrl || `https://i.pravatar.cc/800?u=${trainer.username}`} 
             alt="Cover" 
             className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
        
        <div className="px-8 pb-8 relative -mt-20 sm:-mt-24 flex flex-col md:flex-row gap-6 md:items-end">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-xl bg-slate-800 shrink-0 relative z-10">
            <img 
              src={trainer.profilePhotoUrl || `https://i.pravatar.cc/300?u=${trainer.username}`} 
              alt={trainer.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{trainer.fullName}</h1>
              {trainer.isVerified && (
                <div className="bg-green-500 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <Verified size={14} /> Verified
                </div>
              )}
            </div>
            <p className="text-slate-400 text-lg mt-1">@{trainer.username}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium">
              <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
                <Star size={16} fill="currentColor" />
                <span>{trainer.rating?.toFixed(1) || "5.0"} Rating</span>
                <span className="text-yellow-400/60 font-normal">({trainer.totalReviews || 0} Reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                <Trophy size={16} className="text-blue-400" />
                {trainer.experienceYears} Years Exp.
              </div>
              <div className="flex items-center gap-2 text-slate-300 bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                <Users size={16} className="text-purple-400" />
                {trainer.activeClients} Active Clients
              </div>
            </div>
          </div>
          
          <div className="md:text-right shrink-0">
            <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Monthly Plan</div>
            <div className="text-3xl font-bold text-white mb-4">${trainer.monthlyPrice}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {trainer.aboutMe || "No about information provided."}
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Specializations</h2>
            <div className="flex flex-wrap gap-3">
              {trainer.specializations?.map((spec: string, i: number) => (
                <span key={i} className="bg-slate-700 text-green-400 px-4 py-2 rounded-xl font-medium border border-slate-600">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Certifications</h2>
            <ul className="space-y-3">
              {trainer.certifications?.map((cert: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-700/30 p-4 rounded-xl border border-slate-700/50">
                  <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                    <Trophy size={20} />
                  </div>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl sticky top-8">
            <h3 className="text-xl font-bold text-white mb-4">Book Training Session</h3>
            
            {bookingSuccess ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                <div className="text-green-400 font-bold mb-2">Request Sent Successfully!</div>
                <p className="text-sm text-green-300">The trainer will review your request shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Message to Trainer</label>
                  <textarea 
                    className="w-full bg-slate-700 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500 border border-transparent transition h-24 resize-none"
                    placeholder="Briefly describe your fitness goals..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  onClick={handleBookTrainer}
                  disabled={bookingLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-xl font-bold transition shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                >
                  {bookingLoading ? "Requesting..." : "Send Booking Request"}
                </button>
                <p className="text-xs text-slate-500 text-center">You won't be charged until the trainer accepts.</p>
              </div>
            )}
          </div>
          
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Clock size={20} className="text-slate-400"/> Availability</h3>
             <p className="text-slate-300 whitespace-pre-line text-sm">
                {trainer.availabilitySchedule || "Mon - Fri: 6:00 AM - 8:00 PM\nSat: 8:00 AM - 2:00 PM\nSun: Closed"}
             </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
