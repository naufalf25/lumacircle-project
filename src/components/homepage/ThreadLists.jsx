import React from 'react';
import CreateThread from './CreateThread';
import ThreadItem from './ThreadItem';

function ThreadLists() {
  return (
    <section className="flex w-full flex-col gap-10 md:w-2/3">
      <CreateThread />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
    </section>
  );
}

export default ThreadLists;
