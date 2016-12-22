import {connect} from 'react-redux';

import {removeThing} from './reducer';

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

export default Things