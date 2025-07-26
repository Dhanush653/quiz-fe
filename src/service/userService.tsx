import axios from "axios";

const baseURL = "http://localhost:8080/api/user";

class UserService {
    register(registerPayload: any) {
        try {
            return axios.post(`${baseURL}/register`, registerPayload)
        } catch (error) {
            console.error("Error registering the user:", error);
        }
    }

    login(loginPayload: any) {
        try {
            return axios.post(`${baseURL}/login`, loginPayload)
        } catch (error) {
            console.error("Error logging in the user:", error);
        }
    }
}

export default new UserService();