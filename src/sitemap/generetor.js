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
  '/makinalar/cat/Ahşap',
  '/makinalar/cat/metal',
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
