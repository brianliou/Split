

export const getFriends = () => {
  debugger
  return $.ajax({
    url: '/api/users/showfriends',
    method: 'GET'
  });
};

export const addFriend = (user) => {
  return $.ajax({
    url: '/api/users/addfriend',
    method: 'POST',
    data: { user }
  });
};

export const removeFriend = (user) => {
  return $.ajax({
    url: '/api/friendships',
    method: 'DELETE',
    data: { user }
  });
};
