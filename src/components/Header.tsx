import React, { Dispatch, useState } from 'react';
import s from '../App.module.css';

type PropsType = {
  setSearchValue: (tempSearch: string) => void;
  setFirstView: Dispatch<boolean>;
  firstView: boolean;
};
export const Header: React.FC<PropsType> = ({ setSearchValue, setFirstView, firstView }) => {
  const [tempSearch, setTempSearch] = useState<string>('');
  const findUser = () => {
    if (tempSearch != '') {
      setSearchValue(tempSearch);
      console.log('findUser');
    }
    setFirstView(false);
  };
  return (
    <div className={firstView ? s.FirstsearchLine : s.searchLine}>
      <div className={firstView ? s.Firstsearch : s.search}>
        <input
          type="text"
          placeholder="search"
          value={tempSearch}
          onChange={(e) => {
            setTempSearch(e.currentTarget.value);
          }}
        />
        <button onClick={findUser}>Find</button>
      </div>
    </div>
  );
};
