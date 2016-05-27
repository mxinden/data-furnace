import { Meteor } from 'meteor/meteor';
import types from './element-types.js';
import attributes from './element-attributes.js';

const Elements = {};

Elements.types = types;
Elements.attributes = attributes;

Meteor.Elements = Elements;

Elements.collection = new Meteor.Collection('Elements');

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert({
    attributes: [],
    childIds: [],
    description: '',
    name: 'unnamed',
    parentId,
    typeName,
  });

  Elements.collection.update(
    { _id: parentId }, { $addToSet: { childIds: elementId } }
  );

  return elementId;
};

Elements.remove = function remove(elementId, parentId) {
  Elements.collection.update({ _id: parentId }, { $pull: { childIds: elementId } });
  Elements.collection.remove(elementId);
};

Elements.setName = (elementId, name) => {
  Elements.collection.update(elementId, { $set: { name } });
};

Elements.setDescription = (elementId, description) => {
  Elements.collection.update(elementId, { $set: { description } });
};

export default Elements;