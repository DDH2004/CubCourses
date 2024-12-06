import { NextResponse } from 'next/server';
import { getDatabaseConnection } from '@/utils/db';

interface QueryRequestBody {
  queryType: string;
  params?: Record<string, any>;
}

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

      // case 'createUser': {
      //   if (!params?.name || !params?.email) {
      //     return NextResponse.json(
      //       { error: 'Missing name or email parameter' },
      //       { status: 400 }
      //     );
      //   }
      //   result = await new Promise<any>((resolve, reject) => {
      //     db.run(
      //       'INSERT INTO users (name, email) VALUES (?, ?)',
      //       [params.name, params.email],
      //       function (err) {
      //         if (err) reject(err);
      //         resolve({ id: this.lastID }); // Return the inserted row ID
      //       }
      //     );
      //   });
      //   break;
      // }

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
