import { renderTable, renderButtons, renderAddButton, renderModal } from './presentation';
import usersStore from './store/users-store';
import { saveUser } from './use-cases/save-user';

/**
 * 
 * @param {Element} element 
 */
export const UsersApp = async (element) => {
  element.innerHTML = 'Loading...';
  await usersStore.loadNextPage();
  element.innerHTML = '';

  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
  renderModal(element, async (userLike) => {
    const user = await saveUser(userLike);
    usersStore.onUserChanged();
    renderTable();
  });
}