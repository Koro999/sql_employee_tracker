INSERT INTO department (id, debt_name)
VALUES (001, "Sales"),
       (002, "Human Resources"),
       (003, "Marketing"),
       (004, "Quality Assurance"),
       (005, "Research & Development");
       
INSERT INTO roles (id, department_id , title, salary)
VALUES (001, 001, 'Salesman', 33000),
       (002, 002, 'HR', 34000),
       (003, 003, 'Marketing', 36000),
       (004, 004, 'QA', 39000),
       (005, 005, 'R&D', 42000);
       
INSERT INTO employees (id,manager_id,first_name,last_name,role_id)
VALUES (001, 002, "Chris", "Dang", 001),
       (002, NULL, "Jorkwin", "Rodriquez", 001),
       (003, NULL, "Andy", "Dang", 001),
       (004, 001, "Yoshi","P", 002),
       (005, NULL, "Kinnison", "Krow", 002),
       (006, NULL, "James", "Harden", 002),
       (007, NULL, "Ashura", "DSR", 002),
       (008, NULL, "Cloud", "Strife", 002),
       (009, 003, "Jote","Bestgirl", 003),
       (011, NULL, "Ex", "Plosion", 003),
       (012, 004, "Greased", "Lightning", 004),
       (013, NULL, "Tornado", "Kick", 004),
       (014, 005, "Brother", "Hood", 005),
       (015, NULL, "Elden", "Ring", 005);