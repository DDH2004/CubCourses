import { Card, Group, Select, Button, Text } from "@mantine/core";
import { IconCrown } from "@tabler/icons-react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

const EnterAdminCard = () => {
    const [admin, setAdmin] = useState<any[]>([])
    const [adminKey, setAdminKey] = useState<string>('991')

    const router = useRouter()

    async function fetchAdmin() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getAdmin', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            //   console.log('Result received:', result.result);

            setAdmin(result.result);
            setAdminKey(result.result[0].am_personkey + "")
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchAdmin();
    }, []);

    return <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" >
        <Group justify='center' m="0 0 0 -1.5rem">
            <IconCrown size={32} />
            <Text style={{ fontSize: 26, fontWeight: 500 }}>Administrator</Text>
        </Group>
        <Group mt="1rem">
            <Select searchable data={admin.map(
                (item) => {
                    const output = {
                        value: item.am_personkey + "",
                        label: item.am_personkey + '. ' + item.p_firstname + ' ' + item.p_lastname
                    }
                    return output;
                }
            )} value={adminKey} onChange={(val) => setAdminKey(val || "1")} />
            <Button onClick={() => router.push('/admin/' + adminKey)}>Go</Button>
        </Group>

    </Card>

}

export default EnterAdminCard