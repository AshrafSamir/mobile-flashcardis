import { RECEIVE_DECKS, ADD_DECK , ADD_QUESTION} from "../actions/decks";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.title]: {
          ...[action.question.title],
          questions: state[action.question.title].questions.concat(action.question.info) 
        }

      }
    default:
      return state;
  }
}

export default decks;
