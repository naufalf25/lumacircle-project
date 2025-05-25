const ActionType = {
  SHOW_LOADING: 'loading/show',
  HIDE_LOADING: 'loading/hide',
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
