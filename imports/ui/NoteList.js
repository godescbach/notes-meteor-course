import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
  let notesContent = null;
  if (props.notes.length > 0) {
    notesContent = props.notes.map(note =>
      <NoteListItem key={note._id} note={note} />);
  } else {
    notesContent = <NoteListEmptyItem />;
  }
  return (
    <div>
      <NoteListHeader />
      {notesContent}
      <p>NoteList: {props.notes.length}</p>
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);