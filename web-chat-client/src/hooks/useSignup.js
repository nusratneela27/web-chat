import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import axios from "../utils/axios";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, gender }) => {
        const success = handleInputErrors({ fullName, username, password, gender });
        if (!success) return;

        setLoading(true);

        try {
            const response = await axios.post("/register", {
                fullName, username, password, gender
            })

            const data = response.data;
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "User register failed"
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
    return { signup, loading };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, gender }) {
    if (!fullName || !username || !password || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

// ================= without axios =============

// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// import { useState } from "react";

// const useSignup = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext()

//     const signup = async ({ fullName, username, password, gender }) => {
//         const success = handleInputErrors({ fullName, username, password, gender });
//         if (!success) {
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, 
//                 {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ fullName, username, password, gender }),
//             });
            
//             const data = await response.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             localStorage.setItem("chat-user", JSON.stringify(data));
//             setAuthUser(data);
//             return true;
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//     return { signup, loading };
// };

// export default useSignup;

// function handleInputErrors({ fullName, username, password, gender }) {
// 	if (!fullName || !username || !password || !gender) {
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}

// 	if (password.length < 6) {
// 		toast.error("Password must be at least 6 characters");
// 		return false;
// 	}

// 	return true;
// }
