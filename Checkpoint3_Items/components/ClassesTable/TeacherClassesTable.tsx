import { Button, Card, Menu, rem, Table, TableData, Text } from "@mantine/core"
import { IconDotsVertical, IconFilePencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TeacherClassesTable = ({ teacherID }: { teacherID: any }) => {
    const [classes, setClasses] = useState<any[]>([]);
    const router = useRouter()

    async function fetchAllClasses() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getClasses', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            // console.log('Result received:', result.result);

            setClasses(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const RegisteredClassMenu = ({ classId, name }: { classId: string, name: string }) => {
        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={() => router.push(`/student/${teacherID}/assignments/${classId}`)} leftSection={<IconFilePencil style={{ width: rem(14), height: rem(14) }} />}>
                    View Assignments
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    useEffect(() => {
        fetchAllClasses();
    }, []);

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={500} type="native">
            <Text mb="0.5rem" fw="700" c="blue">Teaching Classes</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Class ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Teacher</Table.Td>
                        <Table.Td fw="700">Subject</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {classes.map((item, index) =>
                        item.cs_teacherkey == teacherID ? <Table.Tr key={index}>
                            <Table.Td>{item.cs_classkey}</Table.Td>
                            <Table.Td>{item.cs_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>{item.cs_subject}</Table.Td>
                            <Table.Td>
                                <RegisteredClassMenu classId={item.cs_classkey} name={item.cs_name} />
                            </Table.Td>
                        </Table.Tr> : undefined
                    )}
                </Table.Tbody>
            </Table>

            <Text mb="0.5rem" mt="1rem" fw="700" c="blue">Classes</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Class ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Teacher</Table.Td>
                        <Table.Td fw="700">Subject</Table.Td>

                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {classes.map((item, index) =>
                        item.cs_teacherkey == teacherID ? undefined :
                            <Table.Tr key={index}>
                                <Table.Td>{item.cs_classkey}</Table.Td>
                                <Table.Td>{item.cs_name}</Table.Td>
                                <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                                <Table.Td>{item.cs_subject}</Table.Td>

                            </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default TeacherClassesTable