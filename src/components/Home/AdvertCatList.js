import React from 'react'
import { connect } from 'react-redux'
import { hideError, hideMessage } from '../../actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import AdvertCatListItem from '../Leads/AdvertCatListItem'

const AdvertCatList = ({ leads, catName, catId, catTitle, history }) => {
  const catNumber = leads.filter(
    (f) =>
      (f.category &&
        f.category.path &&
        f.category.path.split(',')[1] === catId) ||
      (f.category && f.category._id === catId)
  ).length
  return (
    <div>
      <h1 className="h4 text-nowrap text-truncate">
        <Link
          className="text-decoration-none text-dark"
          to={`/makinalar/cat/${catName}`}
        >
          {catTitle}
        </Link>
        <div className="float-right">
            <Link className="text-wrap px-1" style={{ fontSize: 15 }} to={`/makinalar/cat/${catName}`}>
              Hepsi
           <span className="badge badge-primary ml-1">{catNumber}</span>
            </Link>
        </div>
      </h1>

      {leads
        .filter((lead) => lead.published)
        .filter(
          (f) =>
            (f.category &&
              f.category.path &&
              f.category.path.split(',')[1] === catId) ||
            (f.category && f.category._id === catId)
        )
        .slice(0, 5)
        .map((lead, i) => (
          <AdvertCatListItem lead={lead} key={i} history={history} />
        ))}
    </div>
  )
}
const mapStateToProps = (state) => ({
  leads: state.leads.allLeads,
})
const mapDispatchToProps = {
  hideMessage,
  hideError,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertCatList))
