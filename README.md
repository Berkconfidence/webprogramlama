# Web Programlama Projesi

Bu proje, React tabanlı bir frontend, Spring Boot tabanlı bir backend ve MySQL veritabanı içeren tam yığın bir web uygulamasıdır. Tüm servisler Docker ve Docker Compose ile kolayca ayağa kaldırılabilir.

### Gereksinimler
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Ortamı Temizlemek (Opsiyonel)
Daha önce kurulum yaptıysanız ve veritabanını sıfırlamak istiyorsanız:
```bash
docker-compose down -v
```

### Uygulamayı Başlatmak
Tüm servisleri başlatmak için:
```bash
docker-compose up --build
```
İlk başlatmada gerekli imajlar oluşturulacak ve servisler otomatik olarak başlatılacaktır.

## Kullanım

- Frontend uygulamasına [http://localhost:3000/signup](http://localhost:3000/signup) adresinden erişebilirsiniz.
- Backend API'leri [http://localhost:8080](http://localhost:8080) üzerinden çalışır.
- MySQL veritabanı varsayılan olarak `root` kullanıcısı ve `root` şifresi ile `mydb` isimli veritabanında çalışır.

## Uygulama İçi Adımlar ve Özellikler

- İki farklı hesap oluşturup, bu hesaplar arasında etkileşim kurabilirsiniz. Giriş yaptıktan sonra, sağ üstteki profil fotoğrafınıza tıklayarak çıkış yapabilirsiniz.
- İlk kez giriş yaptığınızda, ekrandaki "Paylaş" sekmesinden yeni bir gönderi oluşturabilir ve bu gönderiyi ana sayfa veya profilinizde görüntüleyebilirsiniz. (webprogramlama/assets klasöründeki örnek görüntüler kullanılabilir.)
- Ana sayfadaki "Keşfet" bölümünde, tüm kullanıcıların eklediği gönderiler listelenir. Burada gönderilere tıklayarak beğenebilir veya yorum yapabilirsiniz.
- "Ara" ekranında, kullanıcıları kullanıcı adlarıyla aratıp profillerini inceleyebilirsiniz.
- Profil ekranında kendi gönderilerinizi görebilir ve kullanıcı bilgilerinizi güncelleyebilirsiniz.
- Sağ üstteki profil fotoğrafınıza tıklayarak e-posta ve şifrenizi değiştirebilir veya çıkış yapabilirsiniz.


## Docker yapısı

webprogramlama/
├── docker-compose.yml
├── webbackend/
│   ├── Dockerfile
│   └── src/...
├── webfrontend/
│   ├── Dockerfile
│   └── src/...

