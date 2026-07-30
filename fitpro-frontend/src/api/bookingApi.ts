import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

export const requestBooking = async (data: any) => {
  const response = await axios.post(`${API_URL}/request`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getTraineeBookings = async () => {
  const response = await axios.get(`${API_URL}/trainee`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getTrainerBookings = async () => {
  const response = await axios.get(`${API_URL}/trainer`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateBookingStatus = async (id: number, status: string) => {
  const response = await axios.put(`${API_URL}/${id}/status?status=${status}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
