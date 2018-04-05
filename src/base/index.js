import statusCode from './status-code';

const EXTEND = 'EXTEND';
const FULL_MERGE = 'FULL_MERGE';

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const EMPTY = 'EMPTY';
const FAILED = 'FAILED';
const SUCCEEDED = 'SUCCEEDED';

export const OPERATION = {
  GET: 'GET',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

export const status = () => ({
  status: EMPTY,
});

export const reset = status;

export const fail = payload => ({
  status: FAILED,
  error: payload,
});

export const update = () => ({
  status: PENDING,
});

export const succeed = operation => ({
  status: SUCCEEDED,
  operation,
});

const evaluateStatus = status => statusObject => statusObject.status === status;
export const isPendingStatus = evaluateStatus(PENDING);
export const isEmptyStatus = evaluateStatus(EMPTY);
export const isFailedStatus = evaluateStatus(FAILED);
export const isSucceededStatus = evaluateStatus(SUCCEEDED);

const evaluateMethod = method => statusObject => statusObject.operation === method;
export const isGet = evaluateMethod(OPERATION.GET);
export const isCreate = evaluateMethod(OPERATION.CREATE);
export const isDelete = evaluateMethod(OPERATION.DELETE);
export const isUpdate = evaluateMethod(OPERATION.UPDATE);

const evaluateAction = suffix => actionType => `${actionType}_${suffix}`;
export const resetting = evaluateAction(EMPTY);
export const pending = evaluateAction(PENDING);
export const rejected = evaluateAction(REJECTED);
export const fulfilled = evaluateAction(FULFILLED);

export const extend = evaluateAction(EXTEND);
export const fullMerge = evaluateAction(FULL_MERGE);

export const pendingExtend = actionType => pending(extend(actionType));
export const rejectedExtend = actionType => rejected(extend(actionType));
export const fulfilledExtend = actionType => fulfilled(extend(actionType));

export const fulfilledFullMerge = actionType => fulfilled(fullMerge(actionType));
export const pendingFullMerge = actionType => pending(fullMerge(actionType));
export const rejectedFullMerge = actionType => rejected(fullMerge(actionType));

export const chainOnSuccess = (callback, dispatch) => (data) => {
  if (statusCode.isOk(data.status || data.value.status)) {
    callback(dispatch)(data);
  }
  return data;
};

export const callOnSuccess = callback => (data) => {
  if (statusCode.isOk(data.status || data.value.status)) {
    callback(data);
  }
  return data;
};

export const call = callback => (data) => {
  callback(data);
  return data;
};

export const transformOnSuccess = callback => (data) => {
  if (statusCode.isOk(data.status || data.value.status)) {
    return callback(data);
  }
  return data;
};

export const transformOnFailure = callback => (data) => {
  if (!statusCode.isOk(data.status || data.value.status)) {
    return callback(data);
  }
  return data;
};
