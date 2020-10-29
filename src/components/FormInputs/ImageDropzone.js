import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import ReactDropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faFile } from '@fortawesome/free-regular-svg-icons'
import { ProgressBar } from 'react-bootstrap'
import Axios from 'axios'
import { hideError } from '../../actions'
import { useDispatch } from 'react-redux'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginBottom: 12,
}

const ImageDropzone = forwardRef((props, ref) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [validFiles, setValidFiles] = useState([])
  const [invalidFiles, setInvalidFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const dispatch = useDispatch()

  const handleDrop = async (files) => {
    if (files.length) {
      handleFiles(files)
    }
  }

  const anyValidToUpload = () => {
    let anyFileToUpload = validFiles.filter((item) => item.progress === 0)
    if (anyFileToUpload.length) {
      return true
    } else {
      return false
    }
  }

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        files[i] = Object.assign(files[i], {
          preview: URL.createObjectURL(files[i]),
          loading: false,
          progress: 0,
          cover: false,
        })
        setSelectedFiles((prevArray) => [...prevArray, files[i]])
      } else {
        files[i]['invalid'] = true
        setSelectedFiles((prevArray) => [...prevArray, files[i]])
        setInvalidFiles((prevArray) => [...prevArray, files[i]])
        setErrorMessage(
          `Lütfen siliniz, izin verilenler : [jpg, jpeg, png veya gif] `
        )
      }
    }
  }

  const validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ]
    if (validTypes.indexOf(file.type) === -1) {
      return false
    }
    return true
  }

  const removeFile = (name) => {
    const validFileIndex = validFiles.findIndex((e) => e.name === name)
    validFiles.splice(validFileIndex, 1)
    // update validFiles array
    setValidFiles([...validFiles])
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name)
    selectedFiles.splice(selectedFileIndex, 1)
    // update selectedFiles array
    setSelectedFiles([...selectedFiles])
    const invalidFileIndex = invalidFiles.findIndex((e) => e.name === name)
    // update invalidFiles array
    invalidFiles.splice(invalidFileIndex, 1)
    if (!invalidFiles.length) {
      dispatch(hideError())
    }
  }

  // MOST CRITICAL PART -------------------------
  useImperativeHandle(ref, () => ({
    async upFiles() {
      try {
        let res = await uploadToServer(validFiles)
        return { success: true, images: res }
      } catch (err) {
        return err
      }
    },
  }))

  const uploadToServer = (files) => {
    return new Promise(async (res, rej) => {
      try {
        let imageFiles = [...files]
        if (uploadedFiles.length) {
          const removeDupFiles = imageFiles.filter(
            (item) =>
              !uploadedFiles.find((img) => img.originalname === item.name)
          )
          imageFiles = [...removeDupFiles]
        }

        let uploadImgPromises = []
        for (let file of imageFiles) {
          const uploadImg = (file, cb) => {
            return new Promise(async (res, rej) => {
              try {
                let fd = new FormData()
                fd.append('image', file)
                let upImg = await Axios.post('/images', fd, cb)
                file.loading = false
                let newFiles = [...imageFiles]
                setValidFiles(newFiles)
                res(upImg.data.image)
              } catch (err) {
                console.error('FİLE LOAD ERR', err.response)
                file.loading = false
                file.progress = 0
                let newFiles = [...imageFiles]
                setValidFiles(newFiles)
                setSelectedFiles(newFiles)
                rej(err)
              }
            })
          }
          uploadImgPromises.push(
            uploadImg(file, {
              onUploadProgress: function (e) {
                file.progress = Math.round((e.loaded * 100) / e.total)
                let newFiles = [...imageFiles]
                setValidFiles(newFiles)
              },
            })
          )
        }
        let uploadData = await Promise.all(uploadImgPromises)

        setUploadedFiles([...uploadedFiles, ...uploadData])
        selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview))
        res(uploadData)
      } catch (err) {
        rej({ success: false, error: err })
      }
    })
  }
  // FINISH OF UPLOAD PROCESS

  const renderSelectedFiles = () => {
    const fileSize = (size) => {
      if (size === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(size) / Math.log(k))
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
    const fileType = (fileName) => {
      return fileName.split('.')[1] || fileName
    }
    return (
      <div className="container">
        {validFiles.map((data, i) => (
          <div className="d-flex flex-row mb-2" key={i}>
            <div className="file-type-logo mr-2">
              {data.preview ? (
                <img
                  src={data.preview}
                  style={{ maxHeight: 50 }}
                  alt={data.name}
                />
              ) : (
                <FontAwesomeIcon icon={faFile} size="lg" />
              )}
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-baseline">
                <div className="file-type small text-muted">
                  {fileType(data.name)}-
                </div>
                <div className={`small ${data.invalid ? 'text-danger' : ''}`}>
                  {data.name}
                </div>
                <div className="small text-muted"> ({fileSize(data.size)})</div>
                {data.invalid && (
                  <div className="ml-auto text-danger">({errorMessage})</div>
                )}
              </div>
              {data.progress > 1 && data.progress < 100 ? (
                <ProgressBar now={data.progress} label={`${data.progress}%`} />
              ) : null}
              {!data.loading && data.progress === 100 && (
                <ProgressBar
                  variant="success"
                  now={data.progress}
                  label={`${data.progress}%`}
                />
              )}
            </div>

            {!data.progress > 0 ? (
              <button
                type="button"
                className="ml-auto btn btn-danger btn-sm align-self-center mr-2"
                onClick={() => removeFile(data.name)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    // remove duplicate selected files and update valid files
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name)
      if (!x) {
        return file.concat([current])
      } else {
        return file
      }
    }, [])

    setValidFiles([...filteredArray])
  }, [selectedFiles])

  return (
    <ReactDropzone onDrop={handleDrop} noClick noKeyboard accept="image/*">
      {({ getRootProps, getInputProps, isDragActive, open }) => (
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })} style={baseStyle}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p style={{ color: 'green' }}>Bu alana bırakınız ...</p>
            ) : (
              <div className="text-center">
                <p>Fotografları Bu Alana Sürükleyip Bırakabilirsiniz...</p>
                <button
                  type="button"
                  className="btn btn-sm mx-auto btn-dark m-2"
                  onClick={open}
                >
                  {selectedFiles.length
                    ? 'Fotoğraf İlave Et'
                    : 'Fotoğrafları Seç'}
                </button>
              </div>
            )}
          </div>
          <div>{renderSelectedFiles()}</div>
          {anyValidToUpload() && validFiles.length && !invalidFiles.length ? (
            <div className="bg-success d-block text-uppercase my-2 text-center text-white">
              Dosyalar Yüklenmeye Hazır...
            </div>
          ) : (
            invalidFiles.length > 0 && (
              <div className="bg-danger d-block text-uppercase my-2 text-center text-white">
                Dosyaları Kontrol Ediniz...
              </div>
            )
          )}
        </section>
      )}
    </ReactDropzone>
  )
})

export default ImageDropzone
