import avatar1 from '@/assets/images/users/dummy-avatar.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm } from 'react-hook-form'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import { Col, Form, Row } from 'react-bootstrap'

import { LABELS_PATH } from '@/context/constants'

let labels: Record<string, string> = {};

try {
    // Fetch labels synchronously if in a Node.js environment
    const response = await fetch(LABELS_PATH, { method: 'GET' });
    if (response.ok) {
        labels = await response.json();
    } else {
        console.error('Failed to fetch labels:', response.statusText);
    }
} catch (error) {
    console.error('Error fetching labels:', error);
}

const Exxtra = () => {
  const { control } = useForm()
   return (
    <>
    <h4 className="fs-16 fw-semibold mb-1">BasicInfo Information</h4>
      <p className="text-muted">Subtitle Text</p>
      <Row className="mb-3 align-items-center">
        <Col md={2}>
          <Form.Label htmlFor="sexuality" className="form-label text-muted">
            Sexuality
          </Form.Label>
        </Col>
        <Col md={8}>
          <ChoicesFormInput>
            <option value="">Select Sexuality</option>
            <option value="heterosexual">Heterosexual</option>
            <option value="homosexual">Homosexual</option>
            <option value="bisexual">Bisexual</option>
          </ChoicesFormInput>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={2}>
          <Form.Label htmlFor="interactionStyles" className="form-label text-muted">
            Interaction Styles
          </Form.Label>
        </Col>
        <Col md={8}>
          <ChoicesFormInput options={{ placeholderValue: 'How do they interact with you?' }} multiple>
            <option>Choose a tag</option>
            <optgroup label="Category 1">
              <option value="tag1">Tag 1</option>
              <option value="tag2">Tag 2</option>
              <option value="tag3">Tag 3</option>
            </optgroup>
            <optgroup label="Category 2">
              <option value="tag4">Tag 4</option>
              <option value="tag5">Tag 5</option>
              <option value="tag6">Tag 6</option>
            </optgroup>
            <optgroup label="Category 3" disabled>
              <option value="tag7">Tag 7</option>
              <option value="tag8">Tag 8</option>
              <option value="tag9">Tag 9</option>
            </optgroup>
            <optgroup label="Category 4">
              <option value="tag10">Tag 10</option>
              <option value="tag11" disabled>
                Tag 11
              </option>
              <option value="tag12">Tag 12</option>
            </optgroup>
            <optgroup label="Category 5">
              <option value="tag13">Tag 13</option>
              <option value="tag14">Tag 14</option>
              <option value="tag15">Tag 15</option>
            </optgroup>
            <optgroup label="Category 6">
              <option value="tag16">Tag 16</option>
              <option value="tag17">Tag 17</option>
              <option value="tag18">Tag 18</option>
            </optgroup>
          </ChoicesFormInput>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={2}>
          <Form.Label htmlFor="contactTags" className="form-label text-muted">
            Contact Tags
          </Form.Label>
        </Col>
        <Col md={8}>
          <ChoicesFormInput options={{ placeholderValue: 'Choose contact tags' }} multiple>
                        <option>Choose contact tags</option>
                        <optgroup label="Relationship">
                            <option value="friend">Friend</option>
                            <option value="family">Family</option>
                            <option value="colleague">Colleague</option>
                            <option value="acquaintance">Acquaintance</option>
                        </optgroup>
                        <optgroup label="Interests">
                            <option value="sports">Sports Enthusiast</option>
                            <option value="music">Music Lover</option>
                            <option value="travel">Traveler</option>
                            <option value="foodie">Foodie</option>
                        </optgroup>
                        <optgroup label="Professional" disabled>
                            <option value="client">Client</option>
                            <option value="vendor">Vendor</option>
                            <option value="partner">Business Partner</option>
                        </optgroup>
                        <optgroup label="Location">
                            <option value="local">Local Contact</option>
                            <option value="international">International Contact</option>
                        </optgroup>
                        <optgroup label="Priority">
                            <option value="high_priority">High Priority</option>
                            <option value="medium_priority">Medium Priority</option>
                            <option value="low_priority">Low Priority</option>
                        </optgroup>
                        <optgroup label="Other">
                            <option value="potential_lead">Potential</option>
                            <option value="do_not_contact">Do Not Contact</option>
                        </optgroup>
                    </ChoicesFormInput>
        </Col>
      </Row>
      <Row className="mb-3 align-items-center">
        <Col md={2}>
          <Form.Label htmlFor="notes" className="form-label text-muted">
            Notes
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            className=""
          />
        </Col>
      </Row>
    </>
  );
};


export default Exxtra
