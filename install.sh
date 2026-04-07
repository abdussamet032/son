#!/bin/bash
# son kurulum scripti

INSTALL_DIR="$HOME/bin"
mkdir -p "$INSTALL_DIR"
cp son "$INSTALL_DIR/son"
chmod +x "$INSTALL_DIR/son"

# PATH'te yoksa ekle
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
  echo 'export PATH="$HOME/bin:$PATH"' >> "$HOME/.zshrc"
  echo "~/.zshrc'ye PATH eklendi. Terminali yeniden aç veya: source ~/.zshrc"
fi

echo "Kurulum tamam. Terminalde 'son' yazarak kullanabilirsin."
