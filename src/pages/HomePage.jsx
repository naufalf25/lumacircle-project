import React from 'react';
import Navbar from '../components/homepage/Navbar';
import ThreadLists from '../components/homepage/ThreadLists';
import SidePanelLists from '../components/homepage/SidePanelLists';

function HomePage() {
  return (
    <div className="font-poppins">
      <Navbar />
      <div className="flex min-h-[91vh] gap-10 bg-[#F5EEDC] p-4 lg:p-20">
        <ThreadLists />
        <SidePanelLists />
      </div>
    </div>
  );
}

export default HomePage;
