INSERT INTO department (id, debt_name)
VALUES (001, "Sales"),
       (002, "Human Resources"),
       (003, "Marketing"),
       (004, "Quality Assurance"),
       (005, "Research & Development");
       
INSERT INTO roles (id, department_id, title, salary)
VALUES (001, 001, "Sales Team", 56000),
       (002, 002, "HR Representative", 54000),
       (003, 003, "Marketing Team", 58000),
       (004, 004, "Quality Assurance Tester", 57000),
       (005, 005, "Researcher", 60000);
       
INSERT INTO employees (id,first_name,last_name,role_id,manager_id)
VALUES (001, "Chris", "Dang", 001, NULL),
       (002, "Jorkwin", "Rodriquez", 001, 001),
       (003, "Andy", "Dang", 001, 001),
       (004, "Kinnison", "Krow", 002, NULL),
       (005, "Ashura", "DSR", 003, NULL),
       (006, "Joshua", "Rosfield", 004, NULL),
       (007, "Jote", "Rosfield", 005, NULL);