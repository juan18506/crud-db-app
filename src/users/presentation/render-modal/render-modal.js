import modalHtml from './render-modal.html?raw';

import './render-modal.css';

let modal;

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = (element) => {
  if (modal) return;

  modal = document.createElement('div');
  modal.innerHTML = modalHtml;
  modal.classList.add('modal-container', 'hide-modal');

  element.append(modal);
}