import React from 'react';
import ThreadLists from '../components/homepage/ThreadLists';
import SidePanelLists from '../components/homepage/SidePanelLists';

function HomePage() {
  return (
    <section className="font-poppins flex gap-10 bg-[#F5EEDC] p-4 lg:p-20">
      <ThreadLists />
      <SidePanelLists />
    </section>
  );
}

export default HomePage;
