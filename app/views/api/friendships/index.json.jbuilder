json.array! @friends do |friend|
  json.id friend.id
  json.username friend.username
  json.email friend.email
end
