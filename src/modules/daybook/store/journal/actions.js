import journalApi from "@/api/journalApi"
// export const myAction = async ({ commit }) => {
// }

export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')
    if( !data ) {
        commit('setEntries', [])
        return
    }
    const entries = []
    for (const id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    
    commit('setEntries', entries)
}

// export const updateEntry = async ({ commit }, { id, ...dataToSave}) => {
//     const { data } = await journalApi.put(`/entries/${id}.json`, dataToSave)
//     commit('updateEntry', {id, ...data})
// }

export const updateEntry = async ({ commit }, entry) => {
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }
        
    // await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
    
    commit('updateEntry', { ...dataToSave, id: entry.id })
}

export const createEntry = async ({ commit }, newEntry) => {
    const { data } = await journalApi.post(`/entries.json`, newEntry)
    const id = data.name
    commit('addEntry', {id, ...newEntry})
    return id
}

export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)
}