class CreateBillsTable < ActiveRecord::Migration

  def change
    create_table :bills do |t|
      t.float :amount, null: false
      t.string :description, null: false
      t.date :bill_date, null: false
      t.integer :author_id, null:false
      t.integer :split, null: false
      t.boolean :paid, default: false

      t.timestamps
    end

    create_table :billsplits do |t|
      t.integer :bill_id, null: false
      t.integer :recipient_id, null: false
      t.boolean :recipient_paid, default: false

      t.timestamps
    end

    add_index :billsplits, :bill_id
    add_index :bills, :author_id
    add_index :billsplits, :recipient_id

  end

end
