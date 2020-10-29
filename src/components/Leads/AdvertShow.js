import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { CustomPlaceholder } from 'react-placeholder-image'
import { formingDate } from '../Helpers/helpers'
import LeadContactInfo from './LeadContactInfo'
import LeadPriceCard from './LeadPriceCard'
import { Helmet } from 'react-helmet'
import gmap from '../../icons8-maps.svg'
import SwiperCarousel from './LeadShowSwiper'

import * as actions from '../../actions'
import BootstrapCarousel from './BootstrapCarousel'

class AdvertShow extends React.Component {
  async componentDidMount() {
    this.props.hideError()
    const { id } = this.props.match.params
    await this.props.getAdvert(id)
  }

  handleDelete = async (id) => {
    let confirm = window.confirm(
      `[${this.props.advert.title}] adlı içeriği silmek istediğinize emin misin ?`
    )
    if (confirm) {
      await this.props.deleteAdvert(id)
      if (!this.props.errorMessage) {
        this.props.history.push('/')
      }
    }
  }
  componentWillUnmount() {
    this.props.hideMessage()
    this.props.advertReset()
  }

  render() {
    const { advert } = this.props
    if (advert && advert.brand && advert.price && advert.category) {
      return (
        <Container fluid="md" className="my-2 h-100">
          <Helmet>
            <title>{this.props.advert.title + ' ▷ makinaTr'} </title>
            <meta
              name="description"
              content={`${this.props.advert.brand.name} ${this.props.advert.modelType} ${this.props.advert.category.name} Model yılı: ${this.props.advert.modelYear} | Fiyat: ${this.props.advert.price.amount} ${this.props.advert.price.currency} | Durumu: ${this.props.advert.saleType} ➤ makinaTr.com`}
            />
            <meta name="author" content="MakinaTr, İstanbul, Türkiye"></meta>
            <meta name="language" content="tr"></meta>
            <meta name="robots" content="INDEX"></meta>
            <meta name="email" content="info@makinatr.com"></meta>

            <meta
              property="og:title"
              content={'▷ ' + this.props.advert.title}
            ></meta>
            <meta property="og:url" content={`http://makinatr.com/makinalar/${this.props.advert._id}`} />
            <meta
              property="og:description"
              content={`${this.props.advert.brand.name} ${this.props.advert.modelType} ${this.props.advert.category.name} Model yılı: ${this.props.advert.modelYear} | Fiyat: ${this.props.advert.price.amount} ${this.props.advert.price.currency} | Durumu: ${this.props.advert.saleType} ➤ makinaTr.com`}
            ></meta>
            <meta property="og:type" content="article"></meta>
            <meta
              property="og:image"
              content={
                this.props.advert.cover &&
                process.env.REACT_APP_API_HOST + this.props.advert.cover.url.mid
              }
            ></meta>
            <meta property="og:locale" content="tr_TR" />

          </Helmet>
          <Row>
            <Col className="border-left border-danger">
              <h1 className="h4 text-capitalize">{this.props.advert.title}</h1>
            </Col>
          </Row>
          <Row xs={1} lg={2} className="h-100">
            <Col className="mb-2 border h-100">
              {this.props.advert.images && this.props.advert.images.length ? (
                <SwiperCarousel
                  images={this.props.advert.images}
                  video={this.props.advert.youTube}
                />
              ) : (
                <CustomPlaceholder
                  width={640}
                  height={640}
                  className="img-fluid border"
                  text="makinaTr.com"
                />
              )}
            </Col>
            <Col className="mb-2 border">
              <Row>
                <Col sm={12} lg={6} className="mb-2">
                  <LeadPriceCard price={this.props.advert.price} />
                </Col>
                <Col sm={12} lg={6} className="mb-2">
                  <LeadContactInfo advert={this.props.advert} />
                </Col>
              </Row>

              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan="2" className="bg-gray text-center">
                      İlan Detayları
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">İlan No</th>
                    <td>
                      {this.props.advert.itemNo && this.props.advert.itemNo}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Yayın Tarihi</th>
                    <td className="text-nowrap text-truncate">
                      {formingDate(advert.created_at)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Durumu</th>
                    <td className="text-capitalize">
                      {this.props.advert.saleType && this.props.advert.saleType}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Marka</th>
                    <td className="text-capitalize">
                      {this.props.advert.brand && this.props.advert.brand.name}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Model Tipi</th>
                    <td className="text-capitalize">
                      {this.props.advert.modelType &&
                        this.props.advert.modelType}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Model Yılı</th>
                    <td className="text-capitalize">
                      {this.props.advert.modelYear &&
                        this.props.advert.modelYear}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Kategori</th>
                    <td className="text-capitalize">
                      {this.props.advert.category &&
                        this.props.advert.category.name}
                    </td>
                  </tr>
                  {this.props.advert.addressGoogle && (
                    <tr>
                      <th scope="row">Lokasyon</th>
                      <td>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            this.props.advert.addressGoogle
                          )}`}
                        >
                          <Row>
                            <Col xs={'auto'}>
                              <img src={gmap} alt="icon" />
                            </Col>
                            <Col className="">
                              <Col>
                                {this.props.advert.addressGoogle &&
                                  this.props.advert.addressGoogle}
                              </Col>
                              <Col className="">Haritada Göster</Col>
                            </Col>
                          </Row>
                        </a>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <th scope="row">Görüntülenme</th>
                    <td>
                      {this.props.advert.views && this.props.advert.views}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col className="mb-2 border">

            </Col>
            <Col className="mb-2 border"></Col>
          </Row>
          {/* User İşlemler Paneli Admin ONLY */}
          {this.props.auth.user.isAdmin ? (
            <Row>
              <Col className="mt-4">
                <Link
                  className="btn btn-primary text-uppercase btn-sm"
                  to={`/makinalar/edit/${this.props.advert._id}`}
                >
                  Düzenle
                </Link>
                <button
                  className="btn btn-danger text-uppercase btn-sm float-right"
                  onClick={() => this.handleDelete(this.props.advert._id)}
                >
                  Sil
                </button>
              </Col>
            </Row>
          ) : null}
        </Container>
      )
    } else {
      return <Container>Yükleniyor</Container>
    }
  }
}
function mapStateToProps(state) {
  return {
    advert: state.leads.currentLead,
    errorMessage: state.err.error,
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, actions))(AdvertShow)
