INSERT INTO department (name)
VALUES  ("Sales"),
        ("Finance"),
        ("Customer Service"),
        ("Software Engineer");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 65000, 1),
        ("Sales Lead", 90000, 1),
        ("Accountant", 50000, 2),
        ("Account Manager", 65000, 2),
        ("Customer Service Representative", 50000, 3),
        ("Customer Service Manager", 70000, 3),
        ("Devoloper", 70000, 4),
        ("Lead Devoloper", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Billy", "Bob", 1, 3),
        ("Joe", "Smith", 1, 3),
        ("Sally", "Scheatz", 2, null),
        ("Kunal", "Pratel", 3, 5),
        ("Matt", "Babalon", 4, null),
        ("Katy", "Jones", 5, 7),
        ("Howard", "Stern", 6, null),
        ("Carlos", "Rodriguz", 7, 10),
        ("Sam", "Roberto", 7, 10),
        ("Alejandra", "Perez", 8, null);
