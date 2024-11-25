'use client'
import { IconClipboard, IconCrown, IconUser } from '@tabler/icons-react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';


export default function HomePage() {
  return (
    <>
    <ColorSchemeToggle/>
    <Text style={{fontSize: 48, fontWeight: 600, marginTop: '2rem'}}>I am a...</Text>
      <Group gap={24}>
        <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" component='a' href='/student' style={{cursor: 'pointer'}}>
          <Group justify='center' m="0 0 0 -1.5rem">
            <IconUser size={32}/>
            <Text style={{fontSize: 26, fontWeight: 500}}>Student</Text>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" component='a' href='/teacher' style={{cursor: 'pointer'}}>
          <Group justify='center' m="0 0 0 -1.5rem">
            <IconClipboard size={32}/>
            <Text style={{fontSize: 26, fontWeight: 500}}>Teacher</Text>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder m="2rem 0" w="20rem" component='a' href='/admin' style={{cursor: 'pointer'}}>
          <Group justify='center' m="0 0 0 -1rem">
            <IconCrown size={32}/>
            <Text style={{fontSize: 26, fontWeight: 500}}>Administrator</Text>
          </Group>
        </Card>
      </Group>
    </>
  );
}
