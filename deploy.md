**Flow besarnya:**

1. Pastikan tools: Apache, Node.js, npm, git terinstall.
2. Clone repo ke `/var/www/nutrisiku-app`
3. Build React app.
4. Deploy hasil build ke `/var/www/html`

---

## **Step-by-Step**

### 1️⃣ Masuk ke VPS dengan Putty

### 2️⃣ Update sistem

```bash
apt update && sudo apt upgrade -y
```

### 3️⃣ Install Apache, Node.js, npm, git (cek & install jika belum ada)

#### Install Apache

```bash
apt install apache2 -y
```

#### Install Git

```bash
apt install git -y
```

#### Install Node.js & npm

Cek apakah sudah ada:

```bash
node -v
npm -v
```

Kalau belum, install:

```bash
apt install nodejs npm -y
```

(Atau kalau mau versi Node yang lebih baru: pakai `nvm`, tapi untuk tutorial ini cukup dari apt).

---

### 4️⃣ Clone Repo

Pastikan Apache bisa akses folder:

```bash
git clone https://github.com/agustinrahmawati03/nutrify-app.git /var/www/nutrisiku-app
```

---

### 5️⃣ Build React App

Masuk ke folder project:

```bash
cd /var/www/nutrisiku-app
```

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Hasil build akan ada di folder `dist/`

---

### 6️⃣ Deploy hasil build ke Apache

Backup isi default Apache dulu (opsional):

```bash
mv /var/www/html /var/www/html_backup
mkdir /var/www/html
```

Atau langsung hapus saja semua isi dari `/html` (Tanpa Backup)

```bash
rm -rf /var/www/html/*
```

Copy hasil build ke `/var/www/html`:

```bash
cp -r var/www/nutrisiku-app/* /var/www/html/
```

---

### 7️⃣ Set permission

Pastikan Apache bisa akses filenya:

```bash
chown -R www-data:www-data /var/www/html
```

---

### 8️⃣ Restart Apache

```bash
systemctl restart apache2
```

---

### 9️⃣ Install SSL (HTTPS)

#### 1. Install Certbot + Plugin Apache

```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

#### 2. Jalankan Certbot

```bash
sudo certbot --apache
```

Certbot akan:

- Scan semua VirtualHost.
- Mendeteksi domain dari config Apache kamu (walau `ServerName` kosong).
- Kamu bisa isi domain secara manual saat diminta (ex: `nutrisiku.my.id`).
- Certbot akan otomatis membuat file SSL baru `000-default-le-ssl.conf`.

### 9.3. Tes SSL

Setelah selesai:

- Akses: `https://nutrisiku.my.id`
- Cek pakai `curl`:

```bash
curl -I https://nutrisiku.my.id
```

Harus return `HTTP/2 200` atau `HTTP/1.1 200 OK`

### 9.4. Tes Renewal otomatis

```bash
sudo certbot renew --dry-run
```
