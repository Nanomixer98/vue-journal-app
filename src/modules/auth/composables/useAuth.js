// import { ref } from "vue";
import { useStore } from 'vuex';

const useAuth = () => {
    const store = useStore()

    const createUser = async (user) => {
        // console.log(user);
        const resp = await store.dispatch('auth/createUser', user)
        return resp
        // return {
        //     ok: false, message: 'EMAIL_EXISTS'
        // }
    }

    return {
        createUser
    };
}

export default useAuth