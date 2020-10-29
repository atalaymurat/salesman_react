import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'react-phone-number-input/style.css'
import Axios from 'axios'
import { connect } from 'react-redux'
import { hideError, isSubmitting, editUser, setMessage } from '../../actions'
import { withRouter } from 'react-router'
import { Container } from 'react-bootstrap'
import PhoneNumber from './FormPhoneNumber'

const UserPhoneForm = (props) => {
  const { user } = props
  const initialValues = {
    phone: {
      mobile: '',
      business: '',
      company: '',
    },
  }
  const getUser = () => (user ? user : initialValues)
  const formik = useFormik({
    initialValues: getUser(),
    validationSchema: Yup.object().shape({
      phone: Yup.object().shape({
        mobile: Yup.string().required('Telefon gereklidir.'),
      }),
    }),
    onSubmit: async (values, actions) => {
      const postData = async (data) => await Axios.patch('/users/update', data)
      const res = await postData(values)
      // alert(JSON.stringify(res))
      if (res.data.success) {
        props.editUser(res.data.user)
        props.setMessage(res.data.message)
        props.history.push('/panel/user/info')
      }
    },
    enableReinitialize: true,
  })
  const handleCancel = () => {
    props.history.push('/panel/user/info')
  }

  return (
    <Container>
      <div className="col-12 p-2 mb-2">
        <form onSubmit={formik.handleSubmit}>
          <fieldset className="border border-dark px-4">
            <legend>İletişim Telefonları</legend>
              <PhoneNumber
                label="Mobil"
                formik={formik}
                id="phoneMobile"
                name="phone.mobile"
                onChange={(e) => formik.setFieldValue('phone.mobile', e)}
                value={formik.values.phone.mobile}
                placeholder="Cep Telefonu"
              />
              <PhoneNumber
                label="İş"
                formik={formik}
                id="phoneBusiness"
                name="phone.business"
                onChange={(e) => formik.setFieldValue('phone.business', e)}
                value={formik.values.phone.business}
                placeholder="İş Telefonu"
              />
              <PhoneNumber
                label="Firma"
                formik={formik}
                id="phoneCompany"
                name="phone.company"
                onChange={(e) => formik.setFieldValue('phone.company', e)}
                value={formik.values.phone.company}
                placeholder="Firma Telefonu"
              />

            <button type="submit" className="btn btn-sm btn-primary my-2">
              Kaydet
            </button>
            <button
              className="btn btn-sm btn-danger ml-2 my-2"
              onClick={handleCancel}
            >
              İptal
            </button>
          </fieldset>
        </form>
      </div>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
})
const mapDispatchToProps = {
  hideError,
  isSubmitting,
  editUser,
  setMessage,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserPhoneForm))
