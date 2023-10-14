import { renderTable, renderButtons, renderAddButton } from './presentation';
import usersStore from './store/users-store';

/**
 * 
 * @param {Element} element 
 */
export const usersApp = async (element) => {
  element.innerHTML = 'Loading...';
  await usersStore.loadNextPage();
  element.innerHTML = '';

  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
}