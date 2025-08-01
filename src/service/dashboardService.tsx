import axios from "axios";

const baseURL = "http://localhost:8080/api";
const token = JSON.parse(localStorage.getItem('userInfo') || '{}').token;

class DashboardService {
    createQuizRoom(payload: any) {
        try {
            return axios.post(`${baseURL}/quiz-room/create`, payload, {headers: {Authorization: `Bearer ${token}`}});
        } catch (error) {
            console.error("Error fetching admin dashboard:", error);
        }
    }
}

export default new DashboardService();