import {
    SELECT_MEMBERS_PAGE,
    INVALIDATE_MEMBERS_PAGE,
    MEMBERS_REQUEST,
    MEMBERS_SUCCESS,
    MEMBERS_FAILURE} from '../actions/members';
    
 export function selectedMembersPage(state = 1, action) {
     switch(action.type) {
         case SELECT_MEMBERS_PAGE:
            return action.page;
         default:
            return state;   
     }
 } 
 
 function members(state = {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    members: [],
    error: null,       
 }, action) {
     switch (action.type) {
         case INVALIDATE_MEMBERS_PAGE:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
         case MEMBERS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate:false,
            });
         case MEMBERS_SUCCESS:
            return Obeject.assign({}, state, {
                isFetching: false,
                didInvalidate:false,
                totalCount: action.totalCount,
                members: action.members,
                error: null,
            });
         case MEMBERS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                error: action.error,
            });          
          default:
            return state;       
     }
 }
 export function membersByPage(state = {}, action) {
     switch (action.type) {
         case INVALIDATE_MEMBERS_PAGE:
         case MEMBERS_REQUEST:
         case MEMBERS_SUCCESS:
         case MEMBERS_FAILURE:
            return Object.assign({}, state, {
                [action.page]: members(state[action.page], action)
            });
          default:
            return state;  
     } 
 }