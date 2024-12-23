import { NextResponse } from 'next/server';
import { getDatabaseConnection } from '@/utils/db';

interface QueryRequestBody {
  queryType: string;
  params?: Record<string, any>;
}

/**
 * This is the API endpoint that handles all queries. Basically, every single case here is just another query.
 * The frontend will post requests to this route and get responses.
 * The names of the query cases, such as 'getStudents' are mostly self-explanatory in their purpose.
 * And also you can simply read the SQL statements in quotes to see what they do. It's very straightforward.
 */
export async function POST(request: Request) {
  const db = getDatabaseConnection();

  try {
    const body: QueryRequestBody = await request.json();
    const { queryType, params } = body;

    let result: any;

    switch (queryType) {
      case 'getStudents': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM students join persons on s_studentkey = p_personkey', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        break;
      }

      case 'getClasses': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM classes join persons on p_personkey = cs_teacherkey',
            [], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getMyClassesById': {
        if (!params?.id) {
          return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM classes join persons on p_personkey = cs_teacherkey join attendsClass on at_classkey = cs_classkey join students on s_studentkey = at_studentkey where s_studentkey = ?',
            [params.id], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getTeachers': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM teachers join persons on t_teacherkey = p_personkey',
            [], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getAdmin': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM admin join persons on am_personkey = p_personkey',
            [], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getStudentById': {
        if (!params?.id) {
          return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.get('SELECT * FROM students WHERE s_studentkey = ?', [params.id], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'registerClass': {
        if (!params?.studentId || !params?.classId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.get('insert into attendsClass (at_studentkey, at_classkey, at_grade) values (?, ?, 0);', [params.studentId, params.classId], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'removeClass': {
        if (!params?.studentId || !params?.classId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.get('delete from attendsClass where at_studentkey = ? and at_classkey = ?;', [params.studentId, params.classId], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'getClubs': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM clubs join persons on p_personkey = cb_teacherkey',
            [], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getMyClubsById': {
        if (!params?.id) {
          return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM clubs join persons on p_personkey = cb_teacherkey join joinsClub on j_clubkey = cb_clubkey join students on j_studentkey = s_studentkey where s_studentkey = ?;',
            [params.id], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'leaveClubById': {
        if (!params?.studentId || !params?.clubId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('delete from joinsClub where j_studentkey = ? and j_clubkey = ?;',
            [params.studentId, params.clubId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'joinClubById': {
        if (!params?.studentId || !params?.clubId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('insert into joinsClub values (?, ?);',
            [params.studentId, params.clubId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getAssignments': {
        if (!params?.classId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('select * from homework where h_classkey = ?;',
            [params.classId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getAssignmentsById': {
        if (!params?.classId || !params?.studentId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('select * from homework join doesHomework on h_homeworkkey = d_homeworkkey where h_classkey = ? and d_studentkey = ?;',
            [params.classId, params.studentId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'submitAssignment': {
        if (!params?.assignmentId || !params?.studentId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('insert into doesHomework values (?, ?, 0);',
            [params.assignmentId, params.studentId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getGradeById': {
        if (!params?.classId || !params?.studentId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('select * from attendsClass where at_classkey = ? and at_studentkey = ?;',
            [params.classId, params.studentId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'getTaughtStudents': {
        if (!params?.teacherId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('SELECT * FROM students join persons on s_studentkey = p_personkey join attendsClass on at_studentkey = s_studentkey join classes on at_classkey = cs_classkey where cs_teacherkey = ?;', [params.teacherId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        break;
      }

      case 'updateStudentGradeById': {
        if (!params?.studentId || !params?.classId || !params?.grade) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('update attendsClass set at_grade = ? where at_studentkey = ? and at_classkey = ?;', [params.grade, params.studentId, params.classId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        break;
      }

      case 'getSubmittedAssignmentsByClass': {
        if (!params?.classId) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('select * from homework join doesHomework on h_homeworkkey = d_homeworkkey join students on s_studentkey = d_studentkey join persons on s_studentkey = p_personkey where h_classkey = ?;',
            [params.classId], (err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
        });
        break;
      }

      case 'updateAssignmentGrade': {
        if (!params?.studentId || !params?.assignId || !params?.grade) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('update doesHomework set d_grade = ? where d_studentkey = ? and d_homeworkkey = ?;', [params.grade, params.studentId, params.assignId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        break;
      }

      case 'addStudent': {
        if (!params?.studentkey || !params?.guardian || !params?.enrolldate) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all('insert into students (s_studentkey, s_guardian, s_enrolldate) values (?, ?, ?);', 
            [params.studentkey, params.guardian, params.enrolldate], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'expelStudent': {
        if (!params?.studentkey) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all('delete from students where s_studentkey = ?;', 
            [params.studentkey], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }     
      
      case 'getFaculty': {
        result = await new Promise<any>((resolve, reject) => {
          db.all('select * from faculty join persons on p_personkey = f_facultykey;', 
            [], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }     

      case 'fireFaculty': {
        if (!params?.facultykey) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all('DELETE FROM faculty WHERE f_facultykey = ?;', 
            [params.facultykey], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'createPerson': {
        if (!params?.firstName || !params?.lastName || !params?.phoneNum || !params?.email || !params?.address || !params?.gender || !params?.dob) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all('insert into persons values ((select max(p_personkey) + 1 from persons), ?, ?, ?, ?, ?, ?, ?);', 
            [params.firstName, params.lastName, params.phoneNum, params.email, params.address, params.gender, params.dob], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      // Okay, I know this is stupid, but I don't know how to get the ID after I insert a person into the db
      case 'createStudent': {
        if (!params?.firstName || !params?.lastName || !params?.phoneNum || !params?.email || !params?.address || !params?.guardian || !params?.enrollDate) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all('insert into students values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?);', 
            [params.firstName, params.lastName, params.phoneNum, params.email, params.address, params.guardian, params.enrollDate], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'createFaculty': {
        if (!params?.firstName || !params?.lastName || !params?.phoneNum || !params?.email || !params?.address || !params?.hireDate || !params?.salary || !params?.role) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.all("insert into faculty values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, ?);", 
            [
              params.firstName, params.lastName, params.phoneNum, params.email, params.address, params.hireDate, params.role, params.salary,
            ], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'createTeacher': {
        if (!params?.firstName || !params?.lastName || !params?.phoneNum || !params?.email || !params?.address || !params?.subject || !params?.tenure || !params?.office) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }

        result = await new Promise<any>((resolve, reject) => {
          db.all("insert into teachers values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, ?);", 
            [
              params.firstName, params.lastName, params.phoneNum, params.email, params.address, params.subject, params.tenure ? 'Yes' : 'No', params.office
            ], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'createAdmin': {
        if (!params?.firstName || !params?.lastName || !params?.phoneNum || !params?.email || !params?.address || !params?.position || !params?.dept) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }

        result = await new Promise<any>((resolve, reject) => {
          db.all("insert into admin values ((select p_personkey from persons where p_firstname = ? and p_lastname = ? and p_phoneNum = ? and p_email = ? and p_address = ?), ?, ?, 0);", 
            [
              params.firstName, params.lastName, params.phoneNum, params.email, params.address, params.position, params.dept
            ], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'createAssignment': {
        if (!params?.dueDate || !params?.assignDate || !params?.description || !params?.classId) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }

        result = await new Promise<any>((resolve, reject) => {
          db.all("insert into homework values ((select max(h_homeworkkey) + 1 from homework), ?, ?, ?, ?);", 
            [
              params.assignDate, params.dueDate, params.description, params.classId
            ], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      case 'removeAssignment': {
        if (!params?.assignId) {
          return NextResponse.json({ error: 'Missing parameter(s)' }, { status: 400 });
        }

        result = await new Promise<any>((resolve, reject) => {
          db.all("delete from homework where h_homeworkkey = ?;", 
            [
              params.assignId
            ], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }
      
      case 'getBonuses': {
        result = await new Promise<any[]>((resolve, reject) => {
          db.all('select * from bonuses join faculty on f_facultykey = b_facultykey join persons on f_facultykey = p_personkey;', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        break;
      }

      case 'grantBonus': {
        if (!params?.amount || !params?.reason || !params?.facultyId || !params?.grantDate) {
          return NextResponse.json({ error: 'Missing id parameter(s)' }, { status: 400 });
        }
        result = await new Promise<any>((resolve, reject) => {
          db.get('insert into bonuses values ((select max(b_bonuskey) + 1 from bonuses), ?, ?, ?, ?);', [params.grantDate, params.amount, params.reason, params.facultyId], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        break;
      }

      default: {
        return NextResponse.json(
          { error: `Invalid query type: ${queryType}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('API error:', error.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    db.close();
  }
}
