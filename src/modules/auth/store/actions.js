import authApi from "@/api/authApi";

// export const myAction = async ({ commit }) => {


// }

export const createUser = async ({ commit }, user) => {

    const { /* name, */ email, password } = user

    try {
        const { data } = await authApi.post('accounts:signUp', {
            email, password, returnSecureToken: true
        })
        console.log(data);
        console.log(commit);

        return { ok: false }
    } catch (error) {
        // console.log(error.response);
        return { ok: false, message: error.response.data.error.message}
    }

}