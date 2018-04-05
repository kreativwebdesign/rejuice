import statusCode from '../base/status-code';
import {
  resetting,
  pending,
  rejected,
  fulfilled,
  status,
  succeed,
  fail,
  update,
} from '../base';

const emptyState = () => ({
  data: null,
  status: status(),
});

const defaultReducer = TYPE => (state = emptyState(), action) => {
  const {
    payload,
  } = action;
  switch (action.type) {
  case resetting(TYPE):
    return {
      ...state,
      data: null,
      status: status(),
    };
  case fulfilled(TYPE):
    return {
      ...state,
      data: payload.data,
      status: statusCode.isOk(payload.status) ? succeed(payload.operation) : fail(payload),
    };
  case pending(TYPE):
    return {
      ...state,
      status: update(),
      data: null,
    };
  case rejected(TYPE):
    return {
      ...state,
      status: fail(payload),
      data: null,
    };
  default:
    return state;
  }
};

export default {
  defaultReducer,
};
