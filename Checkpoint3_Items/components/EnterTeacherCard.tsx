import { Card, Group, Select, Button, Text } from "@mantine/core";
import { IconClipboard } from "@tabler/icons-react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

// This card renders a list of teachers from the db and lets you pick one of them and see their view
const EnterTeacherCard = () => {
    const [teachers, setTeachers] = useState<any[]>([])
    const [teacherKey, setTeacherKey] = useState<string>('851')

    const router = useRouter()

    async function fetchTeachers() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getTeachers', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            //   console.log('Result received:', result.result);

            setTeachers(result.result);
            setTeacherKey(result.result[0].t_teacherkey + "")
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    return <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" >
        <Group justify='center' m="0 0 0 -1.5rem">
            <IconClipboard size={32} />
            <Text style={{ fontSize: 26, fontWeight: 500 }}>Teacher</Text>
        </Group>
        <Group mt="1rem">
            <Select searchable data={teachers.map(
                (item) => {
                    const output = {
                        value: item.t_teacherkey + "",
                        label: item.t_teacherkey + '. ' + item.p_firstname + ' ' + item.p_lastname
                    }
                    return output;
                }
            )} value={teacherKey} onChange={(val) => setTeacherKey(val || "1")} />
            <Button onClick={() => router.push('/teacher/' + teacherKey)}>Go</Button>
        </Group>

    </Card>

}

export default EnterTeacherCard