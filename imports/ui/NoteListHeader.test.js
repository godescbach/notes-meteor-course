// import test modules
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// import component we're testing
import { NoteListHeader } from './NoteListHeader';
// if on client setup describe block
if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('should call meteorCall on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount( <NoteListHeader meteorCall={spy}/> );

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
// it should call meteorCall on click
// create spy
// render component with spy
// simulate a button click
// assert spy was called correctly