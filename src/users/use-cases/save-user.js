import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper.js';
import { User } from '../models/user';

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const newUser = await res.json();
  return newUser;
}

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
  
  const user = new User(userLike);

  if (!user.firstName || !user.lastName) {
    throw new Error('First & Lastname are required');
  }

  const userToSave = userModelToLocalhost(user);

  if (user.id) {
    throw new Error('Update not implemented');
  }

  const updatedUser = await createUser(userToSave);
  return updatedUser;
}