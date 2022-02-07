import React from 'react';
import { UserType } from '../App';
import style from '../styles/UserInfo.module.css';
type PropsType = {
  userInfo: UserType | null;
};
export const UserInfo: React.FC<PropsType> = ({ userInfo }) => {
  return (
    <div className={style.userInfo}>
      <h2 className={style.userlogin}>{userInfo !== null ? userInfo.login : 'UserName'}</h2>
      {userInfo && (
        <div>
          <img src={userInfo.avatar_url} className={style.userImg} />
        </div>
      )}
      <div className={style.username}>{userInfo?.name}</div>
      <div className={style.bio}>{userInfo?.bio}</div>
      <div>
        <ul>
          <li>
            Company: <div className={style.ulElement}>{userInfo?.company}</div>
          </li>
          <li>
            Location: <div className={style.ulElement}>{userInfo?.location}</div>
          </li>
          <li>
            Blog:
            <div className={style.ulElement}>
              <a href={userInfo?.blog || ''} className={style.linkMove} target="_blank">
                {userInfo?.blog}
              </a>
            </div>
          </li>
          <li>
            Twitter:
            <div className={style.ulElement}>
              <a
                href={`https://twitter.com/${userInfo?.twitter_username}`}
                className={style.linkMove}
                target="_blank">
                {userInfo?.twitter_username}
              </a>
            </div>
          </li>
        </ul>
        <div className={style.rep}>Repositories: {userInfo?.public_repos}</div>
        <div className={style.follows}>
          {userInfo?.followers} followers · {userInfo?.following} following
        </div>
      </div>
    </div>
  );
};
