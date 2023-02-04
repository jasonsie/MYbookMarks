// Delete : the comparison of the two array
function setDel(delArr) {
  return (data) => {
    let updateData = [];
    updateData = data.filter((item) => {
      return !delArr.some((each) => each.id === item.id);
    });
    return { updateData };
  };
}

function setEdit(editItem = {}) {
  return (data = []) => {
    let updateRows = [];
    if (editItem?.id) {
      updateRows = data.map((each) => {
        if (each.id === editItem?.id) {
          return { ...each, ...editItem };
        }
        return each;
      });
    }
    return { updateRows };
  };
}

// function setAdd(addItem = {}) {
//   return (data = []) => {
//     let updateRows = [];
//     data.unshift(addItem);
//     // updateRows = [...data, { ...addItem, id: data?.length }];
//     console.log(`data`, data);
//     return { data };
//   };
// }

module.exports = {
  setDel: setDel,
  setEdit: setEdit,
  // setAdd: setAdd,
};
