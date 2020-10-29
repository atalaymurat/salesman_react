import React from 'react'
import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'
import 'react-phone-number-input/style.css'
import Axios from 'axios'
import { connect } from 'react-redux'
import { hideError, isSubmitting, editUser, setMessage } from '../../actions'
import { withRouter } from 'react-router'
import { Container } from 'react-bootstrap'


const UserInfoForm = (props) => {
  const { user } = props
  const initialValues = {
    name: {
      first: '',
      last: '',
    },
  }
  const getUser = () => (user ? user : initialValues)
  const formik = useFormik({
    initialValues: getUser(),
    validationSchema: Yup.object().shape({
      name: Yup.object().shape({
        first: Yup.string()
          .max(20, 'En fazla 20 karakter olamalı.')
          .min(2, 'En az 2 karekter olmalı.')
          .required('Ad gereklidir.'),
        last: Yup.string()
          .max(20, 'En fazla 20 karakter olamalı.')
          .min(2, 'En az 2 karekter olmalı.')
          .required('Soyad gereklidir.'),
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
            <legend>İsim</legend>
            <div className="form-group row mb-2">
              <label
                htmlFor="first"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Ad Soyad
              </label>
              <div className="col">
                <input
                  id="first"
                  name="name.first"
                  type="text"
                  className={
                    getIn(formik.errors, 'name.first')
                      ? 'form-control is-invalid'
                      : getIn(formik.touched, 'name.first')
                      ? 'form-control is-valid'
                      : 'form-control'
                  }
                  placeholder="Ad"
                  {...formik.getFieldProps('name.first')}
                />
                {getIn(formik.errors, 'name.first') ? (
                  <small className="text-danger">
                    {formik.errors.name.first}
                  </small>
                ) : null}
              </div>
              <div className="col">
                <input
                  id="last"
                  name="name.last"
                  type="text"
                  placeholder="Soyad"
                  className={
                    getIn(formik.errors, 'name.last')
                      ? 'form-control is-invalid'
                      : getIn(formik.touched, 'name.last')
                      ? 'form-control is-valid'
                      : 'form-control'
                  }
                  {...formik.getFieldProps('name.last')}
                />
                {getIn(formik.errors, 'name.last') ? (
                  <small className="text-danger">
                    {formik.errors.name.last}
                  </small>
                ) : null}
              </div>
            </div>
            <button type="submit" className="btn btn-sm btn-primary mb-2">
              Kaydet
            </button>
            <button
              className="btn btn-sm btn-danger ml-2 mb-2"
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
)(withRouter(UserInfoForm))
