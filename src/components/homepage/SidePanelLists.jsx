import React from 'react';

function SidePanelLists() {
  return (
    <div className="hidden flex-col gap-4 md:flex md:w-1/3">
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <h2>Leaderboards</h2>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <h2>Your Profile</h2>
      </div>
    </div>
  );
}

export default SidePanelLists;
