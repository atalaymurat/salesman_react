import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Container, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import AdvertCatListItem from './AdvertCatListItem'
import { Helmet } from 'react-helmet'
import CatMenu from './CatMenu'
import { useDispatch, useSelector } from 'react-redux'
import { sideBarToggle } from '../../actions/index'
import SideBar from '../SideBar/SideBar'
import BackDrop from '../SideBar/BackDrop'


const LeadCatIndex = ({ history }) => {
  const sideBarOpen = useSelector((state) => state.main.sideBarOpen)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [catInfo, setCatInfo] = useState([])
  const [catId] = useState('1')
  const [catSelected, setCatSelected] = useState(catId)
  const dispatch = useDispatch()

  let { cat, sub, deep } = useParams()

  useEffect(() => {
    const loadCatData = async () => {
      const catData = await Axios.get('/categories/catnav')
      setCatInfo(catData.data)
      if (cat && !sub) {
        catData.data.forEach((c) => {
          if (c.name === cat) {
            setCatSelected(c._id)
          }
        })
      }
      if (cat && sub && !deep) {
        catData.data
          .filter((c) => c.name === cat)
          .forEach((cc) => {
            cc.children.forEach((cc) => {
              if (cc.name === sub) {
                setCatSelected(cc._id)
              }
            })
          })
      }
      if (cat && sub && deep) {
        catData.data
          .filter((c) => c.name === cat)
          .forEach((c) => {
            c.children.forEach((cc) => {
              if (cc.children) {
                cc.children.forEach((ccc) => {
                  if (ccc.name === deep) {
                    setCatSelected(ccc._id)
                  }
                })
              }
            })
          })
      }
    }
    loadCatData()
  }, [cat])

  const catIdToName = (id) => {
    let catName = ''
    if (id === '1') {
      catName = 'makinalar'
    }

    catInfo.forEach((cat) => {
      if (cat._id === id) {
        catName = cat.name
        return
      }
      if (cat.children) {
        cat.children.forEach((cc) => {
          if (cc._id === id) {
            catName = cat.name + '/' + cc.name
            return
          }
          if (cc.children) {
            cc.children.forEach((ccc) => {
              if (ccc._id === id) {
                catName = cat.name + '/' + cc.name + '/' + ccc.name
                return
              }
            })
          }
        })
      }
    })
    console.log('catIdToName: ', catName)
    return catName
  }

  const setCatFromMenu = (id) => {
    setCatSelected(id)
    history.push(`/makinalar/cat/${catIdToName(id)}`)
  }

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true)
        const res = await Axios.get(`/leads`)
        if (res.data.success) {
          setLeads(res.data.leads)
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }
    loadLeads()
    return () => {}
  }, [])

  let backdrop
  if (sideBarOpen) {
    backdrop = <BackDrop />
  }

  return loading || !leads.length ? (
    <div>Yükleniyor...</div>
  ) : (
      <Container className="p-2">
        <Helmet>
          <title>{cat + ' ▷ makinaTr'}</title>
          <meta
            name="description"
            content={`Satılık 2. el ${cat} ➤ makinaTr.com`}
          />
          <meta name="author" content="MakinaTr, İstanbul, Türkiye"></meta>
          <meta name="language" content="tr"></meta>
          <meta name="robots" content="INDEX"></meta>
          <meta name="email" content="info@makinatr.com"></meta>

          <meta property="og:title" content={'▷ ' + cat}></meta>
          <meta
            property="og:description"
            content={`Satılık 2. el ${cat} ➤ makinaTr.com`}
          ></meta>
          <meta property="og:type" content="website"></meta>
        </Helmet>
        <Row>
          <SideBar show={sideBarOpen}
          setCatFromMenu={setCatFromMenu}
          catSelected={catSelected}
          />
          {backdrop}
          <Col xs={12}>
          </Col>
          <Col md={4} className="d-none d-md-block">
            <CatMenu
              setCatFromMenu={setCatFromMenu}
              catSelected={catSelected}
            />
          </Col>
          <Col md={8}>
            <Col xs={12} className="pl-0 d-md-none">
            <button onClick={() => dispatch(sideBarToggle())} className="btn btn-primary">Kategoriler</button>
            </Col>
            <h1 className="h3 text-capitalize">{deep || sub || cat}</h1>
            {catSelected === '1'
              ? leads.map((lead) => (
                  <AdvertCatListItem
                    lead={lead}
                    key={lead._id}
                    history={history}
                  />
                ))
              : leads
                  .filter(
                    (f) =>
                      f.category._id === catSelected ||
                      f.category.pathArray.includes(catSelected)
                  )
                  .map((lead) => (
                    <AdvertCatListItem
                      lead={lead}
                      key={lead._id}
                      history={history}
                    />
                  ))}
          </Col>
        </Row>
      </Container>
  )
}

export default withRouter(LeadCatIndex)
