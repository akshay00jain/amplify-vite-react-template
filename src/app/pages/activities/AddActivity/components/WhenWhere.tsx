import React, { useState, useEffect, useMemo } from "react";
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import DropzoneFormInput from '@/components/form/DropzoneFormInput'
import MaskedInput from 'react-text-mask-legacy'
import { Col, Row } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form';
import { useLabels } from '@/context/LabelsContext'
import { yupResolver } from '@hookform/resolvers/yup';
import { whenWhereSchema } from "@/validation/activityValidation";

const WhenWhere = ({ formData, onSubmit }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(whenWhereSchema),
    defaultValues: formData,
  });

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
      <p className="text-muted">{labels.activities.add.sections.whenwhere.subtitle}</p>
      <Row className="g-4">
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
        <label htmlFor="mainCategory" className="form-label text-muted">{labels.activities.activityType} *</label>
        <ChoicesFormInput 
        className={`form-control ${errors.activityType ? 'is-invalid' : ''}`}
        multiple
        name="activityType"
        control={control}
        placeholder={labels.activities.activityType}
        >
            <option value="Choice 1" defaultChecked>
              Choice 1
            </option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
          </ChoicesFormInput>
        </Col>
        <Col md={4}>
        <label htmlFor="mainCategory" className="form-label text-muted">{labels.activities.additionalActivityTypes} *</label>
        <ChoicesFormInput 
        className={`form-control ${errors.activityType ? 'is-invalid' : ''}`}
        multiple
        name="secondaryActivityTypes"
        control={control}
        placeholder={labels.activities.additionalActivityTypes}
        >
            <option value="Choice 1" defaultChecked>
              Choice 1
            </option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </form>
  );
};

export default WhenWhere;