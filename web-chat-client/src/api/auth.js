// save register user
export const registerUser = async user => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const data = await response.json()
    return data
}

// save login user
export const loginUser = async user => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const data = await response.json()
    return data
}

// logout user
export const logout = async user => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const data = await response.json()
    return data
}