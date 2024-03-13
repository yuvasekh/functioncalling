// actions.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const LOGIN='LOGIN'
export const LOGOUT='LOGOUT'
export const ROLESET=''
export const SHOWWIDGETBOX='SHOWWIDGETBOX'
export const loginuser = () => ({
  type: LOGIN,
});
export const roleset = (role) => ({
  type: ROLESET,
  payload: role, // The role value that you're passing when dispatching
});
export const logoutuser = () => ({
  type: LOGOUT,
});
export const increment = () => ({
  type: INCREMENT,
});
export const showwidgetbox = (widgetstatus) => ({
    type: SHOWWIDGETBOX,
    payload: widgetstatus,
  });

export const decrement = () => ({
  type: DECREMENT,
});
