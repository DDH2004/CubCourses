-- 1
SELECT * FROM students join persons on s_studentkey = p_personkey
-- 2
SELECT * FROM classes join persons on p_personkey = cs_teacherkey
-- 3
SELECT * FROM classes join persons on p_personkey = cs_teacherkey join attendsClass on at_classkey = cs_classkey join students on s_studentkey = at_studentkey where s_studentkey = ?
-- 4
SELECT * FROM teachers join persons on t_teacherkey = p_personkey
-- 5
SELECT * FROM admin join persons on am_personkey = p_personkey
-- 6
SELECT * FROM students WHERE s_studentkey = ?
-- 7
insert into attendsClass (at_studentkey, at_classkey, at_grade) values (?, ?, 0);
-- 8
delete from attendsClass where at_studentkey = ? and at_classkey = ?;
-- 9
SELECT * FROM clubs join persons on p_personkey = cb_teacherkey
-- 10
SELECT * FROM clubs join persons on p_personkey = cb_teacherkey join joinsClub on j_clubkey = cb_clubkey join students on j_studentkey = s_studentkey where s_studentkey = ?;
-- 11
delete from joinsClub where j_studentkey = ? and j_clubkey = ?;
-- 12
insert into joinsClub values (?, ?);
-- 13
select * from homework where h_classkey = ?;
-- 14
select * from homework join doesHomework on h_homeworkkey = d_homeworkkey where h_classkey = ? and d_studentkey = ?;
-- 15
insert into doesHomework values (?, ?, 0);
-- 16
select * from attendsClass where at_classkey = ? and at_studentkey = ?;
-- 17
SELECT * FROM students join persons on s_studentkey = p_personkey join attendsClass on at_studentkey = s_studentkey join classes on at_classkey = cs_classkey where cs_teacherkey = ?;
-- 18
update attendsClass set at_grade = ? where at_studentkey = ? and at_classkey = ?;
-- 19
select * from homework join doesHomework on h_homeworkkey = d_homeworkkey join students on s_studentkey = d_studentkey join persons on s_studentkey = p_personkey where h_classkey = ?;
-- 20
update doesHomework set d_grade = ? where d_studentkey = ? and d_homeworkkey = ?;
-- 21
insert into students (s_studentkey, s_guardian, s_enrolldate) values (?, ?, ?);
-- 22
delete from students where s_studentkey = ?;
-- 23
select * from faculty join persons on p_personkey = f_facultykey;
-- 24
DELETE FROM faculty WHERE f_facultykey = ?;
-- 25
insert into persons values ((select max(p_personkey) + 1 from persons), ?, ?, ?, ?, ?, ?, ?);
-- 26
insert into students values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?);
-- 27
insert into faculty values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, ?);
-- 28
insert into teachers values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, ?);
-- 29
insert into admin values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, 0);
-- 30
insert into homework values ((select max(h_homeworkkey) + 1 from homework), ?, ?, ?, ?);
-- 31
delete from homework where h_homeworkkey = ?;
-- 32
select * from bonuses join faculty on f_facultykey = b_facultykey join persons on f_facultykey = p_personkey;
-- 33
insert into bonuses values ((select max(b_bonuskey) + 1 from bonuses), ?, ?, ?, ?);
