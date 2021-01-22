import { BUY_AUTO_TYPE, INCREMENT_TYPE } from './actions';

export const initialState = {
  counter: 0,
  lastCounter: 0,
  auto: false,
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case INCREMENT_TYPE: {
      const currentTime = new Date().getTime();

      if (currentTime - state.lastCounter < 500) {
        return state;
      }

      return {
        ...state,
        counter: state.counter + 1,
        lastCounter: currentTime,
      };
    }

    case BUY_AUTO_TYPE: {
      if (state.counter < 10) {
        return state;
      }

      return {
        ...state,
        counter: state.counter - 10,
        auto: true,
      };
    }

    default: {
      return state;
    }
  }
};
