# Unggah dan Manipulasi Gambar

Project ini adalah aplikasi React yang memungkinkan pengguna untuk mengunggah gambar, mengubah ukuran, memutar, dan membaliknya secara horizontal atau vertikal, serta menampilkannya di atas canvas. Aplikasi menggunakan React, Next.js, Axios untuk permintaan API, dan React Toastify untuk notifikasi.

## Fitur

- Unggah gambar dan tampilkan di canvas.
- Ubah ukuran canvas.
- Ubah ukuran gambar agar sesuai dengan canvas sambil mempertahankan rasio aspeknya.
- Putar gambar dengan jumlah derajat tertentu.
- Balik gambar secara horizontal atau vertikal.
- Tampilkan pesan kesalahan untuk tindakan yang tidak valid (mis., mengunggah file non-gambar, mengatur ukuran canvas di bawah dimensi minimum).

## Instalasi

1. Clone repository `git clone https://github.com/hackim18/canvas-upload-app.git`:
2. Install dependencies `npm install`:
3. Start development server `npm run dev`:
4. Buka browser Anda dan arahkan ke `http://localhost:3000`.

## Penggunaan

### Mengunggah Gambar

1. Klik tombol "Unggah Gambar" untuk memilih file gambar dari komputer Anda.
2. Setelah gambar diunggah, itu akan ditampilkan di atas canvas.
3. Jika file yang diunggah bukan gambar, pesan kesalahan akan ditampilkan.

### Mengubah Ukuran canvas

1. Masukkan lebar dan tinggi yang diinginkan untuk canvas di bagian "Canvas Properties".
2. Klik tombol "Ubah Ukuran" untuk menerapkan ukuran canvas baru.
3. Catatan: Ukuran canvas tidak boleh kurang dari 100x100 piksel.

### Mengubah Ukuran Gambar

1. Gambar akan secara otomatis diubah ukurannya agar sesuai dengan canvas sambil mempertahankan rasio aspeknya.

### Memutar Gambar

1. Masukkan rotasi yang diinginkan di bagian "Image Properties".
2. Gambar akan diputar sebesar jumlah derajat yang ditentukan.

### Membalik Gambar

1. Centang kotak "Flip Horizontal" untuk membalik gambar secara horizontal.
2. Centang kotak "Flip Vertical" untuk membalik gambar secara vertikal.

## Komponen

### `UploadPage.js`

Komponen utama untuk mengunggah gambar dan mengelola canvas serta properti gambar.

#### Properti

- `imageURL`
- `canvasSize`
- `imageProps`
- `rotation`
- `flipHorizontal`
- `flipVertical`

### `CanvasComponent.js`

Komponen untuk merender gambar di canvas dengan opsi untuk mengubah ukuran, memutar, dan membaliknya.

## Dependensi

- `react`
- `next`
- `axios`
- `react-toastify`

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Bootstrap](https://getbootstrap.com/)
