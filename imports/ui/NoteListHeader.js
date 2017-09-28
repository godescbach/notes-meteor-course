import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  return (
    <div>
      NoteListHeader
      <button onClick={(e) => {
        console.log(props);
        props.meteorCall('notes.insert');
      }}>
        Add Note
      </button>
    </div>
  );
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);