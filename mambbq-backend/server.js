const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. KẾT NỐI MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối thành công với MongoDB Atlas (Cloud)!'))
  .catch(err => console.error('❌ Lỗi kết nối Database:', err));

// 2. ĐỊNH NGHĨA CẤU TRÚC MENU
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'phần' },
  category: { type: String, required: true },
  tags: [String],
  options: [String],
  imageUrl: { type: String }
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu_items');

// 3. API LẤY DANH SÁCH MENU GOM NHÓM THEO DANH MỤC
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    
    // Gom nhóm dữ liệu theo category
    const groupedMenu = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    // Trả về dữ liệu cho Frontend
    res.json({
      restaurantInfo: {
        name: "MẦM BBQ",
        slogan: "NƯỚNG NGON CHUẨN VỊ",
        address: "39 Nguyễn Du, Ấp 3, Tân Phú, Đồng Nai",
        phone: "0983691688",
        logoUrl: "images/logo.jpg" // Đã trỏ đúng vào thư mục images của bạn
      },
      menu: groupedMenu
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server không lấy được dữ liệu" });
  }
});

// 4. CHẠY SERVER NHÀ BẾP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy mượt mà tại cổng: ${PORT}`);
});