import * as React from 'react'
import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  kind?: 'training' | 'keep' | 'change'
  speakerName?: string
  eventTitle?: string
  eventWhen?: string
  rating?: number | null
  message?: string | null
  keepText?: string | null
  changeText?: string | null
  name?: string | null
  field?: string | null
  contact?: string | null
  contactRequested?: boolean
  photoPromise?: boolean
  photoUrl?: string | null
}

const KIND_LABEL = {
  training: 'Tagasiside koolitajale',
  keep: 'Kiitus tiimile',
  change: 'Parandusettepanek',
} as const

function Row({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <Text style={row}>
      <span style={labelStyle}>{label}</span>
      <br />
      <span style={{ whiteSpace: 'pre-wrap' }}>{value}</span>
    </Text>
  )
}

const FeedbackNotification = (p: Props) => {
  const kind = p.kind ?? 'change'
  return (
    <Html lang="et" dir="ltr">
      <Head />
      <Preview>{KIND_LABEL[kind]}{p.speakerName ? ` – ${p.speakerName}` : ''}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{KIND_LABEL[kind]}</Heading>
          <Section style={box}>
            <Row label="Koolitaja" value={p.speakerName} />
            <Row label="Koolitus" value={p.eventTitle ? `${p.eventTitle}${p.eventWhen ? ` (${p.eventWhen})` : ''}` : undefined} />
            <Row label="Hinnang" value={p.rating ? `${p.rating}/10` : undefined} />
            <Row label="Tagasiside" value={p.message} />
            <Row label="Mis meeldis" value={p.keepText} />
            <Row label="Mida muuta" value={p.changeText} />
          </Section>
          <Section style={{ marginTop: 16 }}>
            <Row label="Nimi" value={p.name || 'anonüümne'} />
            <Row label="Roll / valdkond" value={p.field} />
            <Row label="Meiliaadress" value={p.contact} />
            <Row label="Soovib vastust" value={p.contactRequested ? 'jah' : undefined} />
            <Row label="Foto" value={p.photoPromise ? 'saadab pildi hiljem' : undefined} />
            {p.photoUrl ? (
              <Text style={row}>
                <span style={labelStyle}>Lisatud foto</span>
                <br />
                <Link href={p.photoUrl} style={link}>Ava foto (link kehtib 7 päeva)</Link>
              </Text>
            ) : null}
          </Section>
          <Text style={footer}>Saadetud Tartu ettevõtlusnädala äpist</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: FeedbackNotification,
  to: 'info@mindz.ee',
  displayName: 'Tagasiside teavitus',
  subject: (d: Record<string, any>) => {
    if (d['kind'] === 'training') {
      const who = d['speakerName'] ? `Koolitaja: ${d['speakerName']}` : 'Koolitus'
      return `[Tagasiside] ${who}${d['rating'] ? ` – ${d['rating']}/10` : ''}`
    }
    return d['kind'] === 'keep' ? '[Tagasiside] Kiitus tiimile' : '[Tagasiside] Parandusettepanek'
  },
  previewData: {
    kind: 'training',
    speakerName: 'Kiia Paal',
    eventTitle: 'Morning Mindset',
    eventWhen: '5. okt 8.30',
    rating: 9,
    message: 'Väga inspireeriv hommik!',
    name: 'Mari',
    field: 'Ettevõtja',
    contact: 'mari@example.com',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif', color: '#1f2937' }
const container = { padding: '24px 24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 700, color: '#009D97', margin: '0 0 16px' }
const box = { backgroundColor: '#F3DDD6', borderRadius: '16px', padding: '8px 16px' }
const row = { fontSize: '15px', lineHeight: '1.5', margin: '10px 0' }
const labelStyle = { fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }
const link = { color: '#009D97', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#9ca3af', marginTop: '24px' }
