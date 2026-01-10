import { useState } from 'react';
import { DEADLOCK_HEROES, user_list } from '../data/heroes';

const useInputManagement = () => {
  const [userListText, setUserListText] = useState(user_list.trim());
  const [heroListText, setHeroListText] = useState(DEADLOCK_HEROES.map(h => h.name).join(', '));
  const [roleListText, setRoleListText] = useState("Core\nSupport");

  const parseList = (text) => {
    return text.split(/[\n,]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  const prefillHeroes = () => {
    setHeroListText(DEADLOCK_HEROES.map(h => h.name).join(', '));
  };

  const prefillRoles = () => {
    setRoleListText("Core\nSupport");
  };

  return {
    userListText,
    setUserListText,
    heroListText,
    setHeroListText,
    roleListText,
    setRoleListText,
    parseList,
    prefillHeroes,
    prefillRoles
  };
};

export default useInputManagement;
