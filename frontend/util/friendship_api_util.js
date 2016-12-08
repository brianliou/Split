

export const getFriends = () => {
  return $.ajax({
    url: '/api/friendships',
    method: 'GET'
  });
};

export const addFriend = (user) => {
  return $.ajax({
    url: '/api/friendships',
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
