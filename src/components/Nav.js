import React from 'react';

export default function Nav({ setSelectedTab }, props) {
  return (
    <nav id='main-nav'>
      <button onClick={() => setSelectedTab('overview')}>Overview</button>
      <button onClick={() => setSelectedTab('playbyplay')}>Play-by-Play</button>
      <button onClick={() => setSelectedTab('videos')}>Videos</button>
    </nav>
  );
}
