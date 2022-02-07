import axios from 'axios';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { SearchUserType, UserType } from '../App';
import { Paginate } from './Paginator';
import style from '../styles/UserCard.module.css';
import CryGitIcon from '../assets/iconCryGithub.png';
type PropsType = {
  setUserInfo: Dispatch<UserType | null>;
  searchValue: string;
  setTimerCountDafault: (sec: boolean) => void;
  currentUser: SearchUserType | null;
  setCurrentUser: Dispatch<SearchUserType | null>;
};
type SearchResult = {
  items: SearchUserType[];
  total_count: number;
};

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export const Users: React.FC<PropsType> = ({
  searchValue,
  setUserInfo,
  setTimerCountDafault,
  currentUser,
  setCurrentUser,
}) => {
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(1);
  const [isPaginatorshown, setPaginatorshown] = useState<boolean>(false);
  const pervUser = usePrevious(currentUser);

  useEffect(() => {
    if (currentUser) {
      axios.get<UserType>(`https://api.github.com/users/${currentUser?.login}`).then((res) => {
        setUserInfo(res.data);

        setTimerCountDafault(true);
      });
      if (pervUser != currentUser) {
        setTimerCountDafault(false);
      }
      document.title = currentUser.login;
    }
  }, [currentUser]);

  useEffect(() => {
    axios
      .get<SearchResult>(
        `https://api.github.com/search/users?q=${searchValue}&page=${currentPage}&per_page=30`,
      )
      .then((res) => {
        setPaginatorshown(true);
        setUsers(res.data.items);
        setTotalUsers(res.data.total_count);
      });
  }, [searchValue, currentPage]);
  return (
    <>
      {totalUsers > 0 ? (
        <>
          {isPaginatorshown && (
            <Paginate
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalUsers={totalUsers}
            />
          )}
          <div className={style.row}>
            {users.map((u) => (
              <div className={style.card}>
                <img src={u.avatar_url} className={style.avatar} />
                <div className={style.name}>{u.login}</div>
                <a className={style.visitGit} href={u.html_url} target="_blank">
                  Visit GitHub
                </a>
                <p>
                  <button
                    className={u == currentUser ? style.selectedUser : style.button}
                    onClick={() => {
                      setCurrentUser(u);
                    }}>
                    More information
                  </button>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={style.noUsers}>
          <img style={{ padding: '20px', height: '25vh' }} src={CryGitIcon} />
          <div>No such user exists...</div>
        </div>
      )}
    </>
  );
};
