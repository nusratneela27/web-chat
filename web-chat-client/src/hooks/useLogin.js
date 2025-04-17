import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "../utils/axios";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);

        try {
            const response = await axios.post("/login", {
                username,
                password,
            });

            const data = response.data;
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            return true;
        } catch (error) {
            const message =
                error.response?.data?.message || "Login failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

// ================= without axios =========

// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const useLogin = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext()

//     const login = async ({ username, password }) => {
//         const success = handleInputErrors({ username, password });
//         if (!success) {
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, 
//                 {
//                     method: "POST",
//                     credentials: "include",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ username, password }),
//                 });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || "Login failed");
//             }
//             localStorage.setItem("chat-user", JSON.stringify(data));
//             setAuthUser(data);
//             return true;
//         } catch (error) {
//             toast.error(error.message);
//             // return false;
//         }
//         finally {
//             setLoading(false);
//         }
//     }
//     return { login, loading };
// }

// export default useLogin;

// function handleInputErrors({ username, password }) {
//     if (!username || !password) {
//         toast.error("Please fill in all fields");
//         return false;
//     }

//     return true;
// }
