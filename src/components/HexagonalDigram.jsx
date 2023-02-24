import React, { useRef, useEffect } from "react";
import * as go from "gojs";


const HexagonalDigram = () => {

  const diagramRef = useRef(null);

  //for creating hexagonal shape and for filling color
  let hexaGeo = go.Geometry.parse('M 25 0 L 50 15 L 50 35 L 25 50 L 0 35 L 0 15 Z', true);
  
  useEffect(() => {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, diagramRef.current, {
      'undoManager.isEnabled': true,//allow for model change listening
      'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'red' }, //create a new diagram with red color and the text
      
    });

    //make a node template
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle',
          {
            name: 'SHAPE', fill: 'red', strokeWidth: 2, desiredSize: new go.Size(100, 100), 
            //for creating hexagonal shape
            geometry: hexaGeo,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: true, font: '400 .875rem Roboto, sans-serif' },  // some room around the text
          new go.Binding('text').makeTwoWay()
        )
    );

    diagram.model = $(go.GraphLinksModel, {
      nodeDataArray: [
        { key: '1', text: 'Node 1', color: 'lightblue' },
        { key: '2', text: 'Node 2', color: 'lightgreen' },
        { key: '3', text: 'Node 3', color: 'lightyellow' },
      ],
      linkDataArray: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
      ],
    });

    return () => {
      diagram.div = null;
    };
  }, []);

  return <div ref={diagramRef} style={{ height: '100%', width: '100%' }} />;
};

export default HexagonalDigram;
