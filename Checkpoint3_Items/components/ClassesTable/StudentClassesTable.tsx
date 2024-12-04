import { Button, Card, Menu, rem, Table, TableData, Text } from "@mantine/core"
import { IconDotsVertical, IconFileDescription, IconFilePencil, IconMessageCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const StudentClassesTable = ({studentID}: {studentID: any}) => {
    const [classes, setClasses] = useState<any[]>([]);
    const [registeredClasses, setRegisteredClasses] = useState<any[]>([]);
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
        // console.log('Result received:', result.result);

        setRegisteredClasses(result.result);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    }

    const ClassMenu = ({classId, name}: {classId: string, name: string}) => {
        const handleRegister = async () => {
            if(registeredClasses.length >= 6){
                alert("Can't have more than 6 classes!")
            }
            console.log(classId)
            console.log(registeredClasses.map((item) => item.cs_classkey))

            if((registeredClasses.map((item) => item.cs_classkey)).includes(classId)){
                alert("Already registered in that class!")
            }

            try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'registerClass', params: {studentId: studentID, classId: classId} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            // setClasses(result.result);
            fetchAllClasses();
            fetchMyClasses();
            } catch (error) {
            console.error('Failed to fetch data:', error);
            }
        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={handleRegister} leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                Register Class
                </Menu.Item>
        </Menu.Dropdown>
        
            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer"/>
            </Menu.Target>
        </Menu>
    }

    const RegisteredClassMenu = ({classId, name}: {classId: string, name: string}) => {
        const handleRemoveClass = async () => {
            try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'removeClass', params: {studentId: studentID, classId: classId} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            fetchAllClasses();
            fetchMyClasses();
            } catch (error) {
            console.error('Failed to fetch data:', error);
            }
        }

        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={() => router.push(`/student/${studentID}/assignments/${classId}`)} leftSection={<IconFilePencil style={{ width: rem(14), height: rem(14) }} />}>
                View Assignments
                </Menu.Item>
                <Menu.Item leftSection={<IconFileDescription style={{ width: rem(14), height: rem(14) }} />}>
                View Grades
                </Menu.Item>
                <Menu.Item
                color="red"
                onClick={handleRemoveClass}
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                >
                Remove Class
                </Menu.Item>
        </Menu.Dropdown>
        
            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer"/>
            </Menu.Target>
        </Menu>
    }

    useEffect(() => {
        fetchAllClasses();
        fetchMyClasses();
    }, []);

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={500} type="native">
            <Text mb="0.5rem" fw="700">Registered Classes</Text>
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
                            <Table.Td>
                                <RegisteredClassMenu classId={item.cs_classkey} name={item.cs_name}/>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>

            <Text mb="0.5rem" mt="1rem" fw="700">Classes</Text>
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
                        return (registeredClasses.map((item) => item.cs_classkey)).includes(item.cs_classkey) ? undefined : 
                        <Table.Tr key={index}>
                            <Table.Td>{item.cs_classkey}</Table.Td>
                            <Table.Td>{item.cs_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>{item.cs_subject}</Table.Td>
                            <Table.Td>
                                <ClassMenu classId={item.cs_classkey} name={item.cs_name}/>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default StudentClassesTable