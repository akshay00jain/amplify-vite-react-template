import React, { useState, useEffect, useMemo } from "react";
import TextFormInput from '@/components/form/TextFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import { Col, Row } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form';
import { useLabels } from '@/context/LabelsContext'
import { yupResolver } from '@hookform/resolvers/yup';
import { whoWhatSchema } from "@/validation/activityValidation";
import { useFormContext } from "react-hook-form";

const WhoWhat = ({ showIntimateFields, onSubmit }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register
  } = useFormContext();

  // Register fields on mount to ensure they exist in the form state
  useEffect(() => {
    register("cost");
    register("contacts");
    register("positions");
    register("birthControl");
    register("description");
  }, [register]);

  const { getValues } = useFormContext();
  const formData = getValues();

React.useEffect(() => {
  if (formData) {
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key]);
    });
  }
}, [formData, setValue]);

  const labels = useLabels();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-3 mt-0">Fill all information below</h5>
      <Row>
        <Col md={3}>
        <label htmlFor={labels.activities.cost} className="form-label text-muted">{labels.activities.cost} *</label>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend2">
              $
            </span>
            <TextFormInput
            required
            name="cost"
            control={control}
            type="number" 
            aria-describedby="inputGroupPrepend2"
            />
          </div>
        </Col>
        <Col md={6}>
        <label htmlFor={labels.activities.add.sections.contacts.title} className="form-label text-muted">{labels.contacts.titleOr} *</label>
          <ChoicesFormInput options={{ removeItemButton: true }} multiple name="contacts" control={control}>
            <option>Choose a city</option>
            <optgroup label="A">
              <option value="Adam">Adam</option>
              <option value="Alexis">Alexis</option>
              <option value="Ava">Ava</option>
            </optgroup>
            <optgroup label="B">
              <option value="Bobby">Bobby</option>
              <option value="Brittany">Brittany</option>
              <option value="Brooklyn">Brooklyn</option>
            </optgroup>
            <optgroup label="C">
              <option value="Cameron">Cameron</option>
              <option value="Charlotte">Charlotte</option>
              <option value="Chloe">Chloe</option>
            </optgroup>
            <optgroup label="D">
              <option value="Daniel">Daniel</option>
              <option value="Dylan">Dylan</option>
              <option value="Daisy">Daisy</option>
            </optgroup>
          </ChoicesFormInput>
        </Col>
      </Row>

      <Row className="mt-0 g-4">
              <Col md={4}>
              <label htmlFor="positions" className="form-label text-muted">{labels.activities.positions.title} *</label>
              <ChoicesFormInput 
              className={`form-control ${errors.activityType ? 'is-invalid' : ''}`}
              multiple
              name="positions"
              control={control}
              placeholder={labels.activities.positions.title}
              >
                  <option value="Choice 1" defaultChecked>
                    Choice 1
                  </option>
                  <option value="intimate">Choice 2</option>
                  <option value="Choice 3">Choice 3</option>
                </ChoicesFormInput>
              </Col>
              <Col md={3}>
              <label htmlFor="birthControl" className="form-label text-muted">{labels.activities.birthControl.label} *</label>
              <ChoicesFormInput 
              className={`form-control ${errors.activityType ? 'is-invalid' : ''}`}
              name="birthControl"
              control={control}
              placeholder={labels.activities.birthControl.label}
              >
                  <option value="Choice 1">Choice 1</option>
                  <option value="intimate">Choice 2</option>
                  <option value="Choice 3">Choice 3</option>
                </ChoicesFormInput>
              </Col>
            </Row>

      <Row className="mt-3 mb-3">
        <Col md={9}>
          <TextAreaFormInput
            control={control}
            name="description"
            label="Activity Description"
            containerClassName="mb-3"
            placeholder="Description of the activity"
          />
        </Col>
        </Row>
    </form>
  )
}

export default WhoWhat
