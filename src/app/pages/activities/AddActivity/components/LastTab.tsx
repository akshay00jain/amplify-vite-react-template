import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Row } from 'react-bootstrap'
import { Rating,  } from '@smastrom/react-rating'
import { useState } from 'react'
// css
import '@smastrom/react-rating/style.css'
import { useFormContext } from "react-hook-form";

const LastTab = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useFormContext();

    const { getValues } = useFormContext();
    const formData = getValues();
    
  const [rating, setRating] = useState(3)
  return (
    <Row className="d-flex justify-content-center">
      <Col lg={6}>
        <div className="text-center">
          <h3 className="mt-0">Be honest...how much did you enjoy yourself?</h3>

          <Rating value={rating} onChange={setRating} style={{ maxWidth: 200, }}  />
        </div>
      </Col>
    </Row>
  )
}

export default LastTab
