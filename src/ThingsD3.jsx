import {connect} from 'react-redux';

import * as d3 from 'd3-force';

function PreSimulation({nodes}) {
  return <pre>
    {JSON.stringify(nodes, null, 2)}
  </pre>;
}

function Simulation({nodes}) {
  return (
    <ul className='things'>
      {nodes.map(({index, x, y}) =>
        <li key={index} className='thing' style={{
          left: x,
          top: y,
        }}>{`${index}: ${Math.floor(x)},${Math.floor(y)}`}</li>
      )}
    </ul>
  );
}

class ThingsD3 extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ThingsD3';

    this.simulation = d3
    .forceSimulation([
      {},
      {},
      {x: 100, y: 100},
      {},
    ])
    .alphaMin(0.01)
    .force('collide', d3.forceCollide(20))
    .force('center', d3.forceCenter(100, 100))
    .on('tick', () => this.forceUpdate());
  }

  render() {
    const nodes = this.simulation.nodes();
    // const links = this.simulation.links();
    console.log('rendered');
    return <div className='d3-box'>
      <Simulation nodes={nodes} />
    </div>;
  }
}

function mapThingsStateToProps({things}) {
  return {things};
}
ThingsD3 = connect(mapThingsStateToProps)(ThingsD3);

export default ThingsD3;