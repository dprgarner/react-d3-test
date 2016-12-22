import {render} from 'react-dom'
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import Things from './things';

import reducer, {addThing} from './reducer';

let Button = ({dispatch}) => (
  <div>
    <button onClick={() => dispatch(addThing())}>Add a thing</button>
  </div>
);
Button = connect()(Button);

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