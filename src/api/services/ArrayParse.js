function objectToArray(object, keyName, valueName) {
    const array = [];
    for (const element in object) {
      if (object.hasOwnProperty(element) && element !== "id" && object[element] !== null) {
        const item = {};
        item[keyName] = element;
        item[valueName] = object[element];
        array.push(item);
      }
    }

    return array;
  }

module.exports = { objectToArray }