export function sortListItemString(item1, item2) {
    let name1 = item1.toUpperCase();
    let name2 = item2.toUpperCase();

    if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }

      return 0;
}