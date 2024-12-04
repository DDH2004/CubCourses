'use client'
import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core"
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconArrowLeft, IconBook } from "@tabler/icons-react";
import { format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";

/**
 * This is the view the student sees when they look at their assignments.
 */
export default function StudentAssignmentView() {
    const params = useParams(); // Access dynamic route parameters
    const [assignments, setAssignments] = useState<any[]>([])
    const [myAssignments, setMyAssignments] = useState<any[]>([])
    const [opened, { close, open }] = useDisclosure(false);
    const assignmentRef = useRef("1")


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
                { queryType: 'getAssignments', params: {classId: classId} }
            )
        });

        if (!response.ok) {
            console.error('HTTP error!', response.status, response.statusText);
            return;
        }

        const result = await response.json();

        setAssignments(result.result);
        console.log(result.result)
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    }

    async function fetchMyAssignments() {
        try {
        const response = await fetch('/api/db', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { queryType: 'getAssignmentsById', params: {classId: classId, studentId: userId} }
            )
        });

        if (!response.ok) {
            console.error('HTTP error!', response.status, response.statusText);
            return;
        }

        const result = await response.json();

        setMyAssignments(result.result);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchAllAssignments()
        fetchMyAssignments()
    }, [])

    const DueAssignmentCard = ({id, dueDate, assignDate, desc}: {id: string, dueDate: string, assignDate: string, desc: string}) => {
        const onDueSubmit = () => {
            assignmentRef.current = id
            open()
        }

        return <Card w="100%" m="0.5rem 0">
            <Group gap="lg">
                <IconBook size={30}/>
                <Flex direction="column">
                    <Text fw="600" fz="20">Assignment ID: {id}</Text>
                    <Text fz="16">{desc}</Text>
                    <Group mt="0.5rem">
                        <Text fz="14">Due {format(dueDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fz="14">Assigned {format(assignDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fw="700" fz="14" c="blue" onClick={onDueSubmit} style={{cursor: 'pointer'}}>Submit</Text>
                    </Group>
                </Flex>
            </Group>
            
        </Card>
    }

    const SubmittedAssignmentCard = ({id, dueDate, assignDate, desc, grade}: {id: string, dueDate: string, assignDate: string, desc: string, grade: string}) => {
        const onDueSubmit = () => {
            assignmentRef.current = id
            open()
        }

        return <Card w="100%" m="0.5rem 0">
            <Group gap="lg">
                <IconBook size={30}/>
                <Flex direction="column">
                    <Text fw="600" fz="20">Assignment ID: {id}</Text>
                    <Text fz="16">{desc}</Text>
                    <Group mt="0.5rem">
                        <Text fz="14">Due {format(dueDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fz="14">Assigned {format(assignDate, 'MMM d, yyyy')}</Text>
                        <Text fz="14"> | </Text>
                        <Text fw="700" fz="14">Grade: {grade}</Text>
                    </Group>
                </Flex>
            </Group>
            
        </Card>
    }

    const onSubmitConfirm = async () => {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'submitAssignment', params: {assignmentId: assignmentRef.current, studentId: userId} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            fetchAllAssignments()
            fetchMyAssignments()

            close()
        } catch (error) {
            console.error('Failed to fetch data:', error);
            close()
        }
    }

    return <>
        <Modal opened={opened} onClose={close} title={`Confirm Submission for #${assignmentRef.current}`} withCloseButton={true}>
            <Text>Are you sure you want to submit? You will not be able to change your submission afterwards.</Text>
            
            <Group mt="1rem" gap="lg">
                <Button w={100} onClick={onSubmitConfirm}>Confirm</Button>
                <Button w={100} variant="light" color="red" onClick={close}>Back</Button>
            </Group>
        </Modal>

        <Group m="1rem 0 1.5rem 0" onClick={() => router.push(`/student/${userId}`)} style={{cursor: 'pointer'}}>
            <IconArrowLeft/>
            <Text fw="700">Back</Text>
        </Group>
        <Text fw="500" fz="24" mb="1rem">Assignments</Text>
        <Text fw="600" fz="18">Submitted</Text>
        {myAssignments.length > 0 ? myAssignments.map((item, index) => <SubmittedAssignmentCard key={index} id={item.h_homeworkkey} dueDate={item.h_duedate} assignDate={item.h_assigndate} desc={item.h_description} grade={item.d_grade}/>) : 
        "You have not submitted any assignments."}

        <Text fw="600" fz="18" mt="1rem">Incomplete</Text>
        {assignments.map((item, index) => {
            return (myAssignments.map((item) => item.h_homeworkkey)).includes(item.h_homeworkkey) ? undefined : 
            <DueAssignmentCard key={index} id={item.h_homeworkkey} dueDate={item.h_duedate} assignDate={item.h_assigndate} desc={item.h_description}/>
        })}
    </>
}