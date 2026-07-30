import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Verified, Filter, User } from "lucide-react";
import { getTrainers } from "../api/trainerApi";
import { motion } from "framer-motion";

export default function FindTrainers() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const data = await getTrainers();
      setTrainers(data);
    } catch (error) {
      console.error("Failed to fetch trainers", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrainers = trainers.filter(t => 
    t.fullName.toLowerCase().includes(search.toLowerCase()) || 
    t.specializations?.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Find Your Perfect Trainer</h1>
          <p className="text-slate-400 mt-1">Discover elite fitness professionals tailored to your goals.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            className="w-full bg-slate-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Grid of Trainers */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-slate-800 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrainers.map((trainer, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={trainer.id}
              className="bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-green-500/10 transition-all border border-slate-700 group relative flex flex-col"
            >
              <div className="h-40 bg-slate-700 relative overflow-hidden">
                <img 
                  src={trainer.profilePhotoUrl || `https://i.pravatar.cc/300?u=${trainer.username}`} 
                  alt={trainer.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
                {trainer.isVerified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg shadow-green-500/30">
                    <Verified size={14} />
                    Verified
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {trainer.fullName}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold mt-1">
                    <Star size={16} fill="currentColor" />
                    <span>{trainer.rating?.toFixed(1) || "5.0"}</span>
                    <span className="text-slate-400 font-normal">({trainer.totalReviews || 0} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specializations?.slice(0,3).map((spec: string, i: number) => (
                    <span key={i} className="bg-slate-700/50 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-slate-600/50">
                      {spec}
                    </span>
                  ))}
                  {trainer.specializations?.length > 3 && (
                    <span className="bg-slate-700/50 text-slate-400 px-3 py-1 rounded-full text-xs font-medium border border-slate-600/50">
                      +{trainer.specializations.length - 3}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                  {trainer.aboutMe || "Professional fitness trainer dedicated to helping you achieve your goals."}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pricing</div>
                    <div className="text-lg font-bold text-white">${trainer.monthlyPrice}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                  </div>
                  <Link 
                    to={`/trainers/${trainer.userId}`}
                    className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-xl font-bold transition shadow-lg shadow-green-500/20"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {!loading && filteredTrainers.length === 0 && (
        <div className="text-center py-20 bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
          <User className="mx-auto text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">No trainers found</h3>
          <p className="text-slate-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
