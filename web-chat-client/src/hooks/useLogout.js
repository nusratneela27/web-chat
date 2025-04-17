import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "../utils/axios";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/logout")
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            return true;
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
}

export default useLogout;

// ================= without axios =============

// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";

// const useLogout = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();

//     const logout = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`,
//                 {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const data = await response.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             localStorage.removeItem("chat-user");
//             setAuthUser(null);
//             return true;
//         } catch (error) {
//             console.error("Logout failed", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { logout, loading };
// }

// export default useLogout;