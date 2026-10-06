import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
  token?: string
}

export const MagicLinkEmail = ({ confirmationUrl, token }: MagicLinkEmailProps) => (
  <Html lang="et" dir="ltr">
    <Head />
    <Preview>Sinu sisselogimislink Tartu ettevõtlusnädala äppi</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Logi sisse</Heading>
        <Text style={text}>
          Tere! Vajuta allolevale nupule, et logida sisse Studio MindZi Tartu ettevõtlusnädala äppi. Seal näed oma registreeringuid, slaide ja saad jätta tagasisidet.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Logi sisse
        </Button>
        {token ? (
          <>
            <Text style={{ ...text, margin: '25px 0 8px' }}>
              Kui link ei tööta, sisesta äpis see kood:
            </Text>
            <Text style={codeStyle}>{token}</Text>
          </>
        ) : null}
        <Text style={footer}>
          Link kehtib lühikest aega. Kui sa ei palunud sisselogimislinki, võid selle kirja lihtsalt eirata.
          Küsimuste korral kirjuta info@mindz.ee.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif' }
const container = { padding: '24px 25px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 25px' }
const button = {
  backgroundColor: '#009D97',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '999px',
  padding: '14px 28px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '30px 0 0' }
const codeStyle = { fontSize: '28px', fontWeight: 'bold' as const, letterSpacing: '6px', color: '#1a1a1a', margin: '0 0 10px' }
