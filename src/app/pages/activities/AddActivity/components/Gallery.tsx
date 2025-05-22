import DropzoneFormInput from '@/components/form/DropzoneFormInput'
import MaskedInput from 'react-text-mask-legacy'
import { Col, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form';
import { useLabels } from '@/context/LabelsContext'
import { useFormContext } from "react-hook-form";
const GalleryForm = () => {
  const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      register
    } = useFormContext();
  const labels = useLabels();
  return (
    <DropzoneFormInput
      label={labels.activities.add.sections.gallery.subtitle}
      labelClassName="fs-14 mb-1"
      iconProps={{ icon: 'bx:cloud-upload', height: 36, width: 36 }}
      text="Drop files here or click to browse"
      helpText={
        <span className="text-muted fs-13">
          (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
        </span>
      }
      showPreview
    />
  )
}

export default GalleryForm
