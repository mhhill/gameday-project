import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import Nav from './components/Nav';
import Overview from './components/Overview';
import PlayByPlay from './components/PlayByPlay';
import Videos from './components/Videos';

import './App.css';

function App() {
  const GAME_ID = '0022000574'; // 0022000591

  const [gameData, setGameData] = useState({
    g: undefined,
  });

  useEffect(() => {
    const checkGame = () =>
      setInterval(() => {
        getData();
      }, 10000);
    const getData = async () => {
      let res = await Axios.get(
        `http://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2020/scores/gamedetail/${GAME_ID}_gamedetail.json`
      );
      setGameData({ g: res.data.g });
    };
    checkGame();
    getData();
  }, []);

  const [selectedTab, setSelectedTab] = useState('overview');

  const TABS = {
    overview: <Overview gid={GAME_ID} />,
    playbyplay: <PlayByPlay gid={GAME_ID} />,
    videos: <Videos gid={GAME_ID} />,
  };

  return (
    <>
      <Header />
      {gameData.g && <Scoreboard data={gameData} />}
      <Nav setSelectedTab={setSelectedTab} />
      {TABS[selectedTab]}
    </>
  );
}

export default App;
