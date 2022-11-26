// import { ref } from "vue";
// import { useStore } from 'vuex';

const useAuth = () => {
    // const store = useStore()

    const createUser = async (user) => {
        console.log(user);
        // TODO: store.dispatch('auth/creatUser', user)
        // return resp
    }

    return {
        createUser
    };
}

export default useAuth