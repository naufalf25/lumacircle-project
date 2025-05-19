import React from 'react';

function SidePanelLists() {
  return (
    <section className="hidden md:block md:w-1/3">
      <div className="sticky top-10 flex flex-col gap-4">
        <div className="rounded-xl bg-white p-4 shadow-lg">
          <h2>Leaderboards</h2>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-lg">
          <h2>Your Profile</h2>
        </div>
      </div>
    </section>
  );
}

export default SidePanelLists;
