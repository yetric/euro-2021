import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadTeamsAsync} from "store/slices/teamsSlice";

export const useLoadTeams = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTeamsAsync())
  }, [dispatch]);
};
