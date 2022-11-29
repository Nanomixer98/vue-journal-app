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