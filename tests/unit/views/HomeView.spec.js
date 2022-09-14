import { shallowMount } from '@vue/test-utils';
import Home from '@/views/HomeView';

describe('Pruebas en el Home View', () => {

    it('debe renderizar el componente correctamete', () => {
        let wrapper = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('hacer click en un botón debe redireccionar a no-entry', () => {

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })

    })

})