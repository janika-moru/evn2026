import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  email?: string
  eventTitle?: string
  eventWhen?: string
}

const WithdrawalNotification = ({ email, eventTitle, eventWhen }: Props) => (
  <Html lang="et" dir="ltr">
    <Head />
    <Preview>Kasutaja loobus kohast äpi kaudu</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Kasutaja loobus kohast äpi kaudu</Heading>
        <Section style={box}>
          <Text style={row}>
            <span style={labelStyle}>Kasutaja meil</span>
            <br />
            {email || '—'}
          </Text>
          <Text style={row}>
            <span style={labelStyle}>Koolitus</span>
            <br />
            {eventTitle || '—'}
            {eventWhen ? ` (${eventWhen})` : ''}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WithdrawalNotification,
  subject: 'Kasutaja loobus kohast äpi kaudu',
  displayName: 'Loobumine koolitusest',
  to: 'info@mindz.ee',
  previewData: { email: 'osaleja@example.com', eventTitle: 'Näidiskoolitus', eventWhen: 'E 5. okt 9.30' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif', color: '#1f2937' }
const container = { padding: '24px 24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 700, color: '#009D97', margin: '0 0 16px' }
const box = { backgroundColor: '#F3DDD6', borderRadius: '16px', padding: '8px 16px' }
const row = { fontSize: '15px', lineHeight: '1.5', margin: '10px 0' }
const labelStyle = { fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }
