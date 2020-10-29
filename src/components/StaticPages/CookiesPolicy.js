import React from 'react'

const CookiesPolicy = () => {
  return (
    <div className="container">
      <p>
        {process.env.REACT_APP_SITE_COM} adresindeki internet sitemizde yer alan
        bazı alanlarda çerezler kullanmaktayız. Site’de kullanılan çerezlerle
        benzer işlevlere sahip SDK’lar (Software Development Kit) da
        kullanılmaktadır. Bu Çerez Politikası (“Politika”), {process.env.REACT_APP_TITLE} tarafından
        yönetilen site için geçerli olup çerezler ve SDK’lar Politika’da
        açıklanan şekilde kullanılacaktır.
      </p>

      <h1>Sitemizde Kullanılan Çerezlere İlişkin Bilgiler</h1>
      <table>
        <tbody>
          <tr>
            <td>Zorunlu Çerezler</td>
            <td>
              Web sitemizin doğru biçimde çalışması için zorunludur. Örneğin,
              kimlik doğrulama, mevcut oturumunuz ile ilgili bilgilerin
              kaybolmaması gibi amaçlarla zorunlu çerezler kullanılmaktadır. Bu
              çerezler güvenlik ve doğrulama gibi amaçlar için kullanılmakta
              olup, herhangi bir pazarlama amacı doğrultusunda kullanılmaz.
            </td>
          </tr>
          <tr>
            <td>İşlevsellik İçin Gerekli Olan Çerezler</td>
            <td>
              Web sitemizi ziyaret eden kullanıcıların tercihlerini
              hatırlamasına olanak sağlayan çerezlerdir. Örneğin ziyaretçinin
              dil tercihi veya metin font boyu seçiminin hatırlanmasını sağlar.
              Bu tür çerezlerin kullanımına izin verilmemesi size özel bir
              özelliğin kullanılmamasına neden olabilir ve tercihlerinizi
              hatırlamasını engeller.
            </td>
          </tr>
          <tr>
            <td>Performans ve Analiz İçin Gerekli Olan Çerezler</td>
            <td>
              Web sitemizin geliştirilmesine yardımcı olan çerezlerdir. Bu tür
              çerezler, ziyaretçilerin site kullanımları hakkında bilgiler
              toplar, sitenin gerektiği gibi çalışıp çalışmadığının denetiminde
              ve alınan hataların tespitinde kullanılır.
            </td>
          </tr>
          <tr>
            <td>Hedefleme ve Reklam Çerezleri</td>
            <td>
              Bu çerezler web sitemizde veya sitemiz haricindeki mecralarda ürün
              ve hizmet tanıtımını yapmak, iş birliği yaptığımız ortaklarımızla
              birlikte size ilgili ve kişiselleştirilmiş reklamlar göstermek,
              reklam kampanyalarının etkinliğini ölçmek için kullanılır.
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Çerezler Nasıl Toplanır?</h2>
      <p>
        Veriler tarayıcılara eriştiğiniz cihazlarınız aracılığıyla toplanır.
        Toplanan bu bilgiler cihazlara özeldir. İstenildiği zaman kullanıcı
        tarafından silinebilmekte ve bilgilere erişim kapatılabilmektedir.
      </p>
      <h2>Gizlilik Politikamız</h2>
      <p>
        Gizliliğiniz bizim için önemlidir, gizlilik ve güvenlik haklarınız temel
        prensibimizdir.Bu kapsamda, kişisel verilerin korunmasına dair
        aydınlatma metnimize buradan ulaşabilirsiniz.
      </p>
      <h2>Çerezleri nasıl kontrol edebilirsiniz?</h2>
      <p>
        Bilgisayarınızda halihazırda bulunan çerezleri silebilir ve internet
        gezgininize çerez kaydedilmesini/yerleştirilmesini engelleyebilirsiniz.
        İnternet tarayıcıları çerezleri otomatik olarak kabul edecek şekilde ön
        tanımlıdır. Çerezleri yönetmek tarayıcıdan tarayıcıya farklılık
        gösterdiğinden ayrıntılı bilgi almak için tarayıcının veya uygulamanın
        yardım menüsüne bakabilirsiniz.
      </p>
    </div>
  )
}

export default CookiesPolicy
