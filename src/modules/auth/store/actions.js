import authApi from "@/api/authApi";

// export const myAction = async ({ commit }) => {


// }

export const createUser = async ({ commit }, user) => {

    const { name, email, password } = user

    try {
        const { data } = await authApi.post('accounts:signUp', {
            email, password, returnSecureToken: true
        })
        const { idToken, refreshToken } = data
        // console.log(data);

        await authApi.post('accounts:update', { displayName: name, idToken })
        
        delete user.password
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {
        // console.log(error.response);
        return { ok: false, message: error.response.data.error.message }
    }

}


export const signInUser = async ({ commit }, user) => {

    const { email, password } = user

    try {
        const { data } = await authApi.post('accounts:signInWithPassword', {
            email, password, returnSecureToken: true
        })
        // console.log(data);
        const { displayName, idToken, refreshToken } = data

        user.name = displayName

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {
        // console.log(error.response);
        return { ok: false, message: error.response.data.error.message }
    }

}

export const checkAuthentication = async ({ commit },) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!idToken) {
        commit('logout')
        return { ok: false, message: 'No hay token' }
    }

    try {
        
        const { data } = await authApi.post('accounts:lookup', { idToken })
        console.log(data);
        const { displayName, email } = data.users
        const user = {
            name: displayName,
            email
        }

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

    } catch (error) {
        commit('logout')
        return { ok: false, message: error.response.data.error.message }
    }
    
}