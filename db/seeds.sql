INSERT INTO department (id, debt_name)
VALUES (001, "Sales"),
       (002, "Human Resources"),
       (003, "Marketing"),
       (004, "Quality Assurance"),
       (005, "Management & Production");
       
INSERT INTO roles (id, department_id , title, salary, )
VALUES (001, 001, 'employee', 33000),
       (002, 002, 'employee', 34000),
       (003, 003, 'employee', 36000),
       (004, 004, 'employee', 39000),
       (005, 005, 'employee', 42000);
       
INSERT INTO employee (id,manager_id,first_name,last_name,role_id)
VALUES (001, NULL, "Chris", "Dang", 001),
       (002, NULL, "Jorkwin", "Rodriquez", 002),
       (003, NULL, "Andy", "Dang", 003),
       (004, 001, "Yoshi","P", 004),
       (005, NULL, "David", "SadBoy", 005);