import { shallowMount } from "@vue/test-utils";
import Navbar from '@/modules/daybook/components/NavbarComponent';
import createVuexStore from "@/../tests/unit/mock-data/mock-store";

describe('Pruebas en el Navbar component', () => {

    const store = createVuexStore({
        user: {
            name: 'Alexis Nano',
            email: 'juan@juan.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: '123'
    })
    
    it('debe mostrar el componente correctamente', () => {
        
        const wrapper = shallowMount(Navbar, {
            global: {
                plugins: [store]
            }
        })

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('click en logout, debe cerrar sesión y redireccionar', () => {
        const wrapper = shallowMount(Navbar, {
            global: {
                plugins: [store]
            }
        })
        
        await wrapper.find('button').trigger('click')
    });

});