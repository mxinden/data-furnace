import React, { PropTypes } from 'react';
import Elements from '../../../api/elements.js';
import { Breadcrumb } from 'react-bootstrap';

const getParents = (elementId) => {
  const parents = [];
  let element = Elements.collection.findOne(elementId);

  while (element.parentId) {
    element = Elements.collection.findOne(element.parentId);
    parents.push(element);
  }

  return parents.reverse();
};

const ElementParentBreadCrumbs = (props) => (
  <Breadcrumb style={{ display: 'inline' }}>
    {getParents(props.elementId).map((parent, index) => {
      return (
        <Breadcrumb.Item key={index}>
          {parent.name.substring(0, 4)}
        </Breadcrumb.Item>
        );
    })}
  </Breadcrumb>
);

ElementParentBreadCrumbs.propTypes = {
  elementId: PropTypes.string.isRequired,
};

export default ElementParentBreadCrumbs;
