import { Card, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

// Renders the table of clubs that the teacher sees
// Includes whether or not they advise that club
const TeacherClubsTable = ({ teacherID }: { teacherID: any }) => {
    const [clubs, setClubs] = useState<any[]>([]);

    // Fetches club data
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

    useEffect(() => {
        fetchAllClubs();
    }, []);

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={400} type="native">
            <Text mb="0.5rem" fw="700" c="blue">Advising Clubs</Text>
            {
                clubs.map((item) => item.cb_teacherkey).includes(teacherID + "") ?
                    <Table>
                        <Table.Thead>
                            <Table.Tr >
                                <Table.Td fw="700">Club ID</Table.Td>
                                <Table.Td fw="700">Name</Table.Td>
                                <Table.Td fw="700">Advisor</Table.Td>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {clubs.map((item, index) => item.cb_teacherkey == teacherID ? <Table.Tr key={index}>
                                <Table.Td>{item.cb_clubkey}</Table.Td>
                                <Table.Td>{item.cb_name}</Table.Td>
                                <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            </Table.Tr> : undefined
                            )}
                        </Table.Tbody>
                    </Table>
                    : <Text fz="14">You are not advising any clubs.</Text>
            }

            <Text mb="0.5rem" mt="1rem" fw="700" c="blue">Clubs</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td fw="700">Club ID</Table.Td>
                        <Table.Td fw="700">Name</Table.Td>
                        <Table.Td fw="700">Advisor</Table.Td>

                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {clubs.map((item, index) => item.cb_teacherkey == teacherID ? undefined :
                        <Table.Tr key={index}>
                            <Table.Td>{item.cb_clubkey}</Table.Td>
                            <Table.Td>{item.cb_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default TeacherClubsTable