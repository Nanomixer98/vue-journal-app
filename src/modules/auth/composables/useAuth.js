// import { ref } from "vue";
import { computed } from 'vue';
import { useStore } from 'vuex';

const useAuth = () => {
    const store = useStore()

    const createUser = async (user) => {
        // console.log(user);
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const loginUser = async (user) => {
        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    return {
        checkAuthStatus,
        createUser,
        loginUser,

        authStatus: computed(() => store.getters['auth/currentState'])
    };
}

export default useAuth