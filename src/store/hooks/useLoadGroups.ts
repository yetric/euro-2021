import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadGroupsAsync} from 'store/slices/groupsSlice';

export const useLoadGroups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGroupsAsync())
  }, [dispatch]);
};
