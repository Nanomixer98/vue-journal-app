import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils";
import Swal from 'sweetalert2';

import journal from '@/modules/daybook/store/journal';
import EntryView from '@/modules/daybook/views/EntryView'
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

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {
    
    const mockRouter = {
        push: jest.fn()
    }

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-NBn1BMKEse6zUQBPzx1'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    it('debe de sacar al usuario porque el id no existe', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'This ID doesnt exisits'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" })
    });

    it('debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(mockRouter.push).not.toHaveBeenCalledWith()
    });

    it('debe de borrar la entrada y salir ', (done) => {
        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))
        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: "¿Está seguro",
            text: "Una vez borrado, no se puede recuperar",
            showDenyButton: true,
            confirmButtonText: "Si, estoy seguro",
          })

          setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "-NBn1BMKEse6zUQBPzx1")
              expect(mockRouter.push).toHaveBeenCalled()
              done()
          }, 1);
    });

});