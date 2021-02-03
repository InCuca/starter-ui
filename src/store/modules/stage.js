
const state = {
    handler: {
        name: '',
        version: '',
        stages: [],
    },
    report: null,
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
    },
    finish({ commit}) {
        commit('saveReport');
    }

}

const mutations = {
    pushStage(state, stage) {
        const stages = state.handler.stages.find(st => st.name !== stage.name);
        if (stages && stages.length > 0) {
            stages.push(stage);
            state.handler.stages = stages;
        }
    },
    saveHandler(state, handler) {
        state.handler = handler;
    },
    saveReport(state) {
        state.report = { ...state.handler };
        state.handler = {
            name: '',
            version: '',
            stages: [],
        };

        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(state.report, null, 2)], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = "starter.json";
        a.click();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
