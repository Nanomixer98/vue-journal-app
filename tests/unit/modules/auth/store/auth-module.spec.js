import axios from 'axios';
import createVuexStore from '../../../mock-data/mock-store';

describe('Vuex: Pruebas en el auth-module', () => {

    it('Initial State', () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('authenticating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

    })

    it('Mutation: loginUser', () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })
        const payload = {
            user: { name: 'Alexis', email: 'alexis@nava.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        store.commit('auth/loginUser', payload)

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toEqual(payload.user)
        expect(idToken).toBe(payload.idToken)
        expect(refreshToken).toBe(payload.refreshToken)
    });

    it('Mutation: logout', () => {
        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Alexis', email: 'alexis@nava.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        localStorage.setItem('idToken', store.idToken)
        localStorage.setItem('refreshToken', store.refreshToken)

        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBeNull()
        expect(idToken).toBeFalsy()
        expect(refreshToken).toBeFalsy()
        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()
    });

    it('Getter: username currentState', () => {
        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Alexis', email: 'alexis@nava.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        // console.log(store.getters['auth/currentState']);
        expect(store.getters['auth/currentState']).toBe('authenticated')
        expect(store.getters['auth/username']).toBe('Alexis')
    });

    it('Getter: username not exists', () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: { email: 'alexis@nava.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        // console.log(store.getters['auth/currentState']);
        expect(store.getters['auth/currentState']).toBe('not-authenticated')
        expect(store.getters['auth/username']).toBe('?')
    });

    it('Action: createUser - Usuar already exists', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test@test.com', password: '123456' }
        const resp = await store.dispatch('auth/createUser', newUser)
        // console.log(resp);
        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('not-authenticated')
        expect(user).toBeNull()
        expect(idToken).toBeFalsy()
        expect(refreshToken).toBeFalsy()
        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()
    });

    it('Action: createUser signInUser - Create new user', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test2@test.com', password: '123456' }
        // signInUser
        await store.dispatch('auth/signInUser', newUser)
        const { idToken } = store.state.auth

        // Borrar el usuario
        const deleteResp = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete',
            { idToken },
            {
                params: {
                    key: process.env.VUE_APP_AUTH_KEY,
                }
            }
        )

        // Crear el usuario
        const resp = await store.dispatch('auth/createUser', newUser)
        // console.log(resp);
        expect(resp).toEqual({ ok: true })

        const { status, user, idToken: storeIdToken, refreshToken } = store.state.auth
        expect(status).toBe('authenticated')
        expect(user).toMatchObject({ name: 'Test User', email: 'test2@test.com' })
        expect(typeof storeIdToken).toBe('string')
        expect(typeof refreshToken).toBe('string')
    });

    it('Action: checkAuthentication - POSITIVE', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        // SignIn
        await store.dispatch('auth/signInUser', { email: 'test@test.com', password: '123456' })
        const { idToken } = store.state.auth
        store.commit('auth/logout')

        localStorage.setItem('idToken', idToken)

        const checkResp = await store.dispatch('auth/checkAuthentication')
        expect(checkResp).toEqual({ ok: true });

        const { status, user, idToken: storeIdToken } = store.state.auth
        expect(status).toBe('authenticated')
        expect(user).toMatchObject({ name: 'User Test', email: 'test@test.com' })
        expect(typeof storeIdToken).toBe('string')
    });

    it('Action: checkAuthentication - NEGATIVE', async () => {
        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        localStorage.removeItem('idToken')
        const checkResp1 = await store.dispatch('auth/checkAuthentication')
        expect(checkResp1).toEqual({ ok: false, message: 'No hay token' });
        expect(store.state.auth.user).toBeFalsy()
        expect(store.state.auth.idToken).toBeFalsy()
        expect(store.state.auth.status).toBe('not-authenticated')

        localStorage.setItem('idToken', 'ABC-123')
        const checkResp2 = await store.dispatch('auth/checkAuthentication')
        expect(checkResp2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' })
        
    });

});