export function libraryReducer(state, action) {
  switch(action.type) {
    case 'setBooks':
      return {
        ...state,
        books: action.payload,
        searchBooks: [],
        selectBook: null
      };
    case 'setSearchBooks':
      return {
        ...state,
        searchBooks: state.books.filter(book => {
          const reg = new RegExp(action.payload);
          
          return reg.test(book.title) ||
          reg.test(book.isbn) ||
          reg.test(book.price) ||
          book.synopsis.find(paragraph => reg.test(paragraph));
        }),
        selectBook: null
      };
    case 'selectBook':
      return {
        ...state,
        selectBook: state.books.find(book => book.isbn === action.payload)
      };
    case 'back':
      return {
        ...state,
        selectBook: null
      };
    default:
      return state;
  }
}

export function searchReducer(state, action) {
  switch(action.type) {
    case 'searchChange':
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
}

export function shoppingCartReducer(state, action) {
  switch(action.type) {
    case 'addToCart':
      return {
        ...state,
        current: [...state.current, action.payload]
      };
    case 'removeFromCart':
      return {
        ...state,
        current: state.current.filter(isbn => isbn !== action.payload)
      };
    case 'setOffer':
      return {
        ...state,
        offer: action.payload.offers.map(offer => offer.value).reduce((a, b) => Math.max(a, b))
      };
    default:
      return state;
  }
}
