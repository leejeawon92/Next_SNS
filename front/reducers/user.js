const dummyUser = {
  id: 1,
  nickname: 'JW',
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  user: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; 
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; 
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'; 


export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
};

export const loginSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  }
};

export const loginFailureAction = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  }
};

export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  }
};

export const logoutSuccessAction = (data) => {
  return {
    type: LOG_OUT_SUCCESS,
    data,
  }
};

export const logoutFailureAction = (data) => {
  return {
    type: LOG_OUT_FAILURE,
    data,
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: 
      return {
        ...state,
        isLoggedIn: true,
      };
    
    case LOG_IN_SUCCESS: 
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: {...action.data, nickname: 'JW'},
      };
    
    case LOG_IN_FAILURE: 
      return {
        ...state,
        isLoggedIn: false,
        isLoggedIn: false
      };
    
    case LOG_OUT_REQUEST: 
      return {
        ...state,
        isLoggingOut: true,
      };
    
    case LOG_OUT_SUCCESS: 
      return {
        ...state, 
        isLoggingOut: false,
        isLoggedIn: false,
        user: null,
      };
    
    case LOG_OUT_FAILURE: 
      return {
        ...state,
        isLoggingOut: false,
      };

    default: {
      return {
        ...state,
      }
    }
  }
};
export default reducer;
