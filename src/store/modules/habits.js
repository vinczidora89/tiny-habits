import HttpService from '../../services/HttpService';

export default {
  namespaced: true,
  state: {
    brainstormNotes: [
      {
        content: 'write a behaviour here', type: 'brown', left: null, top: null,
      },
      {
        content: 'write a behaviour here', type: 'yellow', left: null, top: null,
      },
      {
        content: 'write a behaviour here', type: 'orange', left: null, top: null,
      },
    ],
    goalDescription: null,
    goalList: null,
    goldenBehaviour: null,
    habitsEndpoint: 'http://localhost:3000/habits',
    habitsConfigEndpoint: 'http://localhost:3000/habits-config',
    hasError: false,
    isLoading: false,
    noteColourTypes: null,
    selectedGoal: null,
  },
  mutations: {
    addBrainstormNote(state, value) {
      state.brainstormNotes.push(value);
    },
    deleteBrainstormNote(state, value) {
      state.brainstormNotes.splice(value, 1);
    },
    editBrainstormNote(state, value) {
      state.brainstormNotes[value.id].content = value.text;
    },
    removePlaceholderBrainstormNotes(state, placeholder) {
      state.brainstormNotes = state.brainstormNotes.filter((note) => note.content !== placeholder);
    },
    setBrainstormNotes(state, value) {
      state.brainstormNotes = value;
    },
    setGoalDescription(state, value) {
      state.goalDescription = value;
    },
    setGoalList(state, value) {
      state.goalList = value;
    },
    setHasError(state, value) {
      state.hasError = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setNoteColourTypes(state, value) {
      state.noteColourTypes = value;
    },
    setGoldenBehaviour(state, value) {
      state.goldenBehaviour = state.brainstormNotes[value];
    },
    setSelectedGoal(state, value) {
      state.selectedGoal = value;
    },
    setBrainstormNotePosition(state, value) {
      state.brainstormNotes[value.id].left = value.left;
      state.brainstormNotes[value.id].top = value.top;
    },
  },
  actions: {
    chooseGolden({ state, commit }) {
      const noteCoordinatesSum = [];
      state.brainstormNotes.map((note, index) => noteCoordinatesSum
        .push({ id: index, coordinatesSum: (note.left - note.top) }));
      const sorted = noteCoordinatesSum.sort((a, b) => b.coordinatesSum - a.coordinatesSum);
      const highestPositionId = sorted[0].id;
      commit('setGoldenBehaviour', highestPositionId);
    },
    async initState({ state, commit }) {
      await HttpService(state.habitsConfigEndpoint)
        .then((response) => {
          commit('setGoalList', response.data[0].goalList);
          commit('setNoteColourTypes', response.data[0].noteColourTypes);
        })
        .catch(() => {
          commit('setHasError', true);
        });
    },
    async saveGoal({ state, commit }, data) {
      commit('setIsLoading', true);
      await HttpService(state.habitsEndpoint, {
        method: 'POST',
        data,
      })
        .then(() => {
          commit('navigation/setCurrentScreen', 'BrainstormScreen', { root: true });
          commit('setHasError', false);
        })
        .catch(() => {
          commit('setHasError', true);
        }).finally(() => {
          commit('setIsLoading', false);
        });
    },
  },
};
