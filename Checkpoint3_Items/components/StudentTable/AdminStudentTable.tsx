import { Button, Card, Group, Menu, Modal, rem, Stack, Table, TableData, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconDotsVertical, IconFileDescription, IconFilePencil, IconFlame, IconMessageCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AdminStudentModal from "./AdminStudentModal";

const AdminStudentTable = () => {
    const [student, setStudent] = useState<any[]>([]);
    const [opened, { open, close }] = useDisclosure(false);


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

    const handleStudentAddition = async() => {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'addStudent', params: { studentID: studentID, guardian: guardian, enrolldate: enrolldate } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return <Card radius={10} mah="30rem">

        <Modal opened={opened} onClose={close} withCloseButton={false} title="Accept Student">
            <AdminStudentModal />
            <Group justify="right">
                <Button onClick={handleStudentAddition}>
                    Confirm
                </Button>
            </Group>
        </Modal>

        <Table.ScrollContainer minWidth={1000} type="native">
            <Group justify='space-between'>
                <Text mb="0.5rem" fw="700" c="blue">Students</Text>
                <Button variant="light" m="0.5rem" onClick={open}>Accept Student</Button>
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