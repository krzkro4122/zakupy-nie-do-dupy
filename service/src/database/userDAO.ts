import { UserBase, UserResolved } from '../types/user';
import { DAO } from './DAO';

class UserDAO extends DAO<UserResolved, UserBase> {}

export const userDAO = new UserDAO('users');
