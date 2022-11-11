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

    //* Basics ========================
    it('este es el estado incial, debe de tener este state', () => {

        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })

    //* Mutations ========================
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

    //* Getters ========================
    it('getters: getEntriesByTerm, getEntryById', () => {

        const store = createVuexStore(journalState)

        const [ entry1, entry2 ] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
        expect(store.getters['journal/getEntriesByTerm']('ALIVE').length).toBe(1);
        expect(store.getters['journal/getEntriesByTerm']('ALIVE')).toEqual([entry1]);

        expect(store.getters['journal/getEntryById']('-NBn1BMKEse6zUQBPzx1')).toEqual(entry2)
    })

    //* Actions ========================
    it('actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
    
        await store.dispatch('journal/loadEntries')
        expect( store.state.journal.entries.length ).toBe(4)
    })

    it('actions: updateEntry', async () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            "id": "-NBmuQCErnYMJqbJeqze",
            "date": 1663006511609,
            "text": "IT'S ALIVE 3 FROM tests",
            "otherField": true,
            "oneMore": { a: 1 }
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
        ).toEqual({
            "id": "-NBmuQCErnYMJqbJeqze",
            "date": 1663006511609,
            "text": "IT'S ALIVE 3 FROM tests"
        })
    })

    it('actions: createEntry, deleteEntry', async () => {
        const store = createVuexStore(journalState)
        const newEntry = {
            "text": "Nueva entrada desde las pruebas",
            "date": 1634532464567
        }

        const id = await store.dispatch('journal/createEntry', newEntry)
        expect(typeof id).toBe('string')
        expect(
            store.state.journal.entries.find( e => e.id === id )
        ).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect(
            store.state.journal.entries.find(e => e.id === id)
        ).toBeFalsy()
    })

})