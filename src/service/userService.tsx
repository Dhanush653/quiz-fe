import axios from "axios";
import { loginPageProps, registrationProps } from "../components/Types/types";

const baseURL = "http://localhost:8080/api/user";

class UserService {
    register(registerPayload: registrationProps) {
        try {
            return axios.post(`${baseURL}/register`, registerPayload)
        } catch (error) {
            console.error("Error registering the user:", error);
        }
    }

    login(loginPayload: loginPageProps) {
        try {
            return axios.post(`${baseURL}/login`, loginPayload)
        } catch (error) {
            console.error("Error logging in the user:", error);
        }
    }

    getAdminDashboard() {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo') || '{}')?.token;
            return axios.get(`${baseURL}/get-rooms/admin`, {headers: {Authorization: `Bearer ${token}`}});
        } catch (error) {
            console.error("Error fetching admin dashboard:", error);
        }
    }
}

export default new UserService();