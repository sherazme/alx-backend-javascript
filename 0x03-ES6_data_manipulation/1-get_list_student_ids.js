export default function getListStudentIds(arr) {
  let newArray = [];
  if (arr instanceof Array) {
    newArray = arr.map((item) => item.id);
  }

  return newArray;
}