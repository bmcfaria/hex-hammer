import { INCREMENT_TYPE } from './actions';

export const initialState = {
  counter: 0,
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case INCREMENT_TYPE: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    default: {
      return state;
    }
  }
};
