import { loadUsersByPage } from '../use-cases/load-users-by-page';

const state = {
  users: [],
  currentPage: 0,
}

const loadNextPage = async () => {
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0) return;

  state.currentPage++;
  state.users = users; 
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