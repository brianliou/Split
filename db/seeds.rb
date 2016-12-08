# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all

brian = User.create(username:"Brian", email: "brian@brian.com", password:"password")
nick = User.create(username:"Nick", email: "nick@nick.com", password:"password")
matt = User.create(username:"Matt", email: "matt@matt.com", password:"password")
kyle = User.create(username:"Kyle", email: "kyle@kyle.com", password:"password")
dega = User.create(username:"Dega", email: "dega@dega.com", password:"password")
sam = User.create(username:"Sam", email: "sam@sam.com", password:"password")
drew = User.create(username:"Drew", email: "drew@drew.com", password:"password")
guy = User.create(username:"Guy", email: "guy@guy.com", password:"password")

Friendship.destroy_all
