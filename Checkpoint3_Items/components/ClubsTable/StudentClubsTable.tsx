import { Card, Menu, rem, Table, Text } from "@mantine/core";
import { IconFilePencil, IconFileDescription, IconTrash, IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const StudentClubsTable = ({ studentID }: { studentID: any }) => {
    const [clubs, setClubs] = useState<any[]>([]);
    const [myClubs, setMyClubs] = useState<any[]>([]);

    async function fetchAllClubs() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getClubs', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            // console.log('Result received:', result.result);

            setClubs(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    async function fetchMyClubs() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getMyClubsById', params: { id: studentID } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            console.log('Result received:', result.result);

            setMyClubs(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const RegisteredClubMenu = ({ clubId, name }: { clubId: string, name: string }) => {
        const handleLeaveClub = async () => {
            try {
                const response = await fetch('/api/db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        { queryType: 'leaveClubById', params: { studentId: studentID, clubId: clubId } }
                    )
                });

                if (!response.ok) {
                    console.error('HTTP error!', response.status, response.statusText);
                    return;
                }

                fetchAllClubs();
                fetchMyClubs();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={handleLeaveClub}
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                >
                    Leave Club
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    const ClubMenu = ({ clubId, name }: { clubId: string, name: string }) => {
        const handleJoinClub = async () => {
            try {
                const response = await fetch('/api/db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        { queryType: 'joinClubById', params: { studentId: studentID, clubId: clubId } }
                    )
                });

                if (!response.ok) {
                    console.error('HTTP error!', response.status, response.statusText);
                    return;
                }

                fetchAllClubs();
                fetchMyClubs();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item
                    onClick={handleJoinClub}
                    leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
                >
                    Join Club
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    useEffect(() => {
        fetchAllClubs();
        fetchMyClubs();
    }, []);

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={400} type="native">
            <Text mb="0.5rem" fw="700">My Clubs</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Club ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Advisor</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {myClubs.map((item, index) => {
                        // console.log(item)

                        return <Table.Tr key={index}>
                            <Table.Td>{item.cb_clubkey}</Table.Td>
                            <Table.Td>{item.cb_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>
                                <RegisteredClubMenu clubId={item.cb_clubkey} name={item.cb_name} />
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>

            <Text mb="0.5rem" mt="1rem" fw="700">Clubs</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Club ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Advisor</Table.Td>

                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {clubs.map((item, index) => {
                        // console.log(item)
                        return (myClubs.map((item) => item.cb_clubkey)).includes(item.cb_clubkey) ? undefined :
                            <Table.Tr key={index}>
                                <Table.Td>{item.cb_clubkey}</Table.Td>
                                <Table.Td>{item.cb_name}</Table.Td>
                                <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                                <Table.Td>
                                    <ClubMenu clubId={item.cb_clubkey} name={item.cb_name} />
                                </Table.Td>
                            </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default StudentClubsTable