import 'isomorphic-fetch';
import {checkStatus, parseJSON} from '../utils/utils';
import {api} from '../api/Api';
export const SELECT_MEMBERS_PAGE = 'SELECT_MEMBERS_PAGE';
export const INVALIDATE_MEMBERS_PAGE = 'INVALIDATE_MEMBERS_PAGE';
export const MEMBERS_REQUEST = 'MEMBERS_REQUEST';
export const MEMBERS_SUCCESS = 'MEMBERS_SUCCESS';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

/**
 * 分页
 */
export function selectMembersPage(page) {
    return {
        type: SELECT_MEMBERS_PAGE,
        page,
    };
}

export function invalidateMembersPage(page) {
    return {
        type: INVALIDATE_MEMBERS_PAGE,
        page,
    };
}
 /**
  * 
  */
 function membersRequest(page) {
   return {
       type: MEMBERS_REQUEST,
       page,
   }  
 } 
 /**
  * 
  */
  function membersSuccess(page, payload) {
      return {
          type: MEMBERS_SUCCESS,
          page,
          members: payload.items,
          totalCount: payload.total_count
      }
  }
  
  function membersFailure(page, error) {
      return {
          type: MEMBERS_FAILURE,
          page,
          error,
      }
  }
  function fetchTopMembers(page) {
    return dispatch => {
        dispatch(membersRequest(page));
        return fetch('/api/members', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page,
            }),
          }).then(checkStatus)
            .then(parseJSON)
            .then(json => dispatch(membersSuccess(page, json)))
            .catch(error => {
                const response = error.response;
                if(response === undefined) {
                    dispatch(membersFailure(page, error));
                } else {
                   parseJSON(response)
                    .then(json => {
                        error.status = response.status;
                        error.statusText = response.statusText;
                        error.message = json.message;
                        dispatch(usersFailure(page, error));
                    });
                }
            });
    };      
  }
  function shouldFetchMembers(state, page) {
      const members = state.membersByPage[page];
      if(!members) {
          return true;
      }
      if(members.isFetching) {
          return false;
      }
      return members.didInvalidate;
  }
  export function fetchTopMembersIfNeed(page) {
      return (dispatch, getState) => {
          if(shouldFetchMembers(getState(), page)) {
              return dispatch(fetchTopMembers(page));
          }
      }
  }
  
  