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
brad = User.create(username:"Brad", email: "brad@brad.com", password:"password")
brady = User.create(username:"Brady", email: "brady@brady.com", password:"password")
brosef = User.create(username:"Brosef", email: "brosef@brosef.com", password:"password")


Friendship.destroy_all

brian_matt = Friendship.create(user_id: brian.id, friend_id: matt.id)
brian_sam = Friendship.create(user_id: brian.id, friend_id: sam.id)
brian_drew = Friendship.create(user_id: brian.id, friend_id: drew.id)
brian_dega = Friendship.create(user_id: brian.id, friend_id: dega.id)
brian_tristan = Friendship.create(user_id: brian.id, friend_id: tristan.id)
brian_kyle = Friendship.create(user_id: brian.id, friend_id: kyle.id)
brian_brady = Friendship.create(user_id: brian.id, friend_id: brady.id)
brian_brad = Friendship.create(user_id: brian.id, friend_id: brad.id)
brian_brosef = Friendship.create(user_id: brian.id, friend_id: brosef.id)




Bill.destroy_all

# Brian and Matt
bill_one = Bill.create(author_id: brian.id, split: 2, amount:30, description:"Dinner", bill_date: '2016-12-01')

# Brian and Sam and Drew
bill_two = Bill.create(author_id: brian.id, split: 3, amount:30.00, description: "Lunch", bill_date: '2016-12-01')

# Matt and Sam and Drew
bill_three = Bill.create(author_id: matt.id, split: 3, amount:33.33, description: "Breakfast", bill_date: '2016-12-01')

# Matt and Brian and Sam and Drew
bill_four = Bill.create(author_id: matt.id, split: 4, amount:44.44, description: "Breakfast", bill_date: '2016-12-01')

# Brian and Matt and Sam PAID
bill_five = Bill.create(author_id: brian.id, paid: true, split: 3, amount:21.00, description: "Breakfast", bill_date: '2016-12-01')

# Matt and Brian and Sam PARTIAL-PAID
bill_six = Bill.create(author_id: matt.id, paid: false, split: 3, amount:30.00, description: "Breakfast", bill_date: '2016-12-01')

# Brian and Tristan
bill_seven = Bill.create(author_id: brian.id, paid: false, split: 2, amount: 44.44, description: "Breakfast", bill_date: '2016-12-01')

# Kyle and Brian
bill_eight = Bill.create(author_id: kyle.id, paid: false, split: 2, amount: 50.44, description: "Breakfast", bill_date: '2016-12-01')

# Dega and Brian
bill_nine = Bill.create(author_id: dega.id, paid: false, split: 2, amount: 60.44, description: "Breakfast", bill_date: '2016-12-01')

# Drew and Brian
bill_ten = Bill.create(author_id: drew.id, paid: false, split: 2, amount: 60.44, description: "Breakfast", bill_date: '2016-12-01')


Billsplit.destroy_all

# Brian and Matt
bs_1 = Billsplit.create(bill_id: bill_one.id, recipient_id: matt.id, split_amount: 15)

# Brian and Sam and Drew
bs_2 = Billsplit.create(bill_id: bill_two.id, recipient_id: sam.id, split_amount: 10)
bs_3 = Billsplit.create(bill_id: bill_two.id, recipient_id: drew.id, split_amount: 10)

# Matt and Sam and Drew
bs_4 = Billsplit.create(bill_id: bill_three.id, recipient_id: sam.id, split_amount: 11.11)
bs_5 = Billsplit.create(bill_id: bill_three.id, recipient_id: drew.id, split_amount: 11.11)

# Matt and Brian and Sam and Drew
bs_6 = Billsplit.create(bill_id: bill_four.id, recipient_id: brian.id, split_amount: 11.11)
bs_7 = Billsplit.create(bill_id: bill_four.id, recipient_id: sam.id, split_amount: 11.11)
bs_8 = Billsplit.create(bill_id: bill_four.id, recipient_id: drew.id, split_amount: 11.11)

# Brian and Matt and Sam PAID
bs_9 = Billsplit.create(bill_id: bill_five.id, recipient_paid: true, recipient_id: matt.id, split_amount: 7)
bs_10 = Billsplit.create(bill_id: bill_five.id, recipient_paid: true, recipient_id: sam.id, split_amount: 7)

# Matt and Brian and Sam PARTIAL-PAID
bs_11 = Billsplit.create(bill_id: bill_six.id, recipient_paid: true, recipient_id: matt.id, split_amount: 10)
bs_12 = Billsplit.create(bill_id: bill_six.id, recipient_paid: false, recipient_id: sam.id, split_amount: 10)

# Brian and Tristan
bs_13 = Billsplit.create(bill_id: bill_seven.id, recipient_paid: false, recipient_id: tristan.id, split_amount: 22.22)

# Kyle and Brian
bs_14 = Billsplit.create(bill_id: bill_eight.id, recipient_paid: false, recipient_id: brian.id, split_amount: 25.22)

# Dega and Brian
bs_15 = Billsplit.create(bill_id: bill_nine.id, recipient_paid: false, recipient_id: brian.id, split_amount: 30.22)

# Drew and Brian
bs_16 = Billsplit.create(bill_id: bill_ten.id, recipient_paid: false, recipient_id: brian.id, split_amount: 30.22)
