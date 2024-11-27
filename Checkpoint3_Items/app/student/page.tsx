'use client'
import ClassesTable from "@/components/ClassesTable";
import { Card, Flex, Group, Text } from "@mantine/core"
import { useEffect, useState } from 'react';


const Dashboard = () => {

    return <>
    <Group m="1rem 0 1.5rem 0">
        <Text>Currently seeing student view.</Text>
        <Text component="a" href="/" fw="700">Choose another role?</Text>
    </Group>
        {/* <Card w="100%" shadow="lg">
            <Card.Section bg="magenta" h="1.5rem" ></Card.Section>
            <Card.Section p="1.5rem 2rem">
                <Text fw="700" fz="14">History</Text>
                <Text fw="600" fz="28" c="magenta">History 1</Text>
                <Text mt="0.25rem">Teacher: Kristi King</Text>
            </Card.Section>
        
        </Card> */}

        <ClassesTable/>
    </>
}

export default Dashboard