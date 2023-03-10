# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

u1=User.create(name: "User 1", password_digest: "passowrd1")
u2=User.create(name: "User 2", password_digest: "passowrd2")
u3=User.create(name: "User 3", password_digest: "passowrd3")

p1=Project.create(name: "Project One", user_id: 1)
p2=Project.create(name: "Project Two", user_id: 2)
p3=Project.create(name: "Project Three", user_id: 3)