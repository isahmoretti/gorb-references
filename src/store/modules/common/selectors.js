// create tree byId
export const createTreeById = (data) => {
  return data.reduce((acc, cur) => {
    acc[cur.id] = cur;

    return acc;
  }, {});
};

export const createTreeAllId = (data) => data.map((item) => item.id);

// insert element byId
export const insertElementById = (state, data) => ({
  ...state,
  [data.id]: data,
});

// insert element allId
export const insertElementAllId = (state, data) => {
  if (state.includes(data.id)) return [...state];

  return [...state, data.id];
};

// get element byId
export const getElementById = (state, elementId) => state[elementId];

// get element allId
export const getElementAllId = (state, elementId) =>
  state.find((index) => index === elementId);

export function getElements(state) {
  // @ts-ignore
  return state.allId.map((item) => state.byId[item]);
}

// update element
export const updateElementById = (state, data) => ({
  ...state,
  [data.id]: data,
});

// delete element byId
export const deleteElementById = (state, elementId) => delete state[elementId];

// delete element allId
export const deleteElementAllId = (state, elementId) => {
  const positionElement = state.findIndex((index) => index === elementId);
  return state.splice(positionElement, 1);
};
