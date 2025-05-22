import TextFormInput from '@/components/form/TextFormInput'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const SocialLinks = () => {
  const { control } = useForm()
  return (
    <>
      <h4 className="fs-16 fw-semibold mb-1">Social Media Links</h4>
      <p className="text-muted">Fill your social media links</p>
      <Row>
        
        {/* Social Media Accounts (4 per row) */}
        <Col md={6} lg={3}>
          <TextFormInput
            name="telegramUsername"
            label="Telegram"
            control={control}
            placeholder="Enter Telegram username"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="kikUsername"
            label="Kik"
            control={control}
            placeholder="Enter Kik username"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="signalPhoneNumber"
            label="Signal"
            control={control}
            placeholder="Enter Signal phone number"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="snapchatUsername"
            label="Snapchat"
            control={control}
            placeholder="Enter Snapchat username"
            containerClassName="mb-3"
          />
        </Col>

        <Col md={6} lg={3}>
          <TextFormInput
            name="linkedinUsername"
            label="LinkedIn"
            control={control}
            placeholder="Enter LinkedIn username"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="instagramUsername"
            label="Instagram"
            control={control}
            placeholder="Enter Instagram username"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="tiktokUsername"
            label="TikTok"
            control={control}
            placeholder="Enter TikTok username"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={6} lg={3}>
          <TextFormInput
            name="xUsername"
            label="X (Twitter)"
            control={control}
            placeholder="Enter X username"
            containerClassName="mb-3"
          />
        </Col>
      </Row>
    </>
  )
}

export default SocialLinks
