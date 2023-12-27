import shortid from 'shortid';
import shortId from 'shortid';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'jeawon',
    },
    content: '첫 번째 게시글 #first #첫번째 # 첫번째',
    Images: [{
      id: shortid.generate(),
      src: 'https://images.unsplash.com/photo-1581196607303-95c00f31c676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFQSVCMiVBOCVFQyU5QSVCOHxlbnwwfHwwfHx8MA%3D%3D',
    }, {
      id: shortid.generate(),
      src: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUVBJUIyJUE4JUVDJTlBJUI4fGVufDB8fDB8fHww',
    }, {
      id: shortid.generate(),
      src: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVBJUIyJUE4JUVDJTlBJUI4fGVufDB8fDB8fHww',
    }],
    Comments: [{
      id: shortid.generate(),
      User: {
        nickname: 'dumy1',
      },
      content: '더미1',
    }, {
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: 'dumy2',
      },
      content: '더미2',
    }]
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'JW',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'JW',
  },
});


export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
})

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
})


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      console.log("REDUCER: ADD_POST_REQUEST");
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      console.log("REDUCER: ADD_POST_SUCCESS");
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE: 
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      }


    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS: 
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE: 
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      }


    default: {
      return {
        ...state,
      };
    }
  }
};
