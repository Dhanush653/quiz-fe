import axios from "axios";

const baseURL = "http://localhost:8080/api";

class DashboardService {
    createQuizRoom() {
        try {
            return axios.get(`${baseURL}/quiz-room/create`);
        } catch (error) {
            console.error("Error fetching admin dashboard:", error);
        }
    }
}

export default new DashboardService();