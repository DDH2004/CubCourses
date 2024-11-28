import { Card, Table, TableData } from "@mantine/core"
import { useEffect, useState } from "react";

const ClassesTable = ({studentID}: {studentID: any}) => {
    const [classes, setClasses] = useState<any[]>([]);
    const [registeredClasses, setRegisteredClasses] = useState<any[]>([]);


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

    async function fetchMyClasses() {
        try {
        const response = await fetch('/api/db', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { queryType: 'getMyClassesById', params: {id: studentID} }
            )
        });

        if (!response.ok) {
            console.error('HTTP error!', response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log('Result received:', result.result);

        setRegisteredClasses(result.result);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchAllClasses();
        fetchMyClasses();
    }, []);

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={500} type="native">
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
                    {registeredClasses.map((item, index) => {
                        // console.log(item)
                        return <Table.Tr key={index}>
                            <Table.Td>{item.cs_classkey}</Table.Td>
                            <Table.Td>{item.cs_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>{item.cs_subject}</Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>

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
                    {classes.map((item, index) => {
                        // console.log(item)
                        return <Table.Tr key={index}>
                            <Table.Td>{item.cs_classkey}</Table.Td>
                            <Table.Td>{item.cs_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>{item.cs_subject}</Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default ClassesTable