import AboutView from '@/views/AboutView';
import { shallowMount } from '@vue/test-utils';

describe('Pruebas en el About View', () => {

    it('debe renderizar el componente correctamete', () => {
        let wrapper = shallowMount(AboutView);
        expect(wrapper.html()).toMatchSnapshot()
    })

})