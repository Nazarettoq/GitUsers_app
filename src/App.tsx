//import logo from './logo.svg';
import { useState } from 'react';
import s from './App.module.css';
import { Header } from './components/Header';
import { InfoTimer } from './components/InfoTimer';
import { UserInfo } from './components/UserInfo';
import { Users } from './components/Users';
import GitIcon from './assets/iconGithub.png';
export type UserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  following: number;
  followers: number;
  created_at: string;
  updated_at: string;
};
export type SearchUserType = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};
export const App = () => {
  const [firstView, setFirstView] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [timerCount, setTimerCount] = useState(false);
  const [currentUser, setCurrentUser] = useState<SearchUserType | null>(null);

  return (
    <>
      {firstView ? (
        <div className={s.firstView}>
          <img src={GitIcon} className={s.iconGithub} />
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '25px', fontWeight: 'bold' }}>
            GitHub users
          </p>
          <Header
            setSearchValue={setSearchValue}
            setFirstView={setFirstView}
            firstView={firstView}
          />
        </div>
      ) : (
        <div className={s.appSyle}>
          <Header
            setSearchValue={setSearchValue}
            setFirstView={setFirstView}
            firstView={firstView}
          />
          <div className={s.users}>
            <Users
              searchValue={searchValue}
              setUserInfo={setUserInfo}
              setTimerCountDafault={setTimerCount}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </div>
          <div className={s.timer}>
            {timerCount && (
              <InfoTimer
                timerCount={timerCount}
                setTimerCountDafault={setTimerCount}
                setCurrentUser={setCurrentUser}
              />
            )}
          </div>

          <div className={s.userInfo}>{timerCount && <UserInfo userInfo={userInfo} />}</div>
        </div>
      )}
    </>
  );
};
