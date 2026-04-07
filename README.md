# son

Terminalde `son` yazınca son değiştirdiğin projeleri listeler, seçtiğini iTerm'de 3 split pane ile açar.

## Ne yapıyor?

1. Proje dizinindeki tüm projeleri tarar (git commit tarihine göre sıralar)
2. `fzf` ile fuzzy arama/seçim yaptırır — en son değiştirilen en üstte
3. Seçilen projeyi iTerm'de **1 pencere, 3 split pane** olarak açar

```
┌────────────────┬────────────────┐
│                │                │
│   Pane 1       │   Pane 2       │
│                │                │
│                ├────────────────┤
│                │                │
│                │   Pane 3       │
│                │                │
└────────────────┴────────────────┘
```

## Gereksinimler

- macOS
- [iTerm2](https://iterm2.com/)
- [fzf](https://github.com/junegunn/fzf) (`brew install fzf`)

## Kurulum

```bash
git clone https://github.com/abdussamet032/son.git
cd son
chmod +x install.sh
./install.sh
```

Veya manuel:

```bash
cp son ~/bin/son
chmod +x ~/bin/son
```

> `~/bin` dizininin PATH'te olduğundan emin ol.

## Yapılandırma

Script içindeki `DEV_ROOT` değişkenini kendi proje dizinine göre düzenle:

```bash
DEV_ROOT="$HOME/abdussametalisar/dev/github.com"
```

## Kullanım

```bash
son
```

Tüm projeler listelenir, fzf ile ara ve seç. iTerm otomatik açılır.
