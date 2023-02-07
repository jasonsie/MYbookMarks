import { createContext, useContext, useEffect, useReducer } from 'react';
import useFetch from '../utilis/useFetch';
import { setDel, setEdit } from '../utilis/useFunction';

const SrcContext = createContext(null);
const SrcDispatchContext = createContext(null);

export function SrcProvider({ children }) {
  const { sideBar, bookmarks } = useFetch();
  const [src, dispatch] = useReducer(srcReducer, {
    sideBar: [],
    bookmarks: [],
    currentSideBar: {},
  });

  useEffect(() => {
    sideBar[0] !== undefined &&
      bookmarks[0] !== undefined &&
      dispatch({
        type: 'init',
        sideBar: sideBar,
        bookmarks: bookmarks,
      });
  }, [sideBar, bookmarks]);

  return (
    <SrcContext.Provider value={src}>
      <SrcDispatchContext.Provider value={dispatch}>{children}</SrcDispatchContext.Provider>
    </SrcContext.Provider>
  );
}

export function useSrcContext() {
  return useContext(SrcContext);
}

export function useSrcDispatch() {
  return useContext(SrcDispatchContext);
}

function srcReducer(srcs, action) {
  switch (action.type) {
    case 'init': {
      return { sideBar: action.sideBar, bookmarks: action.bookmarks, currentSideBar: {} };
    }
    case 'setCurrent': {
      return { ...srcs, currentSideBar: action.current };
    }
    case 'add': {
      const { bookmarks } = srcs;
      const { addItem } = action;
      return { ...srcs, bookmarks: [addItem, ...bookmarks] };
    }
    case 'edit': {
      const { bookmarks } = srcs;
      const { editItem } = action;
      let { updateRows: updateData } = setEdit(editItem)(bookmarks);
      return { ...srcs, bookmarks: updateData };
    }
    case 'delete': {
      const { bookmarks } = srcs;
      const { selectedLs } = action;
      const { updateData } = setDel(selectedLs)(bookmarks);
      return { ...srcs, bookmarks: updateData };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
