import { shallowMount } from "@vue/test-utils";
import LoginView from '@/modules/auth/views/LoginView';
import createVuexStore from "@/../tests/unit/mock-data/mock-store";
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn(),
}))

describe('Pruebas en el Login Component', () => {

    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    it('Debe de hacer match con el snapshot', () => {
        
        const wrapper = shallowMount(LoginView, {
            global: {
                plugins: [store]
            }
        })
        expect(wrapper.html()).toMatchSnapshot();

    });

    it('credenciales incorrectas, disparar el SWAL', async () => {
        
        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

        const wrapper = shallowMount(LoginView, {
            global: {
                plugins: [store]
            }
        })
        
        await wrapper.find('form').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", { email: "", password: "" })
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Error en credenciales", "error")
    });

    it('credenciales correctas', async () => {
        
        store.dispatch.mockReturnValueOnce({ ok: true })

        const wrapper = shallowMount(LoginView, {
            global: {
                plugins: [store]
            }
        })

        const [txtEmail, txtPassword] = wrapper.findAll('input')
        await txtEmail.setValue('alexis@nava.com')
        await txtPassword.setValue('123456')

        await wrapper.find('form').trigger('submit')

        expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", { email: "alexis@nava.com", password: "123456" })
        expect(wrapper.router.push).toHaveBeenCalledWith({ name: "no-entry" })
        expect(wrapper.vm.loginForm).toEqual({ email: "alexis@nava.com", password: "123456" });
    });

});