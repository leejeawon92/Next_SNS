export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'jeawon',
    },
    content: '첫 번째 게시글',
    Images: [{
      src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.tgdaily.co.kr%2Fnews%2Fphoto%2F202002%2F218395_48273_3133.jpg&tbnid=T56xF9Te5jnNbM&vet=12ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygLegQIARB1..i&imgrefurl=http%3A%2F%2Fwww.tgdaily.co.kr%2Fnews%2FarticleView.html%3Fidxno%3D218395&docid=iAUQmoTVN-cqrM&w=600&h=375&q=%EC%97%B4%EB%A0%99%EC%A0%84%EC%82%AC%20%2C&ved=2ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygLegQIARB1',
    }, {
      src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.namu.wiki%2Fi%2FWTgrLyxDzfNqD1NQEzjflcQSkiK9MrP1qK9EP4ZumZPXZM5pbCEGZWwZnqfcKwDV307cBgOhU_p4UQDSJ3W7Ng.webp&tbnid=pvtwF94cY7xqTM&vet=12ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygBegQIARBg..i&imgrefurl=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%2597%25B4%25EB%25A0%2599%25EC%25A0%2584%25EC%2582%25AC(%25EC%2597%25B4%25EB%25A0%2599%25EC%25A0%2584%25EC%2582%25AC)&docid=DoOYel12NfH_fM&w=653&h=479&q=%EC%97%B4%EB%A0%99%EC%A0%84%EC%82%AC%20%2C&ved=2ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygBegQIARBg',
    }, {
      src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.namu.wiki%2Fi%2FDtsGyKqj-RY3mBWof0qfURpgGk9Sgg3juciFImUS2sZIGizKoqJpF8XEjXYPZ3lw582nRCnm02UFP3eK4l5EJw.webp&tbnid=e9ev70PveDju7M&vet=12ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygEegQIARBm..i&imgrefurl=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%2597%25B4%25EB%25A0%2599%25EC%25A0%2584%25EC%2582%25AC%2F%25EB%2593%25B1%25EC%259E%25A5%25EC%259D%25B8%25EB%25AC%25BC&docid=WiN5ajao4vz2HM&w=650&h=365&q=%EC%97%B4%EB%A0%99%EC%A0%84%EC%82%AC%20%2C&ved=2ahUKEwimmtuKwJODAxUctFYBHQP2DDAQMygEegQIARBm',
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
