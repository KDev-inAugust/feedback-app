class User < ApplicationRecord
    validates :name, presence: true
    has_secure_password
    has_many :projects
end
