import { Button, Card, Group, Menu, Modal, NumberInput, rem, Table, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconFilePencil } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

// This renders the table that allows teachers to view all the students enrolled in each of their classes
export default function TeacherViewStudents({ teacherID, classes, students, refreshData }: { teacherID: any, classes: any[], students: any[], refreshData: () => void }) {
    const [activeTab, setActiveTab] = useState<string | null>('');
    const currentStudent = useRef("")
    const currentStudentId = useRef("")

    const [currentStudentGrade, setCurrentStudentGrade] = useState(0)
    const [opened, { close, open }] = useDisclosure(false);

    useEffect(() => {
        let found = false
        // Sets the default tab so it automatically displays something
        classes.forEach((cls) => {
            if (cls.cs_teacherkey == teacherID && !found) {
                found = true
                setActiveTab(cls.cs_classkey.toString())
            }
        })
    }, [classes])

    // Alters the student's grade in a class in the db
    const changeStudentGrade = async (studId: string, classId: string, grade: number) => {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'updateStudentGradeById', params: { studentId: studId, classId: classId, grade: grade } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            refreshData()

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const StudentMenu = ({ name, grade, id }: { name: string, grade: number, id: string }) => {
        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={() => {
                    currentStudent.current = name
                    currentStudentId.current = id
                    setCurrentStudentGrade(grade)
                    open()
                }
                } leftSection={<IconFilePencil style={{ width: rem(14), height: rem(14) }} />}>
                    Change Grade
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    return <Card w="100%" m="1.5rem 0" radius={10}>
        <Modal opened={opened} onClose={close} title={`Change ${currentStudent.current}'s Grade`} withCloseButton>
            <NumberInput
                label="Grade"
                placeholder="You cannot enter number less than 0 or greater than 100"
                clampBehavior="strict"
                min={0}
                max={100}
                defaultValue={currentStudentGrade}
                onChange={(num) => { setCurrentStudentGrade(parseInt(num.toString(), 10)) }}
            />

            <Group mt="2rem" gap="lg">
                <Button w={100} onClick={() => {
                    changeStudentGrade(currentStudentId.current, activeTab || "0", currentStudentGrade)
                    close()
                }}>Confirm</Button>
                <Button w={100} variant="light" color="red" onClick={close}>Back</Button>
            </Group>
        </Modal>
        <Text mb="0.5rem" fw="700" c="blue">View Students</Text>

        <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
                {classes.map((item, index) => item.cs_teacherkey == teacherID ?
                    <Tabs.Tab value={item.cs_classkey.toString()} key={index}>
                        {item.cs_name}
                    </Tabs.Tab> : undefined
                )}
            </Tabs.List>

            {classes.map((item, index) => item.cs_teacherkey == teacherID ?
                <Tabs.Panel value={item.cs_classkey.toString()} key={index}>
                    <Table.ScrollContainer minWidth={500} h={500} type="native">
                        <Table>
                            <Table.Thead>
                                <Table.Tr >
                                    <Table.Td fw="700">Student ID</Table.Td>
                                    <Table.Td fw="700">Name</Table.Td>
                                    <Table.Td fw="700">Email</Table.Td>
                                    <Table.Td fw="700">Phone No.</Table.Td>
                                    <Table.Td fw="700">Grade</Table.Td>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {students.map((student, index) => activeTab == student.cs_classkey ?
                                    <Table.Tr key={index}>
                                        <Table.Td>{student.p_personkey}</Table.Td>
                                        <Table.Td>{student.p_firstname} {student.p_lastname}</Table.Td>
                                        <Table.Td>{student.p_email}</Table.Td>
                                        <Table.Td>{student.p_phonenum}</Table.Td>
                                        <Table.Td>{student.at_grade}</Table.Td>
                                        <Table.Td><StudentMenu name={`${student.p_firstname} ${student.p_lastname}`} grade={student.at_grade} id={student.p_personkey} /></Table.Td>
                                    </Table.Tr>
                                    : undefined)}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Tabs.Panel> : undefined
            )}
        </Tabs>
    </Card>
}