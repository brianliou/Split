

export const getFriends = () => {
  return $.ajax({
    url: '/api/friends',
    method: 'GET'
  });
};

export const addFriend = (user) => {
  return $.ajax({
    url: '/api/friends',
    method: 'POST',
    data: { user }
  });
};

export const removeFriend = (user) => {
  return $.ajax({
    url: '/api/friends',
    method: 'DELETE',
    data: { user }
  });
};
