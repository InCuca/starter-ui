
const state = {
    handler: {
        name: '',
        version: '',
        stages: [],
    },

}

const getters = {
    stages(state) {
        return state.handler.stages;
    },
    handler(state) {
        return state.handler;
    },
}

const actions = {
    saveStage({ commit }, stage) {
        commit('pushStage', stage);
    },
    saveHandler({ commit }, handler) {
        commit('saveHandler', handler);
    }
}

const mutations = {
    pushStage(state, stage) {
        const stages = state.handler.stages.find(st => st.name !== stage.name);
        console.log('stages :>> ', stages);
        if (stages && stages.length > 0) {
            stages.push(stage);
            state.handler.stages = stages;
        }
        console.log('state.handler.stages :>> ', state.handler.stages);
    },
    saveHandler(state, handler) {
        state.handler = handler;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
