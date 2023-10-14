const state = {
  users: [],
  currentPage: 0,
}

const loadNextPage = async () => {
  throw new Error('Not implemented');
}

const loadPreviousPage = async () => {
  throw new Error('Not implemented');
}

const onUserChanged = () => {
  throw new Error('Not implemented');
}

const reloadPage = async () => {
  throw new Error('Not implemented');
}

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPage,
}