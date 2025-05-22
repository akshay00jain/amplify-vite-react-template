import React, { useState, useEffect, useMemo } from "react";
import TextFormInput from '@/components/form/TextFormInput'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import { Col, Row } from 'react-bootstrap'
import { Controller, useWatch } from 'react-hook-form';
import { useLabels } from '@/context/LabelsContext'
import { useFormContext } from "react-hook-form";

const BasicActivity = ({ onSubmit }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormContext();

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
      <h4 className="fs-16 fw-semibold mb-1">{labels.activities.add.title}</h4>
      <p className="text-muted">{labels.activities.add.subtitle}</p>
      <Row className="g-4">
        <Col md={4}>
          <TextFormInput 
          name="activityName" 
          label={labels.activities.activityName}
          control={control}
          containerClassName="mb-3"
          className={`form-control ${errors.activityName ? 'is-invalid' : ''}`}
          placeholder={labels.activities.activityName}
          />
          
        </Col>
        <Col md={3}>
          <TextFormInput
            name="firstName"
            label={labels.contacts.firstName}
            control={control}
            containerClassName="mb-3"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            placeholder={labels.contacts.firstName}
          />
        </Col>
        <Col md={3}>
          <TextFormInput
            name="lastName"
            label={labels.contacts.lastName}
            control={control}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            placeholder={labels.contacts.lastName}
          />
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
        <label htmlFor="activityType" className="form-label text-muted">{labels.activities.activityType} *</label>
        <Controller
            name="activityType"
            control={control}
            render={({ field }) => (
              <ChoicesFormInput
                {...field}
                className={`form-control ${errors.activityType ? 'is-invalid' : ''}`}
                placeholder={labels.activities.activityType}
              >
                <option value="Choice 1">Choice 1</option>
                <option value="intimate">Choice 2</option>
                <option value="Choice 3">Choice 3</option>
              </ChoicesFormInput>
            )}
          />
        </Col>
        <Col md={3}>
        <label htmlFor="secondaryActivityTypes" className="form-label text-muted">{labels.activities.secondaryActivityTypes} *</label>
        <Controller
            name="secondaryActivityTypes"
            control={control}
            render={({ field }) => (
              <ChoicesFormInput
                {...field}
                multiple
                className={`form-control ${errors.secondaryActivityTypes ? 'is-invalid' : ''}`}
                placeholder={labels.activities.secondaryActivityTypes}
              >
                <option value="Choice 1">Choice 1</option>
                <option value="intimate">Choice 2</option>
                <option value="Choice 3">Choice 3</option>
              </ChoicesFormInput>
            )}
          />
        </Col>
      </Row>
      <Row className="mt-0 g-4">
        <Col md={4}>
        <label htmlFor={labels.activities.location} className="form-label text-muted">{labels.activities.location} *</label>
          <ChoicesFormInput 
          options={{ placeholderValue: 'Choose a location...' }} 
          multiple
          name="location"
          control={control}
          className={`form-control ${errors.location ? 'is-invalid' : ''}`}
          placeholder={labels.activities.add.sections.whenwhere.location}
          >
            <option>Choose a city</option>
            <optgroup label="UK">
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Liverpool">Liverpool</option>
            </optgroup>
            <optgroup label="FR">
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
            </optgroup>
            <optgroup label="DE" disabled>
              <option value="Hamburg">Hamburg</option>
              <option value="Munich">Munich</option>
              <option value="Berlin">Berlin</option>
            </optgroup>
            <optgroup label="US">
              <option value="New York">New York</option>
              <option value="Washington" disabled>
                Washington
              </option>
              <option value="Michigan">Michigan</option>
            </optgroup>
            <optgroup label="SP">
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Malaga">Malaga</option>
            </optgroup>
            <optgroup label="CA">
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
            </optgroup>
          </ChoicesFormInput>
        </Col>
        <Col md={3}>
          <label htmlFor="metDate" className="form-label text-muted">{labels.contacts.metDate}</label>
            <Controller
              name="dateTime"
              control={control}
              render={({ field }) => (
                <CustomFlatpickr
                  {...field}
                  options={{ 
                    dateFormat: 'm-d-Y',
                  }}
                  placeholder={labels.contacts.metDate}
                  className="form-control"
                />
              )}
            />
        </Col>
      </Row>
    </form>
  );
};

export default BasicActivity;