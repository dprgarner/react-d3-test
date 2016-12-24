/*
  Ideas for d3 with react/redux and star systems:
  - <StarMap /> component contains the d3 simulation as an attribute (this.simulation)
  - <StarSystem /> has the props 'x,y' which come from the nodes of the simulation
  - <StarSystemLink /> is pretty much an SVG which comes from the links of the simulation
  - The simulation ticking is not integrated with redux

  - Alternative ways: forceUpdate; setState; ref.
  - StarMap calls forceUpdate whenever the simulation ticks
    -- This seems like the simplest way to do this. 
    -- If this is too inefficient, we can try setting the component state each
       time. However, I think this will add more overhead - I'd need to clone the
       entire state tree on every render.
      -- The simulation nodes carry a little bit more data than needed, but not
         much - you'd essentially have to copy everything over each time.
    -- Alternatively, we can store a ref to the DOM element directly, and not
       use React's Virtual DOM at all.
  - What about links? How will they be rendered?
  - Need to think about how to modify nodes whenever systems are added and removed.
  - The drag-and-dropping will probably be handled by redux.
    -- Pin while dragging (fx, fy)
    -- Unpin when dropping (fx->x, fy->y)
    -- Later: add a pin to dragged systems, unpin on click 
*/

import {connect} from 'react-redux';
import _ from 'lodash'

import * as d3 from 'd3-force';

function PreSimulation({nodes}) {
  return <pre>
    {JSON.stringify(nodes, null, 2)}
  </pre>;
}

function Simulation({nodes}) {
  return (
    <ul className='things'>
      {nodes.map(({id, x, y}) =>
        <li key={id} className='thing' style={{
          left: x,
          top: y,
        }}>{`${id}: ${Math.floor(x)},${Math.floor(y)}`}</li>
      )}
    </ul>
  );
}

class ThingsD3 extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ThingsD3';

    this.simulation = d3
    .forceSimulation()
    .alphaMin(0.01)
    .force('charge', d3.forceManyBody().strength(30))
    .force('collide', d3.forceCollide(20))
    .force('center', d3.forceCenter(100, 100))
    .on('tick', () => this.forceUpdate());
  }

  componentWillReceiveProps({things}) {
    // Update the simulation with the new nodes and restart
    const nodes = this.simulation.nodes().filter(({id}) =>
      _.some(things, {id})
    );

    this.simulation
    .nodes(things)
    .alpha(1)
    .restart();
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