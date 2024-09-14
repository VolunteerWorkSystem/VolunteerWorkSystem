export const filterIdsToJoin = (previousIds: number[], newIds: number[]) => {
  return newIds.filter((id) => !previousIds.includes(id));
};
export const filterIdsToLeave = (previousIds: number[], newIds: number[]) => {
  return previousIds.filter((id) => !newIds.includes(id));
};

export function compareIds(
  previousIds: number[],
  newIds: number[],
): {
  idsToJoin: number[];
  idsToLeave: number[];
} {
  return {
    idsToJoin: filterIdsToJoin(previousIds, newIds),
    idsToLeave: filterIdsToLeave(previousIds, newIds),
  };
}
