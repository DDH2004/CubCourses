import { Card, Group, Select, Button, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

const EnterStudentCard = () => {
    const [students, setStudents] = useState<any[]>([])
    const [studentKey, setStudentKey] = useState<string>('1')

    const router = useRouter()

    async function fetchStudents() {
    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { queryType: 'getStudents', params: {} }
        )
      });

      if (!response.ok) {
        console.error('HTTP error!', response.status, response.statusText);
        return;
      }

      const result = await response.json();
    //   console.log('Result received:', result.result);

      setStudents(result.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  useEffect(() => {
      fetchStudents();
  }, []);

  return <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" >
          <Group justify='center' m="0 0 0 -1.5rem">
            <IconUser size={32}/>
            <Text style={{fontSize: 26, fontWeight: 500}}>Student</Text>
          </Group>
          <Group mt="1rem">
              <Select searchable data={students.map(
                (item) => {
                    const output = {
                        value: item.s_studentkey + "",
                        label: item.s_studentkey + '. ' + item.p_firstname + ' ' + item.p_lastname
                    }
                    return output;
                }
              )} value={studentKey} onChange={(val) => setStudentKey(val || "1")}/>
            <Button onClick={() => router.push('/student/' + studentKey)}>Go</Button>
          </Group>
          
        </Card>

}

export default EnterStudentCard