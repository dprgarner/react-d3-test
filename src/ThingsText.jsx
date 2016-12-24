import {connect} from 'react-redux';

import {removeThing} from './reducer';

function ThingsText({things, dispatch}) {
  return (
    <ul className='things-text'>
      {things.map(({id}, index) => <li key={index}>
        <a href='#' onClick={() => dispatch(removeThing(index))}>
          X
        </a> - {id}
      </li>)}
    </ul>
  );
}

function mapThingsStateToProps({things}) {
  return {things};
}
ThingsText = connect(mapThingsStateToProps)(ThingsText);

export default ThingsText