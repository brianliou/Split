# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161211231143) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bills", force: :cascade do |t|
    t.float    "amount",                      null: false
    t.string   "description",                 null: false
    t.date     "bill_date",                   null: false
    t.integer  "author_id",                   null: false
    t.integer  "split",                       null: false
    t.boolean  "paid",        default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bills", ["author_id"], name: "index_bills_on_author_id", using: :btree

  create_table "billsplits", force: :cascade do |t|
    t.integer  "bill_id",                        null: false
    t.integer  "recipient_id",                   null: false
    t.boolean  "recipient_paid", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "split_amount",                   null: false
  end

  add_index "billsplits", ["bill_id"], name: "index_billsplits_on_bill_id", using: :btree
  add_index "billsplits", ["recipient_id"], name: "index_billsplits_on_recipient_id", using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
