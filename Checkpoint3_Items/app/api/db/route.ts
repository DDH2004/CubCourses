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
          db.all('SELECT * FROM classes join persons on p_personkey = cs_teacherkey join attends on at_classkey = cs_classkey join students on s_studentkey = at_studentkey where s_studentkey = ?', 
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
