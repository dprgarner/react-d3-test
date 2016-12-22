import {connect} from 'react-redux';

import * as d3 from 'd3-force';


function PreNodes({nodes}) {
  return <pre>
    {JSON.stringify(nodes, null, 2)}
  </pre>;
}


function Nodes({nodes}) {
  return (
    <ul className='things'>
      {nodes.map(({index, x, y}) =>
        <li key={index} className='thing' style={{
          left: x,
          top: y,
        }}>{Math.floor(x) + ',' + Math.floor(y)}</li>
      )}
    </ul>
  );
}

class ThingsD3 extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ThingsD3';
    this.simulation = d3
      .forceSimulation([{}, {vx: -100, vy: 10}, {}, {}, {}, {}, {}, {}, {}])
      .force('collide', d3.forceCollide(20))
      .force("y", d3.forceY(100))
      .on('tick', () => this.forceUpdate());
  }

  render() {
    const nodes = this.simulation.nodes();
    console.log('rendered');
    return <div className='d3-box'>
      <Nodes nodes={nodes} />
    </div>;
  }
}

function mapThingsStateToProps({things}) {
  return {things};
}
ThingsD3 = connect(mapThingsStateToProps)(ThingsD3);

export default ThingsD3;