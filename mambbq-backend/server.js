require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. CẤU HÌNH CORS (MỞ CỬA CHO VERCEL VÀO)
// ==========================================
app.use(cors({
    origin: '*' // Dấu * nghĩa là cho phép mọi tên miền đều lấy được thực đơn
}));
app.use(express.json());

// ==========================================
// 2. KẾT NỐI CƠ SỞ DỮ LIỆU MONGODB
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối thành công với kho nguyên liệu MongoDB!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// ==========================================
// 3. ĐỊNH NGHĨA KHUNG DỮ LIỆU MÓN ĂN
// ==========================================
const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  unit: String,
  category: String,
  tags: [String],
  options: [String],
  imageUrl: String
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu_items');

// ==========================================
// 4. API LẤY THỰC ĐƠN CHO KHÁCH QUÉT QR
// ==========================================
app.get('/api/menu', async (req, res) => {
  try {
    // Thông tin cố định của quán Mầm BBQ
    const restaurantInfo = {
      name: "MẦM BBQ",
      slogan: "NƯỚNG NGON CHUẨN VỊ",
      address: "39 Nguyễn Du, Ấp 3, Tân Phú, Đồng Nai",
      phone: "0983691688",
      logoUrl: "https://i.ibb.co/FLMkYp4b/logo.jpg"
    };

    // Lấy toàn bộ món ăn từ Database
    const items = await MenuItem.find({});

    // Thuật toán chia món ăn vào từng nhóm (Category)
    const menuByCategory = {};
    items.forEach(item => {
      if (!menuByCategory[item.category]) {
        menuByCategory[item.category] = [];
      }
      menuByCategory[item.category].push(item);
    });

    // Trả cục dữ liệu hoàn chỉnh về cho điện thoại
    res.json({
      restaurantInfo: restaurantInfo,
      menu: menuByCategory
    });

  } catch (error) {
    console.error("Lỗi khi dọn món:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
});

// ==========================================
// 5. KHỞI ĐỘNG NHÀ BẾP
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Nhà bếp đang rực lửa tại cổng ${PORT}`);
});