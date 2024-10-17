
# Cennet Dünyası - IndexPage (Heaven's World - IndexPage)

**Cennet Dünyası** uygulaması, dünyanın farklı cennet köşelerini keşfetmeniz için kategorilere ayrılmış destinasyonlar sunar. 
(Known as "Heaven's World" app, this application offers categorized destinations to explore the world's paradise locations.) 
Kullanıcılar, kategorilere göre gezilecek yerleri filtreleyebilir ve arama çubuğuyla hızlıca erişim sağlayabilirler.
(Users can filter travel destinations by category and access them quickly with the search bar.)

## İçindekiler (Contents)

- [Özellikler (Features)](#özellikler)
- [Ekran Görüntüleri (Screenshots)](#ekran-görüntüleri)
- [Kurulum (Setup)](#kurulum)
- [Kullanılan Teknolojiler (Technologies Used)](#kullanılan-teknolojiler)
- [Yapılandırma Dosyaları (Configuration Files)](#yapılandırma-dosyaları)
- [Katkıda Bulunma (Contribution)](#katkıda-bulunma)
- [Lisans (License)](#lisans)

## Özellikler (Features)

- **Kategoriye Göre Filtreleme (Filter by Category):** TÜMÜ, Dağ, Plaj, Şehir vb. kategorilere göre listelenen destinasyonları filtreleyin.
(Filter the displayed destinations by categories such as ALL, Mountain, Beach, City, etc.)
- **Arama Fonksiyonu (Search Function):** Arama çubuğunu kullanarak destinasyon adlarına göre arama yapın.
(Use the search bar to find destinations by name.)
- **Profil ve Bildirim Erişimi (Profile & Notifications):** Üst çubuktan profil ve bildirim simgelerine erişin.
(Access profile and notification icons from the top bar.)

## Ekran Görüntüleri (Screenshots)

| Özellik (Feature)        | Görüntü (Screenshot) |
|--------------------------|----------------------|
| **Ana Sayfa (Homepage)** | ![Ana Sayfa](path/to/your/homepage-screenshot.png) |
| **Profil Butonu (Profile Button)** | ![Profil](path/to/your/profile-screenshot.png) |
| **Kategori Butonları (Category Buttons)** | ![Kategori](path/to/your/category-screenshot.png) |

> Ekran görüntülerini `path/to/your/screenshot.png` yerine kendi proje dizininize göre düzenlemelisiniz.
(Replace `path/to/your/screenshot.png` with your project’s directory structure.)

## Kurulum (Setup)

1. Projeyi klonlayın: (Clone the project:)
   ```bash
   git clone https://github.com/kullaniciadi/cennet-dunyasi.git
   cd cennet-dunyasi
   ```
2. Gerekli bağımlılıkları yükleyin: (Install dependencies:)
   ```bash
   npm install
   ```
3. Expo uygulamasını başlatın: (Start the Expo app:)
   ```bash
   expo start
   ```

## Kullanılan Teknolojiler (Technologies Used)

- **React Native** - Mobil uygulama geliştirme (Mobile app development)
- **Expo** - React Native için hızlı geliştirme ve test (Quick development and testing for React Native)
- **TypeScript** - Güçlü tip desteği ve kod kalitesini artırma (Robust type support and code quality)
- **React Navigation** - Ekranlar arası geçiş sağlama (Screen-to-screen navigation)

## Yapılandırma Dosyaları (Configuration Files)

- **`/data/destination.json`**: Tüm destinasyon verileri burada saklanır.
(All destination data is stored here.)
- **`/components/CategoryButtons`**: Kategori filtreleme butonları.
(Category filtering buttons.)
- **`/components/Listings`**: Listelenen destinasyonların gösterimi.
(Display of listed destinations.)

## Katkıda Bulunma (Contribution)

Projeye katkıda bulunmak isterseniz: (If you'd like to contribute to this project:)
1. Bu projeyi forklayın. (Fork this project.)
2. Kendi dallarınızda değişiklikler yapın. (Make changes in your branches.)
3. Değişikliklerinizi pull request ile gönderin. (Submit your changes with a pull request.)

## Lisans (License)

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasını inceleyin.
(This project is licensed under the MIT license. For more information, review the `LICENSE` file.)
