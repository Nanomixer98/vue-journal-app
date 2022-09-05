import journalApi from "@/api/journalApi"
// export const myAction = async ({ commit }) => {
// }

export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')
    const entries = []
    for (const id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    
    commit('setEntries', entries)
}

export const updateEntries = async (/* { commit } */) => {

}

export const createEntry = async (/* { commit } */) => {

}