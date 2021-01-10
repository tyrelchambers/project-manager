import { formatUrl } from "../helpers/formatUrl";

function flagReducer(state, action) {
  switch (action.type) {
    case "add-flag":
      const cloneFlag = [...state];
      const dupe = cloneFlag.find((x, id) => {
        return x.flag === action.payload.obj.flag
          ? cloneFlag.splice(id, 1)
          : false;
      });

      if (!dupe) {
        cloneFlag.push(action.payload.obj);
      }
      return [...cloneFlag];
    case "add-value":
      const clone = [...state];
      clone.map((x, id) => {
        if (x.flag === action.payload.flag) {
          clone.splice(id, 1, {
            ...clone[id],
            ...action.payload,
            value: formatUrl(action.payload.value),
          });
        }
        return x;
      });

      return [...clone];
    default:
      throw new Error();
  }
}

export default flagReducer;
