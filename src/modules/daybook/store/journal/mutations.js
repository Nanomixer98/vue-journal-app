// export const myMutation = ( state ) => {

// }

export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = ( state, updatedEntry ) => {
    const entryIdx = state.entries.findIndex(entry => entry.id == updatedEntry.id)
    state.entries[entryIdx] = updatedEntry
}

export const addEntry = (/*  state  */) => {

}