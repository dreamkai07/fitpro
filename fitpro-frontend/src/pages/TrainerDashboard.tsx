import { useEffect, useState } from "react";
import { getTrainerBookings, updateBookingStatus } from "../api/bookingApi";
import { Check, X, Users, Calendar, Activity } from "lucide-react";

export default function TrainerDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getTrainerBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateBookingStatus(id, status);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const pendingRequests = bookings.filter(b => b.status === "PENDING");
  const activeClients = bookings.filter(b => b.status === "ACTIVE");

  if (loading) {
    return <div className="text-white text-center py-20">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Trainer Dashboard</h1>
        <p className="text-slate-400 mt-1">Manage your clients and booking requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{activeClients.length}</div>
            <div className="text-slate-400 text-sm">Active Clients</div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-orange-500/20 p-4 rounded-xl text-orange-400">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{pendingRequests.length}</div>
            <div className="text-slate-400 text-sm">Pending Requests</div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-xl text-green-400">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{bookings.length}</div>
            <div className="text-slate-400 text-sm">Total Interactions</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Requests */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Pending Requests</h2>
          {pendingRequests.length === 0 ? (
             <p className="text-slate-400">No pending requests.</p>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <div key={request.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-white">{request.traineeName}</div>
                      <div className="text-xs text-slate-400 mt-1">{new Date(request.bookingDate).toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleStatusUpdate(request.id, "ACCEPTED")} className="bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-black p-2 rounded-lg transition">
                        <Check size={18} />
                      </button>
                      <button onClick={() => handleStatusUpdate(request.id, "REJECTED")} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-lg transition">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  {request.notes && (
                    <div className="bg-slate-800 p-3 rounded-lg text-sm text-slate-300 mt-2">
                      "{request.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Clients */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Active Clients</h2>
          {activeClients.length === 0 ? (
             <p className="text-slate-400">No active clients yet.</p>
          ) : (
            <div className="space-y-4">
              {activeClients.map(client => (
                <div key={client.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {client.traineeName}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Client since {new Date(client.bookingDate).toLocaleDateString()}</div>
                  </div>
                  <button className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
