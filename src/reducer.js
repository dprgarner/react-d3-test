const initialState = {things: []};

let i = 0;

export function addThing() {
  return {
    type: 'add',
    name: i++,
  }
}

export function removeThing(index) {
  return {
    type: 'remove',
    index
  }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'add':
      const newThing = {name: action.name}
      return {...state, things: [...state.things, newThing]};
    case 'remove':
      const newThings = [...state.things];
      newThings.splice(action.index, 1);
      return {...state, things: newThings};
  }
  return state;
}