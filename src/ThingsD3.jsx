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

function PreSimulation({json}) {
  return <pre>
    {JSON.stringify(json, null, 2)}
  </pre>;
}

function Simulation({nodes, links}) {
  return (
    <div className='things'>
      <svg className='links-svg'>
        <g>
          {links.map(({source, target}, index) =>
            <line
              className='link'
              key={index}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
            />
          )}
        </g>
      </svg>
      <ul>
        {nodes.map(({id, x, y}) =>
          <li key={id} className='thing' style={{
            left: x,
            top: y,
          }}>
            <span>{`${id}`}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

class ThingsD3 extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ThingsD3';

    this.simulation = d3
    .forceSimulation()
    .alphaMin(0.01)
    .force('charge', d3.forceManyBody().strength(-100))
    .force('link', d3
      .forceLink()
      .id((node) => node.id)
      .distance(50)
    )
    .force('collide', d3.forceCollide(20))
    .force('center', d3.forceCenter(300, 300))
    .on('tick', () => this.forceUpdate());
  }

  createLinks(nodes) {
    // console.log(JSON.stringify(nodes));
    let links = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      links.push({
        source: nodes[i].id,
        target: nodes[i+1].id,
      });
    }
    return links;
  }

  componentWillReceiveProps({things}) {
    // Update the simulation with the new nodes and restart
    const existingNodesObj = _.fromPairs(_.map(
      this.simulation.nodes(), (node) => [node.id, node]
    ));
    const newNodes = _.map(things, (node) =>
      existingNodesObj[node.id] || node
    );

    this.simulation
    .nodes(newNodes)
    .force('link')
      .links(this.createLinks(newNodes))

    this.simulation
    .alpha(1)
    .restart();
  }

  render() {
    const nodes = this.simulation.nodes();
    const links = this.simulation.force('link').links();

    // <PreSimulation json={{nodes, links}} />
    return <div className='d3-box'>
      <Simulation nodes={nodes} links={links} />
    </div>;
  }
}

function mapThingsStateToProps({things}) {
  return {things};
}
ThingsD3 = connect(mapThingsStateToProps)(ThingsD3);

export default ThingsD3;