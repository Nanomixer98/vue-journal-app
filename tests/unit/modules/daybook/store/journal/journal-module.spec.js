import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal';
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

describe('Vuex - Pruebas en el Journal Module', () => {

    // Basics
    it('este es el estado incial, debe de tener este state', () => {

        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })

    // Mutations
    it('mutations: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        const journalStore = store.state.journal
        
        store.commit('journal/setEntries', journalState.entries)
        expect(journalStore.entries.length).toBe(2)
        expect(journalStore.isLoading).toBeFalsy()

        store.commit('journal/setEntries', journalState.entries)
        expect(journalStore.entries.length).toBe(4)
    })

    it('mutations: updateEntry', () => {
        const store = createVuexStore(journalState)
        const journalStore = store.state.journal
        const updatedEntry = {
            "id": "-NBmuQCErnYMJqbJeqze",
            "date": 1663006511609,
            "text": "IT'S ALIVE 3 FROM tests"
        }

        store.commit('journal/updateEntry', updatedEntry)

        expect(journalStore.entries.length).toBe(2)
        expect(
            journalStore.entries.find(e => e.id === updatedEntry.id)
        ).toEqual(updatedEntry)
    })

    it('mutations: addEntry & deleteEntry', () => {
        const store = createVuexStore(journalState)
        const journalStore = store.state.journal
        const newEntry = {
            "id": "ABC-123",
            "text": "Hola Mundo"
        }

        store.commit('journal/addEntry', newEntry)
        expect(journalStore.entries.length).toBe(3)
        expect(
            journalStore.entries.find( e => e.id === 'ABC-123')
        ).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')
        expect(journalStore.entries.length).toBe(2)
        expect(
            journalStore.entries.find( e => e.id === 'ABC-123')
        ).toBeFalsy()
    })

})