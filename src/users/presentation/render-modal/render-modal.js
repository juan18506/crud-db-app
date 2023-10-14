import modalHtml from './render-modal.html?raw';

import './render-modal.css';

let modal, form;

export const showModal = () => {
  modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
  modal?.classList.add('hide-modal');
  form?.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = (element) => {
  if (modal) return;

  modal = document.createElement('div');
  modal.innerHTML = modalHtml;
  modal.classList.add('modal-container', 'hide-modal');

  form = modal.querySelector('form');

  element.append(modal);

  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-container')) {
      hideModal();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userLike = {};

    for (const [key, value] of formData) {
      if (key === 'balance') {
        userLike[key] = +value;
        continue;
      }

      if (key === 'isActive') {
        userLike[key] = value === 'on';
        continue
      }

      userLike[key] = value;
    }

    hideModal();
  });
}