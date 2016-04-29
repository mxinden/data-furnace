/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { should } from 'meteor/practicalmeteor:chai';
should();
import Elements from './elements.js';

if (Meteor.isServer) {
  describe('Elements', () => {
    it('should be an object', () => {
      Elements.should.be.an('object');
    });
  });

  describe('Elements.collection', function() {
    it('should be a collection', function() {
      Elements.collection.should.have.property('_collection');
    });
  });

  describe('Elements.add', () => {
    it('should insert an element into the MongoDB', () => {
      const element = { parentId: null, typeName: 'hierarchy' };
      element._id = Elements.add(element.parentId, element.typeName);
      const elementFromDB = Elements.collection.findOne(element._id);
      elementFromDB.typeName.should.equal(element.typeName);
    });
  });

  describe('Elements.types', function() {
    for(type of Elements.types) {
      describe(type.humanName, function() {
        it('should have property humanName of type string', function() {
          type.should.have.property('humanName');
          type.humanName.should.be.a('string');
        });
        it('should have property name of type string', function() {
          type.should.have.property('name');
          type.name.should.be.a('string');
        });
      });
    }
  });

  describe('Elements.types.nameToHumanName', function() {
    it('should return "Reference object" on "referenceObject"', function() {
      Elements.types.nameToHumanName('referenceObject').should.equal('Reference object');
    });
  });
}