class AddShopAccessScopesColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :shops, :access_scopes, :string, default: "", null: false
  end
end
