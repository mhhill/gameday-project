import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Videos(props) {
  const ACCESS_TOKEN = 'secret';

  const [videoData, setVideoData] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const getVideos = async () => {
      let res = await Axios.get(
        `https://api.nba.net/2/timberwolves/wsc/?count=9&games=${props.gid}`,
        {
          headers: {
            accessToken: ACCESS_TOKEN,
          },
        }
      );
      setVideoData(res);
    };
    getVideos();
  }, [props.gid]);
  return (
    <>
      {videoData.data && (
        <div className='tab-content center'>
          <div id='video-top' className='video-container'>
            <video
              key={videoData.data.response.result[currentVideo].mp4}
              className='video-top'
              title={`${videoData.data.response.result[currentVideo].headline}`}
              controls
              autoPlay
            >
              <source
                src={videoData.data.response.result[currentVideo].mp4}
                type='video/mp4'
              />
            </video>
          </div>
          <div className='video-top-headline'>
            {videoData.data.response.result[currentVideo].headline}
          </div>
          <hr />
          <h3 className='video-headline-recent-clips'>Recent Clips</h3>
          {videoData.data.response.result.map((item, i) => {
            return (
              <div key={i} className='video-thumb-container'>
                <a className='video-top-link' href='#video-top'>
                  <video
                    preload='metadata'
                    key={i}
                    className='video-thumb'
                    onClick={() => setCurrentVideo(i)}
                    title={`Play video ${videoData.data.response.result[currentVideo].headline}`}
                  >
                    <source src={`${item.mp4}#t=5`} type='video/mp4' />
                  </video>
                  <div
                    className='video-thumb-headline'
                    onClick={() => setCurrentVideo(i)}
                  >
                    {item.headline}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
