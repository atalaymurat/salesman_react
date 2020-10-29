import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Treebeard, decorators } from 'react-treebeard'
import { Div } from '../../../node_modules/react-treebeard/dist/components/common'
import style from './treeStyles'

const Header = ({ onSelect, style, customStyles, node }) => {
  const iconType = node.children ? 'folder' : 'file-text'
  const iconClass = `fa fa-${iconType}`
  const iconStyle = { marginRight: '3px' }

  return (
    <div style={style.base} onClick={onSelect}>
      <Div
        style={
          node.selected
            ? { ...style.title, ...customStyles.header.title }
            : style.title
        }
      >
        <i className={iconClass} style={iconStyle} />
        {node.name} <span className="badge badge-secondary">{node.count}</span>
      </Div>
    </div>
  )
}

const CatMenu = (props) => {
  const [data, setData] = useState({})
  const [cursor, setCursor] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('/categories/catnav')
      const mapData = res.data.map((c) => ({ ...c, toggled: false }))

      const newData = {
        name: 'makinalar',
        _id: '1',
        toggled: true,
        children: mapData,
      }
      setData(newData)
      setLoaded(true)
    }
    getData()
  }, [])

  // Setting active menu item on reload
  useEffect(() => {
    if (data._id === '1') {
      onToggle(data, true)
    }
    if (data.children) {
      const pathCat = data.children.find((f) => f._id === props.catSelected)
      pathCat && onToggle(pathCat, true)
      !pathCat &&
        data.children.forEach((s) => {
          s.children.forEach((ss) => {
            if (ss._id === props.catSelected) {
              onToggle(s, true, true)
              onToggle(ss, true)
              return
            } else {
              if (ss.children) {
                ss.children.forEach((sss) => {
                  if (sss._id === props.catSelected) {
                    onToggle(s, true, true)
                    onToggle(ss, true, true)
                    onToggle(sss, true)
                    return
                  }
                })
                return
              }
            }
          })
        })
    }
  }, [loaded])

  const onToggle = (node, toggled, noactive) => {
    if (cursor) {
      cursor.active = false
    }
    noactive ? (node.active = false) : (node.active = true)
    if (node.children) {
      node.toggled = toggled
    }

    node._id !== '1' ? (data.active = false) : (data.active = true)

    setCursor(node)
    setData(Object.assign({}, data))
    props.setCatFromMenu(node._id)
  }

  return (
    <div>
      <Treebeard
        style={style}
        data={data}
        onToggle={onToggle}
        decorators={{ ...decorators, Header }}
      />
    </div>
  )
}

export default CatMenu
