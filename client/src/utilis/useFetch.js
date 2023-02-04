import { useEffect, useState } from 'react';
const API_URL = process.env.REACT_APP_URL;

const useFetch = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [sideBar, setSideBar] = useState([]);

  const bookmarksToSideBar = (bookmarks) => {
    let sideBar = [];
    for (let item of bookmarks) {
      const isRe = sideBar.find((each) => each?.name === item.ctg);
      if (!isRe) sideBar.push({ id: item.ctgId, name: item.ctg });
    }

    return { sideBar, bookmarks };
  };

  /*
    1. fetching all the data
    2. also generating the sideabar data 
  */
  useEffect(() => {
    fetch(`${API_URL}/bookMarks`)
      .then((res) => res.json())
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
