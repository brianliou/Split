

export const getFriends = () => {
  return $.ajax({
    url: '/api/users/showFriends',
    method: 'GET'
  });
};

export const addFriend = (user) => {
  return $.ajax({
    url: '/api/users/addFriend',
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

export const searchFriends = (query) => {
  return $.ajax({
    url: "/api/users/searchFriends",
    method: "GET",
    data: { query }
  });
};
