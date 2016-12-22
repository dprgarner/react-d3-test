import {connect} from 'react-redux';

function mapThingsStateToProps({things}) {
  return {things};
}

function ThingsD3({things}) {
  return (
    <div style={{border: '1px solid orange'}}>
      {'asdasdas'}
    </div>
  );
}
ThingsD3 = connect(mapThingsStateToProps)(ThingsD3);

export default ThingsD3;