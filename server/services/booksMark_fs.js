const fs = require('fs');

let collection = [];
let sideBar = [];

function dataTrans(data) {
  if (data['children']) {
    data['children'].forEach((each) => dataTrans({ ...each, ctg: data.name }));
  } else {
    collection.push({
      id: data.id,
      name: data.name,
      type: data.type,
      url: data.url,
      ctg: data.ctg,
    });
  }
  return { sideBar, collection };
}

function writeFile(data) {
  fs.writeFile('/Users/jason/z-lab/react/web_src/server/public/bookMarks.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

fs.readFile('/Users/jason/z-lab/react/web_src/server/public/row.json', (err, data) => {
  if (err) throw err;
  const { bookmark_bar, other } = JSON.parse(data);
  const { collection: bookMarks_result } = dataTrans(bookmark_bar);
  const { collection: other_result } = dataTrans(other);
  writeFile(JSON.stringify(other_result));
});
