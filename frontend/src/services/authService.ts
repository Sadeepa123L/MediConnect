import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

export const Login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`,{
        email,
        password,
    });
    return response.data;
}

export const Register = async (
    name: string,
    email: string,
    password: string
) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/register`,{
        name,
        email,
        password
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}