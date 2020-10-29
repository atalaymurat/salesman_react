const { default: Axios } = require('axios')
const { createWriteStream } = require('fs')
const { SitemapStream } = require('sitemap')

const getAdvertData = () => {
  return new Promise(async (res, rej) => {
    try {
      const response = await Axios.get('http://api.makinatr.com/leads')
      res(response.data.leads)
    } catch (err) {
      rej(err)
    }
  })
}

const routes = [
  '',
  '/register',
  '/signup',
  '/forget',
  '/reset',
  '/verify',
  '/makinalar/cat/Ah%C5%9Fap%20%C4%B0%C5%9Fleme%20Makinalar%C4%B1',
  '/makinalar/cat/Metal%20İşleme%20Makinaları',
  '/cerez-politikası',
  '/gizlilik-politikası',
]

getAdvertData()
  .then((data) => {
    data.forEach((ld) => routes.push(`/makinalar/${ld._id}`))
  })
  .then(() => {
    const sitemap = new SitemapStream({ hostname: 'http://makinatr.com' })

    const writeStream = createWriteStream('./public/sitemap.xml')
    sitemap.pipe(writeStream)
    routes.forEach((route) => {
      sitemap.write({ url: route, changefreq: 'daily', priority: 0.3 })
    })

    sitemap.end()
  })
  .catch((err) => console.error(err))

// Creates a sitemap object given the input configuration with URLs
