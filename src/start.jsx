import {render} from 'react-dom'
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const initialState = {things: []};

let i = 0;

function addThing() {
  return {
    type: 'add',
    name: i++,
  }
}

function removeThing(index) {
  return {
    type: 'remove',
    index
  }
}

function reducer(state=initialState, action) {
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

let Button = ({dispatch}) => (
  <div>
    <button onClick={() => dispatch(addThing())}>Add a thing</button>
  </div>
);
Button = connect()(Button);

function Things({things, dispatch}) {
  return (
    <ul>
      {things.map(({name}, index) => <li key={index}>
        <a href='#' onClick={() => dispatch(removeThing(index))}>
          X
        </a> - {name}
      </li>)}
    </ul>
  );
}

function mapThingsStateToProps({things}) {
  return {things};
}
Things = connect(mapThingsStateToProps)(Things);

const App = () => (
  <div>
    <Button />
    <Things />
  </div>
);

window.onload = () => {
  let store = createStore(reducer);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementsByTagName('main')[0]
  );
};