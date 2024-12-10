import { Button, Card, Group, Menu, Modal, rem, Stack, Table, TableData, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconDotsVertical, IconFileDescription, IconFilePencil, IconFlame, IconMessageCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AdminStudentModal from "./AdminStudentModal";

const AdminStudentTable = () => {
    const [student, setStudent] = useState<any[]>([]);


    async function fetchAllStudents() {
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
            // console.log('Result received:', result.result);

            setStudent(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }


    useEffect(() => {
        fetchAllStudents()
    }, [])

    const StudentMenu = ({ id, name }: { id: any, name: string }) => {
        async function handleExpulsion() {
            try {
                const response = await fetch('/api/db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        { queryType: 'expelStudent', params: { studentkey: id } }
                    )
                });

                if (!response.ok) {
                    console.error('HTTP error!', response.status, response.statusText);
                    return;
                }
                fetchAllStudents();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={handleExpulsion} leftSection={<IconCancel style={{ width: rem(14), height: rem(14) }} />} color="red">
                    Expel Student
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    return <Card radius={10} mah="30rem" m="1rem 0">

        <Table.ScrollContainer minWidth={1000} type="native">
            <Group justify='space-between'>
                <Text mb="0.5rem" fw="700" c="blue">Students</Text>
                <AdminStudentModal refreshData={fetchAllStudents} />
            </Group>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Student ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Email</Table.Td>
                        <Table.Td fw="700">Phone Num</Table.Td>
                        <Table.Td fw="700">Guardian</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {
                        student.map(
                            (item, index) => {
                                return <Table.Tr key={index}>
                                    <Table.Td>{item.s_studentkey}</Table.Td>
                                    <Table.Td>{item.p_firstname} {item.p_lastname}</Table.Td>
                                    <Table.Td>{item.p_email}</Table.Td>
                                    <Table.Td>{item.p_phonenum}</Table.Td>
                                    <Table.Td>{item.s_guardian}</Table.Td>
                                    <Table.Td>
                                        <StudentMenu id={item.s_studentkey} name={`${item.p_firstname} ${item.p_lastname}`} />
                                    </Table.Td>
                                </Table.Tr>
                            }
                        )
                    }
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default AdminStudentTable