// Delete : the comparison of the two array
export function setDel(delArr) {
  return (data) => {
    let updateData = [];
    updateData = data.filter((item) => {
      return !delArr.some((each) => each.id === item.id);
    });
    return { updateData };
  };
}

export function setEdit(editItem = {}) {
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

export function setCtgAsArray(bookMarks = []) {
  return bookMarks.map((each) => {
    return { ...each, ctg: [each.ctg] };
  });
}
