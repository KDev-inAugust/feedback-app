# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.all.delete_all
Project.all.delete_all


u1=User.create(name: "Kane_Test", password: "KaneTestKane_4202")
u2=User.create(name: "Guest_Test", password: "GuestTestGuest_4202")

# p1=Project.create(name: "Project One", user_id: 1)
# p2=Project.create(name: "Project Two", user_id: 1)
# p3=Project.create(name: "Project Three", user_id: 2)
# p4=Project.create(name: "Project Four", user_id: 2)
# p5=Project.create(name: "Project Five", user_id: 3)
# p6=Project.create(name: "Project Six", user_id: 3)

# cp=ClientProject.create(user_id: 1, project_id: 3)
# cp=ClientProject.create(user_id: 1, project_id: 4)
# cp=ClientProject.create(user_id: 2, project_id: 5)
# cp=ClientProject.create(user_id: 2, project_id: 6)
# cp=ClientProject.create(user_id: 3, project_id: 1)
# cp=ClientProject.create(user_id: 3, project_id: 2)




