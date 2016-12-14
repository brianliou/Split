import { values } from 'lodash';

export const selectAllFriends = (friends) => {
  return (
    values(friends)
  );
};

export const selectAllBills = (bills) => {
  return (
    values(bills)
  );
};
