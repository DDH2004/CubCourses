-- Need at least 20 queries
-- Most of these queries currently have static values in where clauses but they will actually be variable later
-- 1. Student viewing all the classes they attend
select cs_classkey,
    cs_name,
    cs_subject,
    t_teacherkey,
    p_firstname teacher_first_name,
    p_lastname teacher_last_name
from classes
    join attends on cs_classkey = at_classkey
    join teachers on cs_teacherkey = t_teacherkey
    join persons on p_personkey = t_teacherkey
where at_studentkey = 2;
-- 2. Student enrolling in more classes
-- Student key has to exist, class key has to exist, grade starts out at 0
insert into attends (at_studentkey, at_classkey, at_grade)
values (2, 5, 0);
-- 3. Student submits homework
insert into doesHomework (d_homeworkkey, d_studentkey, d_grade)
values (1001, 5, 0);
-- 4. Student views their grade for a class
select cs_classkey,
    cs_name,
    at_grade
from classes
    join attends on cs_classkey = at_classkey
    join students on at_studentkey = s_studentkey
where s_studentkey = 10
    and cs_classkey = 21;
-- 5. Teacher grades homework
update doesHomework
set d_grade = 100
where d_studentkey = 1
    and d_homeworkkey = 14;
-- 6. People view all the clubs
select cb_name,
    count(j_studentkey) as member_count
from clubs
    join joins on cb_clubkey = j_clubkey
group by cb_clubkey;
-- 7. Student joins a club
insert into joins (j_studentkey, j_clubkey)
values (1, 4);
-- 8. Teacher sees all the students in each of their classes
select cs_name,
    s_studentkey,
    p_firstname,
    p_lastname,
    at_grade
from classes
    join attends on cs_classkey = at_classkey
    join students on s_studentkey = at_studentkey
    join persons on p_personkey = s_studentkey
where cs_teacherkey = 851;
-- 9. Teacher creates a homework assignment
insert into homework (
        h_homeworkkey,
        h_assigndate,
        h_duedate,
        h_description,
        h_classkey
    )
values (
        1000,
        Date(),
        '2024-12-15',
        'Some descriptions',
        5
    );
-- 10. Administrators view all students in all clubs
select cb_clubkey,
    cb_name,
    s_studentkey,
    p_firstname,
    p_lastname
from clubs
    join joins on cb_clubkey = j_clubkey
    join students on s_studentkey = j_studentkey
    join persons on s_studentkey = p_personkey;
-- 11. Teacher becomes an advisor to a club
update clubs
set cb_teacherkey = 905
where cb_clubkey = 2;
-- 12. Administrator views all information about all faculty, including bonuses
select f_facultykey,
    p_firstname,
    p_lastname,
    f_hiredate,
    f_role,
    f_salary,
    sum(b_amount) bonus_total
from faculty
    join bonuses on f_facultykey = b_facultykey
    join persons on p_personkey = f_facultykey
group by f_facultykey;
-- 13. Administrators grant bonuses to faculty
insert into bonuses (
        b_bonuskey,
        b_date,
        b_amount,
        b_reason,
        b_facultykey
    )
values (1, Date(), 10000, 'Reason', 905);
-- 14. Admins create a new student record
insert into students (s_studentkey, s_guardian, s_enrolldate)
values (1001, 'Guardian Name', '2024-11-01');
-- 15. Students view all homework assigned in a class
select h_homeworkkey,
    h_description,
    h_duedate
from homework
where h_classkey = 1;
-- 16. Administrators increase the salary of all administrators by a certain amount
update faculty
set f_salary = f_salary + 10000
where f_role = 'Administrator';
-- 17. Teachers get all students who have a D in their classes
select cs_classkey,
    cs_name,
    s_studentkey,
    p_firstname,
    p_lastname,
    at_grade
from classes
    join attends on cs_classkey = at_classkey
    join students on s_studentkey = at_studentkey
    join persons on p_personkey = s_studentkey
where at_grade < 70
    and cs_teacherkey = 905;
-- 18. Admin add a new faculty member
insert into faculty (f_facultykey, f_hiredate, f_role, f_salary)
values (1002, Date(), 'Teacher', 20000);
-- 19. Admin removes all students who are not attending any classes
delete from students
where s_studentkey not in (
        select at_studentkey
        from attends
    );
-- 20. Students modify the meeting time for clubs
update clubs
set cb_meetingtime = '15:30'
where cb_clubkey = 1;