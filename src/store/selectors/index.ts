import { createSelector } from "reselect";
import { groupsStateSelector } from "store/slices/groupsSlice";

export const getGroupByIDSelector = (id: string) =>
    createSelector([groupsStateSelector], (groupsState) => {
        return groupsState.groups.find((group) => id === group.id);
    });
