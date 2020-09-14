import React, { useState, useEffect } from 'react'
import { getCatPath } from './Helpers/helpers'
import Axios from 'axios'
import adminGuard from './HOCs/adminGuard'

const CategoriesAdmin = (props) => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [parent, setParent] = useState('')
  const [catId, setCatId] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCat = await Axios.post('/categories/', {
      name,
      parent: parent === '/' ? null : parent,
    })
    console.log('NEW CAT', newCat)
    setCategories([...categories, newCat.data.category])
    setName('')
    setParent('/')
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    await Axios.patch(`/categories/${catId}`, { name, parentId: parent })
    const cats = await Axios.get('/categories')

    setCategories(cats.data)
    setIsEditMode(false)
    setName('')
    setParent('/')
  }

  useEffect(() => {
    const getCategories = async () => {
      const cat = await Axios.get('/categories')
      setCategories(cat.data)
    }
    getCategories()
  }, [])
  const handleDelete = async (id) => {
    console.log(id)
    const res = await Axios.delete(`/categories/${id}`)
    if (res.data.success) {
      const cat = await Axios.get('/categories/')
      setCategories(cat.data)
    }
  }
  const setEditMode = (id) => {
    const catToEdit = categories.find((item) => item._id === id)
    setName(catToEdit.name)
    setParent(catToEdit.parentId)
    setCatId(catToEdit._id)
    console.log('Now in Edit Mode', catToEdit)
    setIsEditMode(!isEditMode)
  }
  const getPath = (cat) => {
    return getCatPath(cat, categories)
  }

  return (
    <div>
      {isEditMode ? (
        <form onSubmit={handleUpdate}>
          <h4>Düzenle</h4>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Kategori</label>
            <div className="col-sm-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase())}
                className="form-control form-control-sm"
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Üst Kategorisi</label>
            <div className="col-sm-8">
              <select
                value={parent || '/'}
                className="form-control form-control-sm"
                onChange={(e) => setParent(e.target.value)}
              >
                <option value="">/</option>
                {categories
                  .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))
                  .map(
                    (item) =>
                      item.depth <= 1 && (
                        <option value={item._id} key={item._id}>
                          {getPath(item)}
                        </option>
                      )
                  )}
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Kaydet"
            className="btn btn-sm btn-success mr-2"
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setIsEditMode(false)}
          >
            İptal
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2">
          <h4>Yeni Kategori Ekle</h4>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Kategori</label>
            <div className="col-sm-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase())}
                className="form-control form-control-sm"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Üst Kategorisi</label>
            <div className="col-sm-8">
              <select
                value={parent || '/'}
                className="form-control form-control-sm"
                onChange={(e) => setParent(e.target.value)}
              >
                <option value="">/</option>
                {categories
                  .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))

                  .map(
                    (item) =>
                      item.depth <= 1 && (
                        <option key={item._id} value={item._id}>
                          {getPath(item)}
                        </option>
                      )
                  )}
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Kaydet"
            className="btn btn-sm btn-success mr-2"
          />
        </form>
      )}

      <hr />
      <h1>Kategoriler</h1>
      <ul className="list-unstyled">
        {categories
          .filter((item) => item.depth === 0)
          .sort((a, b) => (getPath(a) > getPath(b) ? 1 : -1))
          .map((item, index) => (
            <li key={item._id}>
              <div
                className={
                  index % 2 === 0
                    ? 'bg-silver text-white mb-2 border border-dark p-2'
                    : 'p-2 bg-gray text-dark mb-2'
                }
              >
                <span className="h3 text-capitalize">{item.name}</span>
                <button
                  className="badge badge-danger mx-2"
                  onClick={() => handleDelete(item._id)}
                >
                  Sil
                </button>
                {!isEditMode && (
                  <button
                    className="badge badge-warning"
                    onClick={() => setEditMode(item._id)}
                  >
                    Düzenle
                  </button>
                )}
                <ul>
                  {categories
                    .filter((cat) => cat.parentId === item._id)
                    .map((i) => (
                      <li key={i._id}>
                        <span className="h4 text-capitalize">{i.name}</span>
                        <button
                          className="badge badge-danger mx-2"
                          onClick={() => handleDelete(i._id)}
                        >
                          Sil
                        </button>
                        {!isEditMode && (
                          <button
                            className="badge badge-warning"
                            onClick={() => setEditMode(i._id)}
                          >
                            Düzenle
                          </button>
                        )}
                        <ul>
                          {categories.filter(
                            (subCat) => subCat.parentId === i._id
                          ).length >= 1 &&
                            categories
                              .filter((subCat) => subCat.parentId === i._id)
                              .map((x) => (
                                <li key={x._id}>
                                  <span className="h5 text-capitalize">
                                    {x.name}
                                  </span>
                                  <button
                                    className="badge badge-danger mx-2"
                                    onClick={() => handleDelete(x._id)}
                                  >
                                    Sil
                                  </button>
                                  {!isEditMode && (
                                    <button
                                      className="badge badge-warning"
                                      onClick={() => setEditMode(x._id)}
                                    >
                                      Düzenle
                                    </button>
                                  )}
                                </li>
                              ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default adminGuard(CategoriesAdmin)
