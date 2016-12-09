class ChangebillsTable < ActiveRecord::Migration
  def change
    add_column :bills, :author_id, :integer, null: false
    remove_column :billsplits, :author_id
  end
end
