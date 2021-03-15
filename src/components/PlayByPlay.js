import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function PlayByPlay(props) {
  const [playByPlayData, setPlayByPlayData] = useState({
    g: undefined,
  });

  const [playsLength, setPlaysLength] = useState(8);

  useEffect(() => {
    const checkGame = () =>
      setInterval(() => {
        getData();
      }, 10000);
    const getData = async () => {
      let res = await Axios.get(
        `http://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2020/scores/spbp/${props.gid}_spbp.json`
      );
      setPlayByPlayData({ g: res.data.g });
    };
    checkGame();
    getData();
  }, [props.gid]);

  const PlayList = () => {
    const currentQtr = playByPlayData.g.p;
    return (
      playByPlayData.g &&
      playByPlayData.g.pla
        .map((item) => {
          if (item.pid !== 0) {
            return (
              <div title={item.de} className='play-container'>
                <img
                  className='play-thumb'
                  src={`img/teams/play-thumbs/${item.pid}.png`}
                  alt={item.de}
                />
                <div className='play-desc'>{item.de}</div>
                <div className='play-clock'>
                  <span className='play-score'>
                    {item.vs}-{item.hs}
                  </span>
                  <span className='play-qtr'>Q{currentQtr}</span>
                  {item.cl.substr(0, 5)}
                </div>
              </div>
            );
          } else {
            return (
              <div title={item.de} className='play-container'>
                <img
                  className='play-thumb'
                  src={`img/teams/logos/${item.tid}-logo.png`}
                  alt={item.de}
                />
                <div className='play-desc'>{item.de}</div>
                <div className='play-clock'>
                  <span className='play-score'>
                    {item.vs}-{item.hs}
                  </span>
                  <span className='play-qtr'>Q{currentQtr}</span>
                  {item.cl.substr(0, 5)}
                </div>
              </div>
            );
          }
        })
        .reverse()
        .slice([0], [playsLength])
    );
  };

  const ViewMoreBtn = () => {
    return (
      <button
        className='play-view-more-btn'
        onClick={() => {
          setPlaysLength(playsLength + 4);
          scrollPlays();
        }}
      >
        View more
      </button>
    );
  };

  const scrollPlays = () => {
    var pbpContainer = document.getElementById('pbp-container');
    pbpContainer.scrollTop = pbpContainer.scrollHeight;
  };

  return (
    <>
      {playByPlayData.g && (
        <>
          <div id='pbp-container' className='tab-content scroll-box'>
            <PlayList />
          </div>
          <div className='tab-content'>
            <ViewMoreBtn />
          </div>
        </>
      )}
    </>
  );
}
