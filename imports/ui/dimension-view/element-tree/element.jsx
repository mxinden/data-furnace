import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../../api/elements/elements.js';
import ElementName from '../element-name.jsx';
import ElementTypeNameLabel from '../element-type-name-label.jsx';
import Children from './children.jsx';
import TreeToggler from './toggle-button.jsx';
import Buttons from './buttons.jsx';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenVisible: false,
      buttonsVisible: false,
    };
  }

  render() {
    const elementItselfStyle = () => {
      const style = {
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '4px',
      };
      if (this.props.element._id === this.props.selectedElementId) {
        style.backgroundColor = '#337ab7';
        style.color = 'white';
        style.border = '1px solid transparent';
      }
      return style;
    };

    return (
      <div className="element" style={{ paddingTop: '5px' }}>
        <div
          onClick={() => this.props.setSelectedElementId(this.props.element._id)}
          onMouseEnter={() => this.setState({ buttonsVisible: true })}
          onMouseLeave={() => this.setState({ buttonsVisible: false })}
          style={elementItselfStyle()}
          draggable={this.props.draggable}
          onDragStart={(ev) => {
            ev.dataTransfer.setData('text/id', this.props.element._id);
            ev.dataTransfer.setData('text/type', 'element');
          }}
        >
          <TreeToggler
            toggleChildrenVisible={() =>
              this.setState({ childrenVisible: !this.state.childrenVisible })}
            childIds={this.props.element.childIds}
            childrenVisible={this.state.childrenVisible}
          />
          <div style={{ display: 'inline', paddingRight: '10px' }}>
            <ElementTypeNameLabel typeName={this.props.element.typeName} />
          </div>
          <ElementName
            elementName={this.props.element.name}
            elementId={this.props.element._id}
            readOnly={this.props.readOnly}
          />
          <Buttons
            buttonsVisible={this.state.buttonsVisible && !this.props.readOnly}
            element={this.props.element}
          />
        </div>

        <Children
          element={this.props.element}
          setSelectedElementId={this.props.setSelectedElementId}
          selectedElementId={this.props.selectedElementId}
          childrenVisible={this.state.childrenVisible}
          readOnly={this.props.readOnly}
          draggable={this.props.draggable}
        />
      </div>
    );
  }
}

Element.propTypes = {
  element: React.PropTypes.object.isRequired,
  subElements: React.PropTypes.array,
  setSelectedElementId: React.PropTypes.func.isRequired,
  selectedElementId: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find().fetch(),
  };
}, Element);
