import React, { useState } from 'react'
import { getCatPath } from '../Helpers/helpers'
import { useEffect } from 'react'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons'

const getChilds = (cat) => {
  if (!cat.children) return []
  return cat.children
}

const Tree = (props) => {
  const {
    input: { value },
  } = props
  const { cats } = props

  const parentArray = (item) => {
    let parents = item.path.split(',').filter((i) => i !== '')
    return parents
  }

  const getSelectedList = (list) => {
    let flatList = []
    list.map((item) => {
      flatList.push(item)
    })
    return flatList
  }
  return (
    <>
      {getSelectedList(cats)
        // .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))
        .map((cat) => (
          <ul className="list-unstyled" key={cat._id}>
            <TreeCat cat={cat} {...props} />
          </ul>
        ))}
    </>
  )
}
const TreeCat = (props) => {
  const {
    cat,
    onToggle,
    input: { value, onChange },
    meta: { touched, error },
  } = props

  return (
    <li key={cat._id}>
      <div className="form-check">
        <input
          className={
            touched
              ? (error && 'form-check-input is-invalid') ||
                (!error && 'form-check-input is-valid')
              : 'form-check-input'
          }
          type="radio"
          id={cat._id}
          value={cat._id}
          name={cat.name}
          onChange={(e) => onChange(e.target.value)}
          checked={value === cat._id ? true : false}
          // {value === item._id || props === item._id ? true : false}
          onSelect={() => onToggle(cat)}
        />
        <label className="form-check-label" htmlFor={cat._id}>
          {cat.name}
        </label>
        {cat.children && cat.depth < 2  && (
            <FontAwesomeIcon icon={cat.isOpen ? faFolderOpen : faFolder}
            style={{cursor: "pointer", marginLeft: "4px"}}
            onClick={() => onToggle(cat)}
            />
        )}

        {cat.isOpen && (
          <ul>
            {cat.isOpen &&
              getChilds(cat).map((cat2, i) => (
                <TreeCat {...props} cat={cat2} depth={cat2.depth} key={i} />
              ))}
          </ul>
        )}
      </div>
    </li>
  )
}

const SelectCatForm = (props) => {
  const {
    meta: { touched, error, warning },
    data,
  } = props
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setCategories(data)
  }, [data])

  const onToggle = (cat) => {
    const findCat = categories.find((c) => c._id === cat._id)
    if (!findCat) {
      categories.find((c) => {
        let newChildren = getChilds(c).map((sc) =>
          sc._id !== cat._id ? sc : { ...sc, isOpen: !sc.isOpen }
        )
        c.children = newChildren.length > 0 ? newChildren : null
        const newCats = categories.map((cats) =>
          cats._id === c._id ? c : cats
        )
        setCategories([...newCats])
      })
    }
    if (findCat) {
      const newCats = categories.map((cat) =>
        cat._id !== findCat._id ? cat : { ...cat, isOpen: !cat.isOpen }
      )
      setCategories([...newCats])
    }
  }

  const getPath = (cat) => {
    return getCatPath(cat, categories)
  }

  return (
    <div className="form-group">
      <span>Kategori</span>
      {touched &&
        ((error && (
          <div className="text-danger">
            <small>{error}</small>
          </div>
        )) ||
          (warning && (
            <div className="text-success">
              <small>{warning}</small>
            </div>
          )))}
      <Tree
        cats={categories}
        onToggle={onToggle}
        getPath={getPath}
        {...props}
      />
      <hr />
    </div>
  )
}
export default SelectCatForm
