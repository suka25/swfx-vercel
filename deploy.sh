#!/bin/bash

# SWFX Deploy Script
echo "🚀 Deploying SWFX to swfx.kasteek.com..."

# Build
echo "📦 Building..."
npm run build

# Prepare deploy folder
echo "📁 Preparing deploy folder..."
rm -rf deploy
mkdir -p deploy/swfx

# Copy standalone files
echo "📋 Copying files..."
cp -r .next/standalone/* deploy/swfx/

# Copy static files (jika ada)
if [ -d ".next/static" ]; then
  mkdir -p deploy/swfx/.next
  cp -r .next/static deploy/swfx/.next/
fi

# Copy public
if [ -d "public" ]; then
  cp -r public deploy/swfx/
fi

# Copy package files
cp package.json deploy/swfx/
cp package-lock.json deploy/swfx/ 2>/dev/null || true

# Create .htaccess
cat > deploy/swfx/.htaccess << 'HTA'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTA

# Create .env.production
cat > deploy/swfx/.env.production << 'ENV'
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://swfx.kasteek.com
ADMIN_SECRET=swfx-admin-secret-2024
NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/swfxglobal
ENV

# Create server.js (standalone sudah punya)
# Buat package.json untuk production
cat > deploy/swfx/package.json << 'PKG'
{
  "name": "swfx",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
PKG

echo "✅ Deploy folder created at: deploy/swfx"

# Create zip menggunakan 7zip atau tar
echo "📦 Creating archive..."
if command -v zip &> /dev/null; then
  cd deploy && zip -r swfx.zip swfx/ && cd ..
elif command -v tar &> /dev/null; then
  cd deploy && tar -czf swfx.tar.gz swfx/ && cd ..
else
  echo "⚠️ No zip or tar found. Creating folder only."
  echo "📁 Deploy folder: deploy/swfx/"
fi

echo ""
echo "✅ Deploy complete!"
echo "📤 Upload deploy/swfx.zip (or tar.gz) to cPanel"
echo "📁 Extract in: public_html/swfx.kasteek.com/"
