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
import { basicInfoSchema } from '@/validation/contactValidation.tsx';
import { yupResolver } from '@hookform/resolvers/yup';

const BasicInfo = ({ formData, handleInputChange, onSubmit }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, // Allows setting values programmatically
  } = useForm({
    resolver: yupResolver(basicInfoSchema), // Validation schema
    defaultValues: formData, // Initialize with formData from parent
  });

  // Sync parent `formData` to React Hook Form
  React.useEffect(() => {
  if (formData) {
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key]); // Programmatically update form values
    });
  }
}, [formData, setValue]);

  const labels = useLabels();

   return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="fs-16 fw-semibold mb-1">{labels.contacts.personalInformation.label}</h4>
      <p className="text-muted">{labels.contacts.add.subtitle}</p>

      <Row className="g-4">
        {/* Display Name */}
        <Col md={4}>
          <div>
            <label htmlFor="displayName" className="form-label text-muted">{labels.contacts.displayName} *</label>
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <input 
                  {...field} 
                  type="text" 
                  className={`form-control ${errors.displayName ? 'is-invalid' : ''}`} 
                  placeholder={labels.contacts.displayName}
                />
              )}
            />
            {errors.displayName && <div className="invalid-feedback">{errors.displayName.message}</div>}
          </div>
        </Col>

        {/* First Name */}
        <Col md={4}>
          <div>
            <label htmlFor="firstName" className="form-label text-muted">{labels.contacts.firstName}</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input 
                  {...field} 
                  type="text" 
                  className="form-control" 
                  placeholder={labels.contacts.firstName}
                />
              )}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
          </div>
        </Col>
        
        {/* Last Name */}
        <Col md={4}>
          <div>
            <label htmlFor="lastName" className="form-label text-muted">{labels.contacts.lastName}</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input 
                  {...field} 
                  type="text" 
                  className="form-control" 
                  placeholder={labels.contacts.lastName}
                />
              )}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
          </div>
        </Col>

        {/* Relationship Type */}
        <Col md={6}>
          <div>
            <label htmlFor="contactType" className="form-label text-muted">{labels.contacts.relationship} *</label>
            <Controller
              name="contactType"
              control={control}
              defaultValue={formData.contactType || ''}
              rules={{
                required: 'Contact Type is required', // Validation rule
              }}
              render={({ field }) => (
                <select
                  {...field} // Spread field props (value, onChange, etc.)
                  className={`form-select ${errors.contactType ? 'is-invalid' : ''}`} // Add error styling
                >
                  <option value="">{labels.contacts.relationship}</option>
                  <option value="friend">{labels.contacts.categories.friends}</option>
                  <option value="partner">{labels.contacts.relationshipDepth.innerCircle}</option>
                  <option value="colleague">{labels.contacts.categories.apps}</option>
                  <option value="family">{labels.contacts.categories.family}</option>
                </select>
              )}
            />
            {errors.contactType && <div className="invalid-feedback">{errors.contactType.message}</div>}
          </div>
        </Col>

        {/* Gender */}
        <Col md={6}>
          <div>
            <label htmlFor="gender" className="form-label text-muted">{labels.contacts.genderOptions.label} *</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select 
                  {...field} 
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}>
                  <option value="">{labels.contacts.genderOptions.placeholder}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              )}
            />
            {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
          </div>
        </Col>

        {/* Met Date */}
        <Col md={6}>
          <div>
            <label htmlFor="metDate" className="form-label text-muted">{labels.contacts.metDate}</label>
            <Controller
              name="metDate"
              control={control}
              defaultValue={formData.metDate || ''} 
              render={({ field }) => (
                <CustomFlatpickr
                  {...field}
                  options={{ 
                    dateFormat: 'm-d-Y',
                    enableTime: false,
                  }}
                  placeholder={labels.contacts.metDate}
                  className="form-control"
                />
              )}
            />
          </div>
        </Col>

        {/* Met Source */}
        <Col md={6}>
          <div>
            <label htmlFor="metSource" className="form-label text-muted">{labels.contacts.metSource.label} *</label>
            <Controller
              name="metSource"
              control={control}
              render={({ field }) => (
                <select 
                  {...field} 
                  className={`form-select ${errors.metSource ? 'is-invalid' : ''}`}>
                  <option value="">{labels.contacts.metSource.placeholder}</option>
                  <option value="tinder">Tinder</option>
                  <option value="bumble">Bumble</option>
                  <option value="work">{labels.contacts.categories.apps}</option>
                  <option value="gym">Gym</option>
                </select>
              )}
            />
            {errors.metSource && <div className="invalid-feedback">{errors.metSource.message}</div>}
          </div>
        </Col>

        {/* Birthday */}
        <Col md={6}>
          <div>
            <label htmlFor="birthday" className="form-label text-muted">{labels.contacts.birthday}</label>
            <Controller
              name="birthday"
              control={control}
              defaultValue={formData.birthday || ''}
              render={({ field }) => (
                <CustomFlatpickr
                  {...field}
                  options={{ 
                    dateFormat: 'm-d-Y',
                    enableTime: false,
                  }}
                  placeholder={labels.contacts.birthday}
                  className="form-control"
                />
              )}
            />
            {errors.birthday && <div className="invalid-feedback">{errors.birthday.message}</div>}
          </div>
        </Col>

        {/* Age */}
        <Col md={6}>
          <div>
            <label htmlFor="age" className="form-label text-muted">{labels.contacts.age}</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <MaskedInput 
                  {...field}
                  mask={[/\d/, /\d/, /\d/]} 
                  placeholder="__" 
                  className="form-control" 
                />
              )}
            />
            {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
          </div>
        </Col>

        {/* Profile Picture */}
        <Col md={12}>
          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <DropzoneFormInput
                {...field}
                iconProps={{ icon: 'bx:cloud-upload', height: 36, width: 36 }}
                text={labels.contacts.profileImage}
                helpText={
                  <span className="text-muted fs-13">
                    {labels.validation.notesMax}
                  </span>
                }
                showPreview
              />
            )}
          />
        </Col>
      </Row>
    </form>
  );
};

export default BasicInfo
