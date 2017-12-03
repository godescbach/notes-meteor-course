import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session; 

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });
    it('should render title and timestamp', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('9/29/17');
    });

    it('should set default title if no title set', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('shoud call set on click', function() {
      // render notlistitem using either note ans Session
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );
      // find div and simulate a click on it
      wrapper.find('div').simulate('click');
      // expect session.set to have been called with 2 arguments
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[1]._id);
    });
  });
}