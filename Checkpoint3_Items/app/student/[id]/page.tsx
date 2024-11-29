'use client'
import { Card, Flex, Group, Text } from "@mantine/core"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StudentClassesTable from "@/components/ClassesTable/StudentClassesTable";
import StudentClubsTable from "@/components/ClubsTable/StudentClubsTable";


export default function StudentView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing student view.</Text>
            <Text component="a" href="/" fw="700">Choose another role?</Text>
        </Group>

        <Group>
            <StudentClassesTable studentID={userId}/>
            <StudentClubsTable studentID={userId}/>
        </Group>
    </>
}