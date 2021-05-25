import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { loadVenuesAsync } from "store/slices/venuesSlice";

export const useLoadVenues = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadVenuesAsync())
  }, [dispatch]);
};
