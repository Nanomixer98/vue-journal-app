import { shallowMount } from "@vue/test-utils";
import EntryComponent from '@/modules/daybook/components/EntryComponent'
import { journalState } from "@/../tests/unit/mock-data/test-journal-state";

describe('Pruebas en Entry Component', () => {
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper = shallowMount(EntryComponent, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    });

    it('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('debe de redireccionar al hacer click en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({ 
            "name": "entry", 
            "params": { 
                "id": journalState.entries[0].id
            } 
        })
    })

    it('pruebas en las propiedades computadas', () => {
        expect(wrapper.vm.day).toBe(12);
        expect(wrapper.vm.month).toBe('Septiembre');
        expect(wrapper.vm.yearDay).toBe('2022, Lunes');
    })

})