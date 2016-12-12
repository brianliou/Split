import { values } from 'lodash';

export const selectAllFriends = (friends) => {
  return (
    values(friends)
  );
};
