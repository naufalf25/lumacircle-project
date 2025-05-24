const ActionType = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
};

function showLoadingActionCreator() {
  return {
    type: ActionType.SHOW_LOADING,
  };
}

function hideLoadingActionCreator() {
  return {
    type: ActionType.HIDE_LOADING,
  };
}

function showLoading() {
  return showLoadingActionCreator();
}

function hideLoading() {
  return hideLoadingActionCreator();
}

export {
  ActionType,
  showLoadingActionCreator,
  hideLoadingActionCreator,
  showLoading,
  hideLoading,
};
