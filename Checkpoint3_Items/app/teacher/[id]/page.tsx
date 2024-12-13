'use client'
import { Container, Flex, Group, Paper, Text } from "@mantine/core"
import { useParams } from 'next/navigation';
import TeacherClassesTable from "@/components/ClassesTable/TeacherClassesTable";
import TeacherClubsTable from "@/components/ClubsTable/TeacherClubsTable";
import TeacherViewStudents from "@/components/TeacherViewStudents";
import { useEffect, useState } from "react";

// The teacher page
export default function TeacherView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL
    const [classes, setClasses] = useState<any[]>([]);
    const [taughtStudents, setTaughtStudents] = useState<any[]>([]);

    // Fetch functions to get all classes and all students being taught by the current teacher
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

    async function fetchTaughtStudents() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getTaughtStudents', params: { teacherId: userId } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();

            setTaughtStudents(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const refreshData = () => {
        fetchAllClasses()
        fetchTaughtStudents()
    }

    useEffect(() => {
        fetchAllClasses()
        fetchTaughtStudents()
    }, [])

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing teacher view.</Text>
            <Text component="a" href="/" fw="700" c="red">Choose another role?</Text>
        </Group>

        <Paper miw={1000}>
            <Group w="100%" justify="space-between" gap={20}>
                <TeacherClassesTable teacherID={userId} classes={classes} />
                <TeacherClubsTable teacherID={userId} />
            </Group>

            <TeacherViewStudents teacherID={userId.toString()} classes={classes} students={taughtStudents} refreshData={refreshData} />
        </Paper>
    </>
}