'use client'
import ClassesTable from "@/components/ClassesTable";
import { Card, Flex, Group, Text } from "@mantine/core"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


export default function Student() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing student view.</Text>
            <Text component="a" href="/" fw="700">Choose another role?</Text>
        </Group>

        <ClassesTable studentID={userId}/>
    </>
}