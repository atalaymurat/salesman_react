import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { CustomPlaceholder } from 'react-placeholder-image';
import { formatAmountDisplay } from '../Helpers/helpers'

import * as actions from '../../actions'
import BootstrapCarousel from '../BootstrapCarousel'

class AdvertShow extends React.Component {
  async componentDidMount() {
    this.props.hideError()
    const { id } = this.props.match.params
    await this.props.getAdvert(id)
  }

  handleDelete = async (id) => {
    console.log('Handle DELETE Called', id)
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

  pad = (n) => {
    return n < 10 ? '0' + n : n
  }

  render() {
    const { advert } = this.props
    return (
      <Container fluid="md" className="mb-2">
        <Row>
          <Col>
            <h1>{this.props.advert.title}</h1>
          </Col>
        </Row>
        <Row xs={1} md={2}>
          <Col className="mb-2">
            {this.props.advert.images && this.props.advert.images.length ?
            <BootstrapCarousel images={this.props.advert.images} />
          :
          <CustomPlaceholder width={640} height={640} className="img-fluid border border-dark"
          text="makinaTr.com" />
          }
          </Col>
          <Col>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th className="bg-gray text-center">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-green text-center h3 text-uppercase">
                    {this.props.advert.price &&
                      formatAmountDisplay(this.props.advert.price.amount) +
                        ' ' +
                        this.props.advert.price.currency}
                  </td>
                </tr>
              </tbody>
            </Table>
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
                    {this.pad(new Date(advert.created_at).getDate())}/
                    {this.pad(new Date(advert.created_at).getMonth() + 1)}/
                    {new Date(advert.created_at).getFullYear()}{' '}
                    {this.pad(new Date(advert.created_at).getHours())}:
                    {this.pad(new Date(advert.created_at).getMinutes())}
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
                    {this.props.advert.modelType && this.props.advert.modelType}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Model Yılı</th>
                  <td className="text-capitalize">
                    {this.props.advert.modelYear && this.props.advert.modelYear}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Kategori</th>
                  <td className="text-capitalize">
                    {this.props.advert.category &&
                      this.props.advert.category.name}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Görüntülenme</th>
                  <td>{this.props.advert.views && this.props.advert.views}</td>
                </tr>
                <tr>
                  <th scope="row">Yayınlayan</th>
                  <td className="text-capitalize">
                    {this.props.advert.user &&
                      this.props.advert.user.local.email.split('@')[0]}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* User İşlemler Paneli Admin ONLY */}
        {this.props.auth.user.admin ? (
          <Row>
            <Col className="mt-4">
              <Link
                className="btn btn-primary text-uppercase btn-sm"
                to={`/adverts/edit/${this.props.advert._id}`}
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
