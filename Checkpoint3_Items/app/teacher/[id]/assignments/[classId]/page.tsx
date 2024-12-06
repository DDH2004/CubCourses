'use client'
import { Button, Card, Collapse, Flex, Group, Menu, Modal, NumberInput, rem, Table, Text } from "@mantine/core"
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconArrowLeft, IconBook, IconDotsVertical, IconFilePencil } from "@tabler/icons-react";
import { format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";

/**
 * This is the view the student sees when they look at their assignments.
 */
export default function StudentAssignmentView() {
    const params = useParams(); // Access dynamic route parameters
    const [assignments, setAssignments] = useState<any[]>([])
    const [submissions, setSubmissions] = useState<any[]>([])

    const [modalOpened, { close, open }] = useDisclosure(false);

    const assignmentRef = useRef("1")
    const studentRef = useRef("1")
    const studentNameRef = useRef("Brandon")
    const gradeRef = useRef(0)

    const userId = params?.id || "1";
    const classId = params?.classId || "1"
    const router = useRouter()

    async function fetchAllAssignments() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getAssignments', params: { classId } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();

            setAssignments(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    async function fetchAllAssignmentSubmissions() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getSubmittedAssignmentsByClass', params: { classId } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();

            setSubmissions(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchAllAssignments()
        fetchAllAssignmentSubmissions()
    }, [])

    const AssignmentMenu = ({ assignId, studentId, name, grade }: { assignId: string, studentId: string, name: string, grade: number }) => {
        const handleClick = () => {
            gradeRef.current = grade
            assignmentRef.current = assignId
            studentRef.current = studentId
            studentNameRef.current = name
            open()
        }
        return <Menu shadow="md" width={200}>
            <Menu.Dropdown>
                <Menu.Label>{name}</Menu.Label>
                <Menu.Item onClick={handleClick} leftSection={<IconFilePencil style={{ width: rem(14), height: rem(14) }} />}>
                    Change Grade
                </Menu.Item>
            </Menu.Dropdown>

            <Menu.Target>
                <IconDotsVertical size={20} cursor="pointer" />
            </Menu.Target>
        </Menu>
    }

    const onSubmitConfirm = async () => {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'updateAssignmentGrade', params: { assignId: assignmentRef.current, studentId: studentRef.current, grade: gradeRef.current } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            fetchAllAssignments()
            fetchAllAssignmentSubmissions()

            close()
        } catch (error) {
            console.error('Failed to fetch data:', error);
            close()
        }
    }

    const AssignmentCard = ({ id, dueDate, assignDate, desc }: { id: string, dueDate: string, assignDate: string, desc: string }) => {
        const [collapsableOpened, { toggle }] = useDisclosure(false);


        return <Card w="100%" m="0.5rem 0">
            <Modal opened={modalOpened} onClose={close} title={`Change ${studentNameRef.current}'s grade for assignment ${assignmentRef.current}?`} withCloseButton>
                <NumberInput
                    label="Grade"
                    placeholder="You cannot enter number less than 0 or greater than 100"
                    clampBehavior="strict"
                    min={0}
                    max={100}
                    defaultValue={gradeRef.current}
                    onChange={(num) => { gradeRef.current = parseInt(num.toString(), 10) }}
                />

                <Group mt="1rem" gap="lg">
                    <Button w={100} onClick={onSubmitConfirm}>Confirm</Button>
                    <Button w={100} variant="light" color="red" onClick={close}>Back</Button>
                </Group>
            </Modal>
            <Group gap="lg">
                <IconBook size={30} />
                <Flex direction="column">
                    <Text fw="600" fz="20">Assignment ID: {id}</Text>
                    <Text fz="16">{desc}</Text>
                    <Group mt="0.5rem">
                        <Text fz="14">Due {format(dueDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fz="14">Assigned {format(assignDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fw="700" fz="14" c="blue" onClick={toggle} style={{ cursor: 'pointer' }}>{collapsableOpened ? "Hide Submissions" : "View Submissions"}</Text>
                    </Group>
                </Flex>
            </Group>
            <Collapse in={collapsableOpened} p="1rem 2rem">
                <Table>
                    <Table.Thead>
                        <Table.Tr >
                            <Table.Td fw="700">Student ID</Table.Td>
                            <Table.Td fw="700">Name</Table.Td>
                            <Table.Td fw="700">Email</Table.Td>
                            <Table.Td fw="700">Grade</Table.Td>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {submissions.map((sub, index) => sub.h_homeworkkey == id ?
                            <Table.Tr key={index}>
                                <Table.Td>{sub.s_studentkey}</Table.Td>
                                <Table.Td>{sub.p_firstname} {sub.p_lastname}</Table.Td>
                                <Table.Td>{sub.p_email}</Table.Td>
                                <Table.Td>{sub.d_grade}</Table.Td>
                                <Table.Td><AssignmentMenu assignId={sub.h_homeworkkey} studentId={sub.s_studentkey} name={`${sub.p_firstname} ${sub.p_lastname}`} grade={sub.d_grade} /></Table.Td>
                            </Table.Tr> : undefined)}
                    </Table.Tbody>
                </Table>
            </Collapse>

        </Card>
    }

    return <>

        <Group m="1rem 0 1.5rem 0" onClick={() => router.push(`/teacher/${userId}`)} style={{ cursor: 'pointer' }}>
            <IconArrowLeft />
            <Text fw="700">Back</Text>
        </Group>
        <Text fw="500" fz="24" mb="1rem">Assignments</Text>
        {assignments.map((item, index) => <AssignmentCard key={index} id={item.h_homeworkkey} dueDate={item.h_duedate} assignDate={item.h_assigndate} desc={item.h_description} />)}
    </>
}