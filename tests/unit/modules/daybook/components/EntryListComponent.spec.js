import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils";
import journal from '@/modules/daybook/store/journal';
import EntryListComponent from '@/modules/daybook/components/EntryListComponent'
import { journalState } from "@/../tests/unit/mock-data/test-journal-state";

const createVuexStore = ( initalState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initalState }
            }
        }
    })

describe('Pruebas en el EntryList', () => {

    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         // getEntriesByTerm: jest.fn()
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }

    // const store = createStore({
    //     modules: {
    //         journal: {...journalMockModule}
    //     }
    // })

    const mockRouter = {
        push: jest.fn()
    }

    const store = createVuexStore(journalState)

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryListComponent, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    it('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')
        await input.setValue('ALIVE')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })

    it('el boton de nuevo debe de redireccionar a /new',  () => {
        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
    })


})