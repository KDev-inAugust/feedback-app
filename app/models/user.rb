class User < ApplicationRecord
    validates :name, presence: true
    has_secure_password
    has_many :projects
    has_many :client_projects
end
