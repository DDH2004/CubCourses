'use client'
import { IconClipboard, IconCrown, IconUser } from '@tabler/icons-react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

import { Card, Image, Text, Badge, Button, Group, NumberInput, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import EnterStudentCard from '@/components/EnterStudentCard';
import EnterTeacherCard from '@/components/EnterTeacherCard';
import EnterAdminCard from '@/components/EnterAdminCard';

// The homepage, not much else to say here
// Imports the cards required to see the student, teacher, and admin views
// Whenever you see a function that starts with the word 'fetch', then that function makes a request to the database
export default function HomePage() {
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
