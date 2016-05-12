import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';


import ElementName from '../element-name.jsx';
import Elements from '../../../api/elements.js';
import ElementParentBreadCrumbs from './element-parent-breadcrumbs.jsx';

const addAttribute = (elementId) => {
  Elements.addAttribute(elementId);
};

const ElementDetailsTitle = (props) => (
  <div>
    <ElementParentBreadCrumbs elementId={props.elementId} />
    <ElementName elementName={props.elementName} elementId={props.elementId} />
    <Button
      className="glyphicon glyphicon-plus pull-right"
      style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
      onClick={() => addAttribute(props.elementId)}
    />
  </div>
);

ElementDetailsTitle.propTypes = {
  elementName: PropTypes.string,
  elementId: PropTypes.string.isRequired,
};

export default ElementDetailsTitle;
