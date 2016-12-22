import {connect} from 'react-redux';

import {removeThing} from './reducer';

function ThingsText({things, dispatch}) {
  return (
    <ul className='things-text'>
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
ThingsText = connect(mapThingsStateToProps)(ThingsText);

export default ThingsText