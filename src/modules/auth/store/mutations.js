// export const myMutation = ( state ) => {

// }

export const loginUser = ( state, { user, idToken, refreshToken } ) => {

    if (idToken) {
        localStorage.setItem('idToken', idToken)
        state.idToken = idToken
    }

    if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
        state.refreshToken = refreshToken
    }

    state.user = user
    state.status = 'authenticated'
}