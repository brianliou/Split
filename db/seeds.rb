# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all

brian = User.create(username:"Brian", email: "brian@brian.com", password:"password")
matt = User.create(username:"Matt", email: "matt@matt.com", password:"password")
sam = User.create(username:"Sam", email: "sam@sam.com", password:"password")
drew = User.create(username:"Drew", email: "drew@drew.com", password:"password")
guy = User.create(username:"Guy", email: "guy@guy.com", password:"password")
tristan = User.create(username:"Tristan", email: "tristan@tristan.com", password:"password")
hunter = User.create(username:"Hunter", email: "hunter@hunter.com", password:"password")
andrew = User.create(username:"Andrew", email: "andrew@andrew.com", password:"password")
nick = User.create(username:"Nick", email: "nick@nick.com", password:"password")
kyle = User.create(username:"Kyle", email: "kyle@kyle.com", password:"password")
dega = User.create(username:"Dega", email: "dega@dega.com", password:"password")


Friendship.destroy_all

brian_matt = Friendship.create(user_id: brian.id, friend_id: matt.id)
brian_sam = Friendship.create(user_id: brian.id, friend_id: sam.id)
brian_drew = Friendship.create(user_id: brian.id, friend_id: drew.id)
brian_guy = Friendship.create(user_id: brian.id, friend_id: guy.id)


Bill.destroy_all

# Brian and Matt
bill_one = Bill.create(author_id: brian.id, split: 2, amount:30, description:"Dinner", bill_date: '2016-12-01')

# Brian and Sam and Drew
bill_two = Bill.create(author_id: brian.id, split: 3, amount:30.00, description: "Lunch", bill_date: '2016-12-01')

# Matt and Sam and Drew
bill_three = Bill.create(author_id: matt.id, split: 3, amount:33.33, description: "Breakfast", bill_date: '2016-12-01')

# Matt and Brian and Sam and Drew
bill_four = Bill.create(author_id: matt.id, split: 4, amount:44.44, description: "Breakfast", bill_date: '2016-12-01')


Billsplit.destroy_all

# Brian and Matt
billsplit_one = Billsplit.create(bill_id: bill_one.id, recipient_id: matt.id)

# Brian and Sam and Drew
billsplit_two = Billsplit.create(bill_id: bill_two.id, recipient_id: sam.id)
billsplit_three = Billsplit.create(bill_id: bill_two.id, recipient_id: drew.id)

# Matt and Sam and Drew
billsplit_four = Billsplit.create(bill_id: bill_three.id, recipient_id: sam.id)
billsplit_five = Billsplit.create(bill_id: bill_three.id, recipient_id: drew.id)

# Matt and Brian and Sam and Drew
billsplit_six = Billsplit.create(bill_id: bill_four.id, recipient_id: brian.id)
billsplit_seven = Billsplit.create(bill_id: bill_four.id, recipient_id: sam.id)
billsplit_eight = Billsplit.create(bill_id: bill_four.id, recipient_id: drew.id)
