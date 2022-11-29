// export const myMutation = ( state ) => {
// }

export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = (state, updatedEntry) => {
    const entryIdx = state.entries.findIndex(entry => entry.id == updatedEntry.id)
    state.entries[entryIdx] = updatedEntry
}

export const addEntry = ( state, newEntry ) => {
   state.entries = [newEntry, ...state.entries]
}

export const deleteEntry = ( state, deltedEntryId ) => {
    state.entries = state.entries.filter(( entry ) => entry.id !== deltedEntryId);
}