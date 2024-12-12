import { Card, Menu, rem, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const AdminClubsTable = () => {
    const [clubs, setClubs] = useState<any[]>([]);

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


    return <Card radius={10} mah="30rem" m="1rem 0">
        <Table.ScrollContainer minWidth={300} type="native">
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
                    {clubs.map((item, index) =>
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

export default AdminClubsTable