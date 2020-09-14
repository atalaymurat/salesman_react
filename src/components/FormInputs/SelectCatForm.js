import React, { useState } from 'react'
import { getCatPath } from '../Helpers/helpers'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons'
import { update } from 'immupdate'

const getChilds = (cat) => {
  if (!cat.children) return []
  return cat.children
}

const Tree = (props) => {
  const {
    input: { value },
  } = props
  const { cats, getPath } = props

  const updateChildren = (cat) => {
    const newChildren = cat.children.map((c) =>
      c._id === value ? update(c, { isOpen: true }) : c
    )

    const newCat = update(cat, { children: newChildren })
    const hasIsOpen = cat.children.find((f) => f._id === value)

    const subs = []
    // Sub depth 2 lerını arraye atıyoruz
    cat.children.map((sub) => {
      if (sub.children) {
        sub.children.map((sub2) => {
          subs.push(sub2)
          return sub
        })
      }
      return sub
    })
    const hasValue = subs.find((f) => f._id === value)
    const idChild = hasValue ? hasValue.path.split(',')[2] : ''
    // Eger depth2 de değer var ise depth1 açık haline getiriyoruz
    const updChildren = newCat.children.map((c) =>
      c._id === idChild ? update(c, { isOpen: true }) : c
    )
    const updCat = update(newCat, { children: updChildren })

    if (hasIsOpen || hasValue !== undefined) {
      const newCatOpen = update(updCat, { isOpen: true })
      return newCatOpen
    }
    return newCat
  }

  const getSelectedList = (list) => {
    return list.map((cat) => {
      const newCat = cat.children ? updateChildren(cat) : cat
      const ifSelfSelected =
        newCat._id === value ? update(newCat, { isOpen: true }) : newCat
      return ifSelfSelected
    })
  }

  return (
    <>
      {getSelectedList(cats)
        .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))
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
    getPath,
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
        {cat.children && cat.depth < 2 && (
          <FontAwesomeIcon
            icon={cat.isOpen ? faFolderOpen : faFolder}
            style={{ cursor: 'pointer', marginLeft: '4px' }}
            onClick={() => onToggle(cat)}
          />
        )}

        {cat.isOpen && (
          <ul>
            {cat.isOpen &&
              getChilds(cat)
                .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))
                .map((cat2, i) => (
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
        return setCategories([...newCats])
      })
    }
    if (findCat) {
      const newCats = categories.map((cat) =>
        cat._id !== findCat._id ? cat : { ...cat, isOpen: !cat.isOpen }
      )
      return setCategories([...newCats])
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
