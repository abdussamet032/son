# Release Süreci

Yeni bir özellik eklediğinde, bu özellik canlıya 3 yerde çıkar: **GitHub**, **Homebrew** ve **Website**.

GitHub + Homebrew artık tamamen otomatik — sadece tag push'la, CI gerisini yapar.

---

## Hızlı Özet (TL;DR)

```bash
# 1. Yeni özellik geliştir, commit at, push'la
git add . && git commit -m "feat: my new feature"
git push origin main

# 2. Tag at ve push'la — GitHub Actions otomatik release yapar
git tag -a v1.x.x -m "v1.x.x"
git push origin v1.x.x
```

CI (`.github/workflows/release.yml`) tag push'unda şunları yapar:
- Binary'leri build eder (darwin/linux × amd64/arm64)
- GitHub Release oluşturur, binary'leri yükler
- `homebrew-tap` repo'sunda `Formula/son.rb`'yi yeni versiyona günceller

Birkaç dakika sonra `brew upgrade abdussamet032/tap/son` çalışır.

---

## İlk Kurulum (Tek Sefer)

CI'nin `homebrew-tap` repo'suna push edebilmesi için Personal Access Token gerek:

1. https://github.com/settings/tokens/new adresinden yeni classic token oluştur
   - Note: `goreleaser homebrew tap`
   - Scope: sadece `repo`
   - Expiration: No expiration (veya uzun süre)
2. Token'ı `son` repo'suna secret olarak ekle:
   ```bash
   gh secret set HOMEBREW_TAP_GITHUB_TOKEN --repo abdussamet032/son
   # prompt'a token'ı yapıştır
   ```

Bu yapıldıktan sonra tüm tag push'lar otomatik çalışır.

---

## Lokal Release (Acil Durum)

CI çalışmıyorsa veya hemen test etmen gerekiyorsa:

```bash
make release   # gh auth token'ı otomatik kullanır
```

---

## Adım Adım Açıklama

### 1. Kodu Commit Et

Yeni özellik kodunu yaz, test et, commit at.

```bash
git add .
git commit -m "feat: add my new feature"
```

Commit mesajları için [Conventional Commits](https://www.conventionalcommits.org/) formatını kullan:
- `feat:` — yeni özellik
- `fix:` — hata düzeltmesi
- `chore:` — temizlik, bağımlılık güncelleme
- `docs:` — dokümantasyon

### 2. Version Tag Oluştur

```bash
# Mevcut tagleri gör
git tag

# Son tag'e bak
git describe --tags

# Yeni tag oluştur (HEAD commit'ine)
git tag -a v1.x.x -m "v1.x.x — my new feature description"
```

**Önemli:** Tag mutlaka `v` prefix ile başlamalı (örn: `v1.3.0`).

Eğer yanlış commit'e tag attıysan:
```bash
# Tag'i sil (local)
git tag -d v1.x.x

# Doğru commit'e yeniden oluştur
git tag -a v1.x.x -m "v1.x.x" <correct-commit-hash>

# Force push et
git push origin v1.x.x -f
```

### 3. Tag'i GitHub'a Push Et

```bash
git push origin v1.x.x
```

### 4. CI Otomatik Çalışır

`v1.x.x` tag'i push edildiği anda `.github/workflows/release.yml` tetiklenir ve şunları yapar:
- Binary'leri build eder (darwin/linux × amd64/arm64)
- GitHub Release oluşturur, binary'leri yükler, checksums hesaplar
- `homebrew-tap` repo'sundaki `Formula/son.rb`'yi yeni versiyona günceller

İlerleyişi izle: https://github.com/abdussamet032/son/actions

### 5. Website Güncellemeleri

Yeni özellik website'de gösterilecekse:

#### Yeni Özellik Varsa (Features Grid)
`website/app/page.tsx` dosyasında `Features` bileşenini bul:

```tsx
const features = [
  // mevcut özellikler...
  {
    icon: <Icon />,
    title: "Feature Name",
    description: "Feature description.",
    color: "text-cyan",
  },
];
```

#### Yeni Guide Varsa
1. Yeni guide dosyası oluştur: `website/app/guides/[guide-slug]/page.tsx`
2. Guide'ı index'e ekle: `website/app/guides/page.tsx`

```tsx
{
  slug: "guide-slug",
  title: "Guide Title",
  description: "Guide description.",
  keywords: ["keyword1", "keyword2"],
  readTime: "5 min read",
  color: "from-cyan to-blue",
},
```

#### Website Build Et ve Deploy Et
Website Vercel'de otomatik deploy olur. Manuel deploy için:

```bash
cd website
npm install
npm run build
# Vercel CLI ile deploy
vercel --prod
```

---

## Örnek: v1.4.0 Yayınlama

```bash
# 1. Kodu commit et ve push'la
git add .
git commit -m "feat: add workspace templates"
git push origin main

# 2. Tag oluştur ve push'la — CI gerisini yapar
git tag -a v1.4.0 -m "v1.4.0 — workspace templates"
git push origin v1.4.0

# 3. (varsa) Website güncelle
cd website && npm run build && vercel --prod
```

---

## GoReleaser Konfigürasyonu

Detaylı ayarlar: `.goreleaser.yml`

```yaml
version: 2

before:
  hooks:
    - go mod tidy

builds:
  - main: .
    binary: son
    ldflags:
      - -s -w -X github.com/abdussamet032/son/internal/config.Version={{.Version}}

brews:
  - repository:
      owner: abdussamet032
      name: homebrew-tap
    name: son
```

---

## Troubleshooting

### "release failed: git tag v1.x.x was not made against commit..."
Tag yanlış commit'te. Tag'i sil ve doğru commit'e yeniden oluştur.

```bash
git tag -d v1.x.x
git tag -a v1.x.x -m "v1.x.x" <correct-commit>
git push origin v1.x.x -f
```

### Homebrew eski sürümü gösteriyor
```bash
brew update
brew upgrade abdussamet032/tap/son
```

### GoReleaser "unknown flag: --skip-publish" hatası
Eski versiyon. Güncelle:
```bash
brew upgrade goreleaser
```

### Binary checksum uyuşmuyor
Homebrew formula'daki SHA256 yanlış. Yeni formula ile güncelle:
```bash
# Formula'yı düzelt ve pushla
gh repo clone abdussamet032/homebrew-tap /tmp/homebrew-tap
cp dist/homebrew/son.rb /tmp/homebrew-tap/Formula/son.rb
cd /tmp/homebrew-tap && git add . && git commit -m "fix: correct sha256" && git push
```

---

## Notlar

- **Website version göstermiyor** — Website `brew install` komutunu gösterir, her zaman en son sürümü kurar. Manuel version badge eklemek istersen `website/app/layout.tsx` veya `website/app/page.tsx` dosyalarına `v1.x.x` ekle.
- **GoReleaser token** — `gh auth login` yapıldıysa `GITHUB_TOKEN` otomatik kullanılır.
- **Deploy sonrası** — GitHub release "Latest" olarak işaretlenir, Homebrew formulası otomatik güncellenir.
