import {render} from 'react-dom'
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import ThingsText from './ThingsText';
import ThingsD3 from './ThingsD3';

import reducer, {addThing} from './reducer';

let Button = ({dispatch}) => (
  <div>
    <button onClick={() => dispatch(addThing())}>Add a thing</button>
  </div>
);
Button = connect()(Button);

function ThingsControl() {
  return (
    <div className='things-control'>
      <Button />
      <ThingsText />
    </div>
  );
}

const App = () => (
  <div>
    <ThingsD3 />
    <ThingsControl />
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