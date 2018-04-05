import {
  isPendingStatus,
  isEmptyStatus,
  isFailedStatus,
  isSucceededStatus,
  isDelete,
  isCreate,
} from '../base';

const emptyArrayFor = item => (item === undefined ? [] : [item]);

const generateSelectors = (baseSelector, collectionType = {}) => {
  const selectData = state => baseSelector(state).data || collectionType;
  const selectStatus = state => baseSelector(state).status;
  const selectError = state => selectStatus(state).error || {};
  const selectOperation = state => selectStatus(state).operation;

  return {
    selectData,
    selectStatus,
    selectOperation,
    isDelete: state => isDelete(selectStatus(state)),
    isCreate: state => isCreate(selectStatus(state)),
    selectErrorDetail: state => selectError(state).errors
      || emptyArrayFor(selectError(state).error),
    hasSucceeded: state => isSucceededStatus(selectStatus(state)),
    hasFailed: state => isFailedStatus(selectStatus(state)),
    isPending: state => isPendingStatus(selectStatus(state)),
    isEmpty: state => isEmptyStatus(selectStatus(state)),
  };
};

const generatePaginatedSelectors = (baseSelector) => {
  const baseSelectors = generateSelectors(baseSelector, []);
  const selectPagination = state => baseSelector(state).pagination || {};
  return {
    ...baseSelectors,
    selectPagination,
    // if a request is pending one must not fetch more data
    hasMore: state => !baseSelectors.isPending(state)
      && (selectPagination(state).total !== baseSelectors.selectData(state).length),
  };
};

export default {
  generateSelectors,
  generatePaginatedSelectors,
};
