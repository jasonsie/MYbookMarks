import { useEffect, useState } from 'react';
import { fetchBookmarks } from './useApi';

const useFetch = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [sideBar, setSideBar] = useState([]);

  function bookmarksToSideBar(bookmarks) {
    let sideBar = [];
    for (let bookMark of bookmarks) {
      for (let str of bookMark?.ctg) {
        const isRe = sideBar.some((each) => each?.name === str);
        !isRe && sideBar.push({ id: bookMark.ctgId, name: str });
      }
    }

    return { sideBar, bookmarks };
  }

  /*
    1. fetching all the data
    2. also generating the sideabar data 
  */
  useEffect(() => {
    const res = fetchBookmarks();
    res
      .then((res) => res.data)
      .then((res) => bookmarksToSideBar(res))
      .then(({ sideBar, bookmarks }) => {
        setSideBar(sideBar);
        setBookmarks(bookmarks);
      })
      .catch((error) => console.log(error));
  }, []);

  return { sideBar, bookmarks };
};

export default useFetch;
