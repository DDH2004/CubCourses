'use client'
import { IconClipboard, IconCrown, IconUser } from '@tabler/icons-react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

import { Card, Image, Text, Badge, Button, Group, NumberInput, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import EnterStudentCard from '@/components/EnterStudentCard';
import EnterTeacherCard from '@/components/EnterTeacherCard';
import EnterAdminCard from '@/components/EnterAdminCard';


export default function HomePage() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [admin, setAdmin] = useState<any[]>([])

  async function fetchTeachers() {
    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { queryType: 'getTeachers', params: {} }
        )
      });

      if (!response.ok) {
        console.error('HTTP error!', response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log('Result received:', result.result);

      setTeachers(result.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  async function fetchAdmin() {
    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { queryType: 'getAdmin', params: {} }
        )
      });

      if (!response.ok) {
        console.error('HTTP error!', response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log('Result received:', result.result);

      setAdmin(result.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  useEffect(() => {
    // fetchTeachers();
    // fetchAdmin();
  }, []);

  return (
    <>
      <ColorSchemeToggle />
      <Text style={{ fontSize: 48, fontWeight: 600, marginTop: '2rem' }}>I am a...</Text>
      <Group gap={24}>
        <EnterStudentCard />
        <EnterTeacherCard />
        <EnterAdminCard />
      </Group>
    </>
  );
}
