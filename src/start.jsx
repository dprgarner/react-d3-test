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

function reducer(state=initialState, action) {
  switch (action.type) {
    case 'add':
      const newThing = {name: action.name}
      return {...state, things: [...state.things, newThing]};
  }
  return state;
}

let Buttons = ({dispatch}) => (
  <div>
    <button onClick={() => dispatch(addThing())}>Add a thing</button>
    <button>Remove a thing</button>
  </div>
);
Buttons = connect()(Buttons);

let Things = ({things}) => (
  <ul>
    {things.map(({name}, index) => <li key={index}>{name}</li>)}
  </ul>
);

function mapThingsStateToProps({things}) {
  return {things};
}
Things = connect(mapThingsStateToProps)(Things);

const App = () => (
  <div>
    <Buttons />
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