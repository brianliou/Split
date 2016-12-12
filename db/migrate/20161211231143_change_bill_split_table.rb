class ChangeBillSplitTable < ActiveRecord::Migration
  def change
    add_column :billsplits, :split_amount, :float, null: false
  end
end
