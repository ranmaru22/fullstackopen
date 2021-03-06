import anecdoteService from "../services/anecdoteService";

// const anecdotesAtStart = [
//     "If it hurts, do it more often",
//     "Adding manpower to a late software project makes it later!",
//     "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//     "Premature optimization is the root of all evil.",
//     "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0
//     };
// };

// const initialState = anecdotesAtStart.map(asObject);

export const initialize = () => async dispatch => {
    const data = await anecdoteService.getAll();
    dispatch({
        type: "INIT",
        data
    });
};

export const upvote = anecdote => async dispatch => {
    const patch = { votes: anecdote.votes + 1 };
    const data = await anecdoteService.update(anecdote.id, patch);
    dispatch({
        type: "VOTE",
        data
    });
};

export const createAnecdote = content => async dispatch => {
    const data = await anecdoteService.create({ content, votes: 0 });
    dispatch({
        type: "CREATE",
        data
    });
};

const reducer = (state = [], action) => {
    console.log("state now: ", state);
    console.log("action", action);

    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE":
            return state.concat(action.data);
        case "VOTE":
            return state.map(n => (n.id === action.data.id ? action.data : n));
        default:
            return state;
    }
};

export default reducer;

