import { Meteor } from 'meteor/meteor';
import types from './element-types.js';
import characteristics from './characteristics.js';

const Elements = {};

Elements.types = types;
Elements.characteristics = characteristics;

Meteor.Elements = Elements;

Elements.collection = new Meteor.Collection('Elements');

if (Meteor.isServer) {
  Meteor.publish('elements', () => {
    return Elements.collection.find();
  });
}

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert({
    characteristics: [],
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
  removeChildren(elementId);
  Elements.collection.remove(elementId);
};

const removeChildren = (elementId) => {
  const childIds = Elements.collection.findOne(elementId).childIds;
  childIds.forEach((childId) => removeChildren(childId));
  Elements.collection.remove(elementId);
};

Elements.getName = (elementId) => {
  return Elements.collection.findOne(elementId).name;
};

Elements.setName = (elementId, name) => {
  Elements.collection.update(elementId, { $set: { name } });
};

Elements.setDescription = (elementId, description) => {
  Elements.collection.update(elementId, { $set: { description } });
};

export default Elements;
