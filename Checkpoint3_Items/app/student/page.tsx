'use client'
import ClassesTable from "@/components/ClassesTable";
import { Card, Flex, Group, Text } from "@mantine/core"
import { useEffect, useState } from 'react';


const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);

    async function fetchData() {
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
      console.log('Result received:', result.result);

      setData(result.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing student view.</Text>
            <Text component="a" href="/" fw="700">Choose another role?</Text>
        </Group>

        <ClassesTable classes={data}/>
    </>
}

export default Dashboard