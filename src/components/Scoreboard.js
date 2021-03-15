import React from 'react';

export default function Scoreboard(props) {
  const HOME_TEAM_NAME = props.data.g.hls.tn;
  const HOME_TEAM_ID = props.data.g.hls.tid;
  const HOME_TEAM_PTS = props.data.g.lpla.hs;
  const AWAY_TEAM_NAME = props.data.g.vls.tn;
  const AWAY_TEAM_ID = props.data.g.vls.tid;
  const AWAY_TEAM_PTS = props.data.g.lpla.vs;
  const QTR = props.data.g.stt;
  const TIME_IN_QTR = props.data.g.cl;

  const Visitor = () => {
    return (
      <>
        <div className='team-info'>
          <span title='Visitor team'>{AWAY_TEAM_NAME}</span>
          <br />
          <img
            className='team-logo'
            src={`img/teams/logos/${AWAY_TEAM_ID}-logo.png`}
            alt={`${AWAY_TEAM_NAME} logo`}
          />
        </div>
        <div className='points'>{AWAY_TEAM_PTS}</div>
      </>
    );
  };

  const Home = () => {
    return (
      <>
        <div title='Home score' className='points'>
          {HOME_TEAM_PTS}
        </div>
        <div className='team-info'>
          <span title='Home team'>{HOME_TEAM_NAME}</span>
          <br />
          <img
            className='team-logo'
            src={`img/teams/logos/${HOME_TEAM_ID}-logo.png`}
            alt={`${HOME_TEAM_NAME} logo`}
          />
        </div>
      </>
    );
  };

  const Clock = () => {
    if (props.data.g.st === 3) {
      return (
        <div title='Clock' className='clock'>
          {QTR}
        </div>
      );
    } else {
      return (
        <div title='Clock' className='clock'>
          {QTR}
          <br />
          {TIME_IN_QTR}
        </div>
      );
    }
  };

  return (
    <>
      <div title='Visitor score' id='scoreboard'>
        <Visitor />
        <Clock />
        <Home />
      </div>
    </>
  );
}
