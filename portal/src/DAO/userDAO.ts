import type { UserBase, UserResolved } from '../../../shared/types/user';
import { DAO } from './DAO';

class UserDAO extends DAO<UserResolved, UserBase> { }

export const userDAO = new UserDAO('users');
