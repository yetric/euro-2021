import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { loadMatchesAsync } from "store/slices/matchesSlice";

export const useLoadMatches = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMatchesAsync())
  }, [dispatch]);
};
