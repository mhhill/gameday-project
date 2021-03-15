import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Overview(props) {
  const ACCESS_TOKEN = 'secret';

  const [articleData, setArticleData] = useState();

  useEffect(() => {
    const getArticles = async () => {
      let res = await Axios.get(
        `https://api.nba.net/2/timberwolves/article/?games=${props.gid}`,
        {
          headers: {
            accessToken: ACCESS_TOKEN,
          },
        }
      );
      setArticleData(res);
    };
    getArticles();
  }, [props.gid]);

  return (
    <>
      {articleData && (
        <div className='tab-content'>
          {articleData.data.response.result.map((item, i) => {
            return (
              <a
                className='article-link'
                href={`http://www.nba.com${item.url}`}
                target='_blank'
                rel='noreferrer'
                title={item.headline}
              >
                <article className='article-container'>
                  <img
                    className='article-img'
                    src={item.listImage.portrait}
                    alt={item.taxonomy.players.value}
                  />
                  <div className='article-info'>
                    <h3 className='article-headline'>{item.headline}</h3>
                    <div className='article-teaser'>
                      {item.teaser.substring(0, 90)}...
                    </div>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
