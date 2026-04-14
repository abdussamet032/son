# Release Süreci

Yeni bir özellik eklediğinde, bu özellik canlıya 3 yerde çıkar: **GitHub**, **Homebrew** ve **Website**.

---

## Hızlı Özet (TL;DR)

```bash
# 1. Yeni özellik geliştir, commit at
git add . && git commit -m "feat: my new feature"

# 2. Yeni tag oluştur (HEAD'deki commit'e)
git tag -a v1.x.x -m "v1.x.x"

# 3. Tag'i GitHub'a push et
git push origin v1.x.x

# 4. GoReleaser ile her şeyi yayınla
goreleaser release --clean
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

### 4. GoReleaser Çalıştır

```bash
# GITHUB_TOKEN environment variable gerekli
# gh auth login yapıldıysa otomatik kullanır

goreleaser release --clean
```

Bu komut şunları yapar:
- Binary'leri build eder (darwin/amd64, darwin/arm64, linux/amd64, linux/arm64)
- GitHub Release oluşturur ve binary'leri yükler
- Homebrew formula oluşturur (`dist/homebrew/son.rb`)
- Checksum hesaplar

**Eğer GitHub API hata verirse** (502, 500 gibi geçici hatalar):
```bash
# Binary'leri build et, yayınlama
goreleaser release --clean --skip=publish

# Sonra binary'leri manuel yükle
gh release upload v1.x.x dist/son_1.x.x_darwin_amd64.tar.gz --repo abdussamet032/son
gh release upload v1.x.x dist/son_1.x.x_darwin_arm64.tar.gz --repo abdussamet032/son
gh release upload v1.x.x dist/son_1.x.x_linux_amd64.tar.gz --repo abdussamet032/son
gh release upload v1.x.x dist/son_1.x.x_linux_arm64.tar.gz --repo abdussamet032/son
gh release upload v1.x.x dist/checksums.txt --repo abdussamet032/son
```

### 5. Homebrew Tap'ini Güncelle

GoReleaser homebrew formula'yı `dist/homebrew/son.rb` dosyasına yazar. Bu dosyayı `homebrew-tap` reposuna pushla:

```bash
# homebrew-tap reposunu çek (yoksa clone et)
gh repo clone abdussamet032/homebrew-tap /tmp/homebrew-tap

# Formula'yı kopyala
cp dist/homebrew/son.rb /tmp/homebrew-tap/Formula/son.rb

# Commit ve push
cd /tmp/homebrew-tap
git add Formula/son.rb
git commit -m "son v1.x.x"
git push
```

### 6. Website Güncellemeleri

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

## Örnek: v1.3.0 Yayınlama

```bash
# 1. Kodu commit et
git add .
git commit -m "feat: add workspace templates"

# 2. Tag oluştur
git tag -a v1.3.0 -m "v1.3.0 — workspace templates"

# 3. Push et
git push origin v1.3.0

# 4. GoReleaser çalıştır
goreleaser release --clean

# 5. Homebrew güncelle
gh repo clone abdussamet032/homebrew-tap /tmp/homebrew-tap
cp dist/homebrew/son.rb /tmp/homebrew-tap/Formula/son.rb
cd /tmp/homebrew-tap && git add . && git commit -m "son v1.3.0" && git push

# 6. Website güncelle (varsa)
# ... guide ekle, feature ekle ...
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
