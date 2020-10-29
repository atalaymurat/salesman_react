import React, { useState, useEffect, useRef } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp as fasCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import {
  faCaretSquareUp as farCaretSquareUp,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'

import { required, minLength4 } from '../FormInputs/StandartInput'
import StandartInput from '../FormInputs/StandartInput.js'
import HorizantalInput from '../FormInputs/HorizantalInput.js'
import RowInput from '../FormInputs/RowInput.js'
import SelectCatForm from '../FormInputs/SelectCatForm.js'
import RadioInput from '../FormInputs/RadioInput'
import AutoSuggestBrands from '../Helpers/AutoSuggestBrands'
import PlacesInput from '../FormInputs/PlacesInput'
import Axios from 'axios'
import ImageDropzone from '../FormInputs/ImageDropzone'
import {
  isSubmitting,
  hideError,
  hideMessage,
  newAdvert,
  editAdvert,
  setError,
  getSuggestedBrands,
} from '../../actions'
import { Row, Col, Container } from 'react-bootstrap'
import {
  normalizeAmount,
  formatAmount,
  maxLength4,
  maxYear,
  minValue1800,
  minValue1,
  requiredSelect,
} from '../Helpers/helpers'
import youTubeIcon from '../../icons8-youtube.svg'

let AdvertForm = (props) => {
  const [images, setImages] = useState([])
  const [catData, setCatData] = useState([])
  const dispatch = useDispatch()
  const dropzoneRef = useRef()

  const submit = async (values) => {
    dispatch(isSubmitting(true))
    dispatch(hideError())
    dispatch(hideMessage())

    let resUpload = await dropzoneRef.current.upFiles()
    if (!resUpload) {
      dispatch(isSubmitting(false))
      dispatch(setError('Tekrar Deneyiniz, Bir hata oluştu'))
    }

    if (resUpload && !resUpload.success) {
      dispatch(isSubmitting(false))
      if (resUpload.error.response.status === 500) {
        dispatch(setError(resUpload.error.response.statusText))
        return
      } else {
        dispatch(setError(resUpload.error.response.data.error))
        return
      }
    }

    values['images'] = resUpload.images
    values.price
      ? (values.price.amount = normalizeAmount(values.price.amount))
      : (values.price = { amount: '', currency: '' })
    const path = props.location.pathname
    if (path === '/makinalar/new') {
      // Sending Data to Api
      dispatch(newAdvert(values))
    } else {
      // copy old images add new images to array
      values['images'] = [...values['images'], ...images]
      dispatch(editAdvert(values))
    }
    if (props.errorMessage) {
      dispatch(isSubmitting(false))
    } else {
      dispatch(isSubmitting(false))
      props.history.push('/panel/user/makinalar')
    }
  }

  const handleDeletePhoto = async (id) => {
    if (window.confirm('Lütfen Silme İşlemini Onaylayınız.')) {
      //Önce Fiziki olarak siliyoruz Api den ve DB den
      let res = await Axios.delete(`/images/${id}`)
      if (res.data.success) {
        let newImages = images.filter((item) => item._id !== id)
        setImages(newImages)
        if (id === props.cover._id) {
          props.cover._id = images[0]._id
        }
      } else {
        // Burda silinmediği ile ilğili geri bildirim yapmalı...
        return
      }
    }
  }
  useEffect(() => {
    const getImages = () => {
      if (props.leads.currentLead.images) {
        setImages(props.leads.currentLead.images)
      }
    }
    const getCatData = async () => {
      const cat = await Axios.get('/categories/tree')
      setCatData(cat.data.tree)
    }

    getImages()
    getCatData()
    dispatch(hideMessage())

    return () => {
      // Formdan Ayrılınca image ları sıfırla
      setImages([])
    }
  }, [props.leads.currentLead.images, dispatch])

  const { handleSubmit } = props
  return (
    <form
      onSubmit={handleSubmit(submit)}
      encType="multipart/form-data"
      className="mb-2"
    >
      <ImageDropzone ref={dropzoneRef} />

      {images.length > 0 && (
        <Container fluid className="bg-white my-2 border border-gray">
          <Row>
            {images &&
              images.map((image, index) => {
                return (
                  <Col xs="auto" key={index} className="border m-1">
                    <Row>
                      <img
                        src={
                          process.env.NODE_ENV !== 'development'
                            ? image.url &&
                              process.env.REACT_APP_API_HOST + image.url.thumb
                            : image.url && image.url.thumb
                        }
                        key={image._id}
                        className="img-thumbnail rounded-0 border-0"
                        height={150}
                        width={150}
                        alt={image.label}
                      />
                    </Row>
                    <Row>
                      <Col className="p-1">
                        <label className="form-check-label" htmlFor={image._id}>
                          <FontAwesomeIcon
                            icon={
                              image &&
                              props.cover &&
                              props.cover._id === image._id
                                ? fasCaretSquareUp
                                : farCaretSquareUp
                            }
                            size="lg"
                            style={{ cursor: 'pointer' }}
                          />
                        </label>
                        <Field
                          component="input"
                          type="radio"
                          name="cover._id"
                          value={image._id.toString()}
                          id={image._id}
                          className="form-check-input"
                          style={{ display: 'none', visibility: 'hidden' }}
                        />
                        <div
                          className="float-right"
                          onClick={() => handleDeletePhoto(image._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="lg"
                            className="fa-hover"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )
              })}
          </Row>
        </Container>
      )}
      <fieldset>
        <Field
          name="title"
          type="text"
          id="leadTitle"
          component={StandartInput}
          label="Başlık"
          validate={[required]}
        />
      </fieldset>
      <fieldset>
        <Field
          name="brand.name"
          type="text"
          component={AutoSuggestBrands}
          label="Marka"
          id="leadBrand"
          getSuggestedBrands={getSuggestedBrands}
          validate={[required]}
        />
      </fieldset>
      <fieldset>
        <Field
          name="modelType"
          type="text"
          component={HorizantalInput}
          label="Model Tipi"
          id="modelType"
          validate={[required]}
        />
      </fieldset>
      <fieldset>
        <Field
          name="modelYear"
          type="number"
          component={HorizantalInput}
          label="Model Yılı"
          id="modelYear"
          validate={[minLength4, maxLength4, required, maxYear, minValue1800]}
        />
      </fieldset>

      <div className="card mb-2 border-dark">
        <div className="card-body">
          <Field
            name="price.amount"
            component={RowInput}
            type="text"
            label="Fiyat"
            id="price"
            format={(v) => formatAmount(v)}
            validate={[required, minValue1]}
          />

          <div className="form-group row">
            <label className="col-2 col-form-label">Para Birimi</label>
            <div className="col-10">
              <Field
                name={'price.currency'}
                init={props.currency}
                component={RadioInput}
                type="radio"
                dataOptions={['tl', 'eur', 'usd']}
                className="form-check-input"
                validate={[requiredSelect]}
              />
            </div>
          </div>
        </div>
      </div>
      <Field
        name="category._id"
        component={SelectCatForm}
        data={catData}
        validate={[requiredSelect]}
      />
      <div className="form-group row">
        <label className="col-2 col-form-label">Makina Durumu</label>
        <div className="col-10">
          <Field
            name="saleType"
            component={RadioInput}
            init={props.saleType && props.saleType}
            dataOptions={['yeni', 'kullanılmış']}
            validate={[requiredSelect]}
          />
        </div>
      </div>
      <hr />
      <Field name="addressGoogle" component={PlacesInput} />
      <hr />
        <Field
          name="youTube"
          type="text"
          id="leadYouTube"
          component={HorizantalInput}
          label="You Tube Link"
          icon={youTubeIcon}
        />


      {!props.leads.isSubmitting ? (
        <div>
          <button
            className="btn btn-lg btn-success btn-block text-uppercase my-2"
            type="submit"
          >
            Kaydet
          </button>
          <button
            className="btn btn-lg btn-secondary btn-block text-uppercase my-2"
            onClick={() => props.history.push('/panel/user/makinalar')}
          >
            İptal
          </button>
        </div>
      ) : (
        <button className="btn btn-lg btn-danger btn-block text-uppercase my-2">
          Kaydediyor Lütfen Bekleyiniz...
        </button>
      )}
    </form>
  )
}

const selector = formValueSelector('advertForm')
AdvertForm = connect((state) => {
  // can select values individually
  const cover = selector(state, 'cover')
  const currency = selector(state, 'price.currency')
  const saleType = selector(state, 'saleType')
  return {
    cover,
    currency,
    saleType,
  }
})(AdvertForm)

export default reduxForm({ form: 'advertForm', enableReinitialize: true })(
  withRouter(AdvertForm)
)
