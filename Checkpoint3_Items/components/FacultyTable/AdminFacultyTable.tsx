import { Button, Card, Group, Menu, Modal, rem, Stack, Table, TableData, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconDotsVertical, IconFileDescription, IconFilePencil, IconFlame, IconMessageCircle, IconPlus, IconTrash, IconCoin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AdminFacultyModal from "./AdminFacultyModal";

// Renders the table of all faculty members that an admin sees
const AdminFacultyTable = () => {
    const [faculty, setFaculty] = useState<any[]>([]);

    // Gets all faculty data from the db
    async function fetchAllFaculty() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getFaculty', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            // console.log('Result received:', result.result);

            setFaculty(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchAllFaculty()
    }, [])

    // Renders a menu that allows an admin to fire people
    const FacultyMenu = ({ id, name }: { id: any, name: string }) => {
        async function handleFiring() {
            try {
                const response = await fetch('/api/db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        { queryType: 'fireFaculty', params: { facultykey: id } }
                    )
                });

                if (!response.ok) {
                    console.error('HTTP error!', response.status, response.statusText);
                    return;
                }
                fetchAllFaculty();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }

        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={handleFiring} leftSection={<IconCancel style={{ width: rem(14), height: rem(14) }} />} color="red">
                    Fire Employee
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
                <Text mb="0.5rem" fw="700" c="blue">Faculty</Text>
                <AdminFacultyModal refreshData={fetchAllFaculty} />
            </Group>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Faculty ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Email</Table.Td>
                        <Table.Td fw="700">Phone Num</Table.Td>
                        <Table.Td fw="700">Role</Table.Td>
                        <Table.Td fw="700">Salary</Table.Td>
                        <Table.Td fw="700">Date Hired</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {
                        faculty.map(
                            (item, index) => {
                                return <Table.Tr key={index}>
                                    <Table.Td>{item.f_facultykey}</Table.Td>
                                    <Table.Td>{item.p_firstname} {item.p_lastname}</Table.Td>
                                    <Table.Td>{item.p_email}</Table.Td>
                                    <Table.Td>{item.p_phonenum}</Table.Td>
                                    <Table.Td>{item.f_role}</Table.Td>
                                    <Table.Td>${item.f_salary}</Table.Td>
                                    <Table.Td>{item.f_hiredate}</Table.Td>
                                    <Table.Td>
                                        <FacultyMenu id={item.f_facultykey} name={`${item.p_firstname} ${item.p_lastname}`} />
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

export default AdminFacultyTable