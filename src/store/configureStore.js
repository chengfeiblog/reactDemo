import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import { selectedUsersPage, usersByPage } from '../reducers/users';
import { selectedReposPage, reposByPage, repoTableSize } from '../reducers/repos';
import { selectedMembersPage, membersByPage} from '../reducers/members';

const logger = createLogger();
/**
 * 组合reducers
 */
const reducer = combineReducers(
  {
    auth,
    selectedUsersPage,
    usersByPage,
    selectedReposPage,
    reposByPage,
    repoTableSize,
    selectedMembersPage,
    membersByPage,
  }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
