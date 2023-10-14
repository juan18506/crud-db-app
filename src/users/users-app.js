import usersStore from "./store/users-store";

/**
 * 
 * @param {Element} element 
 */
export const usersApp = async (element) => {
  element.innerHTML = 'Loading...';
  await usersStore.loadNextPage();
}