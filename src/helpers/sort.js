export const stringPropertySort = function (prop1, prop2 = null, prop3 = null) {
  return function (a, b) {
    let aProp = a[prop1];
    let bProp = b[prop1];
    if (prop2) {
      aProp = aProp[prop2];
      bProp = bProp[prop2];
    }
    if (prop3) {
      aProp = aProp[prop3];
      bProp = bProp[prop3];
    }
    return aProp < bProp ? -1 : aProp < bProp ? 1 : 0;
  };
};
