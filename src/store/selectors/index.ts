import { createSelector } from "reselect";
import { groupsStateSelector } from "store/slices/groupsSlice";
import { teamsStateSelector } from "store/slices/teamsSlice";

export const getAllGroupsSelector = createSelector(
    [groupsStateSelector, teamsStateSelector],
    (groupState, teamState) => {
        return groupState.groups.map((group) => ({
            id: group.id,
            teams: teamState.teams.filter((team) => group.teamsIds.includes(team.teamID))
        }));
    }
);

export const getGroupByIDSelector = (id: string) =>
    createSelector([getAllGroupsSelector], (groups) => {
        return groups.find((group) => id === group.id);
    });
