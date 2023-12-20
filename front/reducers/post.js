export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'jeawon',
    },
    content: '첫 번째 게시글',
    Images: [{
      src: 'https://images.unsplash.com/photo-1581196607303-95c00f31c676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFQSVCMiVBOCVFQyU5QSVCOHxlbnwwfHwwfHx8MA%3D%3D',
    }, {
      src: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUVBJUIyJUE4JUVDJTlBJUI4fGVufDB8fDB8fHww',
    }, {
      src: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVBJUIyJUE4JUVDJTlBJUI4fGVufDB8fDB8fHww',
    }],
    Comments: [{
      User: {
        nickname: 'dumy1',
      },
      content: '더미1',
    }, {
      User: {
        nickname: 'dumy2',
      },
      content: '더미2',
    }]
  }],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'JW',
  },
  Images: [],
  Comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
