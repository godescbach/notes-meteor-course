import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor.js';
import { notes } from '../fixtures/fixtures.js';

if (Meteor.isClient) {
  describe('Editor', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy(),
      }
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render note not found', function() {
      const wrapper = mount(<Editor selectedNoteId='sjdlkjlskdj' browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Note not found.');
    });

    it('should remove note', function() {
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} browserHistory={browserHistory} call={call}/>);

      // simulate button click
      wrapper.find('button').simulate('click');
      // setup assertions for call spy and for push spy
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should update the note body on textarea change', function () {
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} browserHistory={browserHistory} call={call}/>);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody,
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('should update the note title on input change', function () {
      const newTitle = 'New title text';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} browserHistory={browserHistory} call={call}/>);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle,
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('should set state for new note', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0],
      });

      expect(wrapper.state('title')).toBe(notes[0].title);   
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if not prop not provided', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });

      expect(wrapper.state('title')).toBe('');   
      expect(wrapper.state('body')).toBe('');
    });


  });
}