const mongoose = require('mongoose');
require('dotenv').config();

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

const menuData = [
  // 1. NƯỚNG NGON CHUẨN VỊ
  { name: "Bò Tảng Aukube", price: 119000, category: "NƯỚNG NGON CHUẨN VỊ", tags: ["Món bán chạy"], imageUrl: "images/3.jpg" },
  { name: "Sườn Bò Mỹ", price: 119000, category: "NƯỚNG NGON CHUẨN VỊ", tags: ["Hot"] },
  { name: "Gù Hoa Bò Mỹ", price: 99000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Ba chỉ bò mỹ nướng", price: 99000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Bò cuộn măng tây", price: 89000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Bò cuộn nấm kim châm", price: 79000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Vú heo nướng", price: 99000, category: "NƯỚNG NGON CHUẨN VỊ", tags: ["Món bán chạy"], imageUrl: "images/5.jpg" },
  { name: "Ba rọi heo nướng", price: 79000, category: "NƯỚNG NGON CHUẨN VỊ", imageUrl: "images/6.jpg" },
  { name: "Heo cuộn măng tây", price: 89000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Heo cuộn nấm kim châm", price: 79000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Heo rừng nướng", price: 89000, category: "NƯỚNG NGON CHUẨN VỊ" },
  { name: "Chân gà nướng", price: 79000, category: "NƯỚNG NGON CHUẨN VỊ" },

  // 2. HẢI SẢN NƯỚNG
  { name: "Hàu sữa mỡ hành", price: 10000, unit: "con", category: "HẢI SẢN NƯỚNG", imageUrl: "images/2.jpg" },
  { name: "Hàu sữa phô mai", price: 15000, unit: "con", category: "HẢI SẢN NƯỚNG" },
  { name: "Hàu đại dương mù tạc", price: 25000, unit: "con", category: "HẢI SẢN NƯỚNG" },
  { name: "Hàu đại dương mỡ hành", price: 25000, unit: "con", category: "HẢI SẢN NƯỚNG" },
  { name: "Hàu đại dương phô mai", price: 30000, unit: "con", category: "HẢI SẢN NƯỚNG", tags: ["Hot"] },
  { name: "Bào ngư nướng mọi", price: 25000, unit: "con", category: "HẢI SẢN NƯỚNG", imageUrl: "images/4.jpg" },
  { name: "Bào ngư nướng mỡ hành", price: 27000, unit: "con", category: "HẢI SẢN NƯỚNG", tags: ["Hot"] },
  { name: "Tôm nướng", price: 89000, category: "HẢI SẢN NƯỚNG", options: ["BBQ", "Muối ớt"] },
  { name: "Khô mực nướng", price: 149000, category: "HẢI SẢN NƯỚNG" },
  { name: "Mực 1 nắng nướng", price: 179000, category: "HẢI SẢN NƯỚNG", options: ["Mọi", "Muối ớt"] },

  // 3. MẦM XÀO XẠC
  { name: "Gỏi Mầm Bò", price: 99000, category: "MẦM XÀO XẠC", tags: ["Món bán chạy"] },
  { name: "Gỏi Môn Bò", price: 99000, category: "MẦM XÀO XẠC", tags: ["Hot"] },
  { name: "Bò lúc lắc", price: 99000, category: "MẦM XÀO XẠC" },
  { name: "Tôm hấp", price: 139000, category: "MẦM XÀO XẠC" },
  { name: "Tôm sốt thái", price: 169000, category: "MẦM XÀO XẠC", tags: ["Món bán chạy"], imageUrl: "images/7.jpg" },
  { name: "Khoai Tây Chiên", price: 39000, category: "MẦM XÀO XẠC" },
  { name: "Đậu hủ tẩm hành", price: 49000, category: "MẦM XÀO XẠC" },
  { name: "Măng tây xào tỏi", price: 79000, category: "MẦM XÀO XẠC" },
  { name: "Chân gà chiên mắm", price: 89000, category: "MẦM XÀO XẠC" },
  { name: "Cánh gà chiên mắm", price: 89000, category: "MẦM XÀO XẠC" },
  { name: "Cá trứng chiên giòn", price: 89000, category: "MẦM XÀO XẠC" },
  { name: "Nghêu hấp", price: 69000, category: "MẦM XÀO XẠC", options: ["Hấp xả", "Hấp Thái"] },
  { name: "Sụn Gà", price: 109000, category: "MẦM XÀO XẠC", options: ["Cháy tỏi", "Chiên mắm", "Rang muối"] },
  { name: "Ốc hương", price: 59000, unit: "lạng", category: "MẦM XÀO XẠC", options: ["Rang muối", "Cháy tỏi", "Hấp xả", "Xào bơ bắp"] },
  { name: "Khô mực chiên mắm", price: 159000, category: "MẦM XÀO XẠC" },
  { name: "Khô cá chỉ vàng", price: 69000, category: "MẦM XÀO XẠC", options: ["Nướng", "Chiên"] },
  { name: "Khô cá lãi trứng chiên", price: 69000, category: "MẦM XÀO XẠC" },

  // 4. NO NÊ CĂNG BỤNG
  { name: "Mì xào bò", price: 79000, category: "NO NÊ CĂNG BỤNG" },
  { name: "Mì xào hải sản", price: 89000, category: "NO NÊ CĂNG BỤNG" },
  { name: "Cơm chiên cá mặn", price: 69000, category: "NO NÊ CĂNG BỤNG" },
  { name: "Cơm chiên dưa bò", price: 79000, category: "NO NÊ CĂNG BỤNG" },
  { name: "Cơm chiên hải sản", price: 89000, category: "NO NÊ CĂNG BỤNG", imageUrl: "images/1.jpg" },
  { name: "Cơm chiên cồi sò điệp", price: 119000, category: "NO NÊ CĂNG BỤNG" },

  // 5. UỐNG THẢ GA
  { name: "Bia Sài Gòn", price: 16000, unit: "chai/lon", category: "UỐNG THẢ GA" },
  { name: "Bia Ken lùn", price: 21000, unit: "chai/lon", category: "UỐNG THẢ GA" },
  { name: "Bia Tiger Bạc", price: 22000, unit: "chai/lon", category: "UỐNG THẢ GA" },
  { name: "Rượu Mơ", price: 45000, category: "UỐNG THẢ GA" },
  { name: "Nước suối", price: 10000, category: "UỐNG THẢ GA" },
  { name: "Red bull", price: 18000, category: "UỐNG THẢ GA" },
  { name: "Nước ngọt", price: 15000, category: "UỐNG THẢ GA", options: ["Sting", "7up", "Coca", "Pepsi", "Xá xị"] }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('⏳ Đang kết nối lên Cloud để cập nhật MENU ĐẦY ĐỦ...');
    await MenuItem.deleteMany({}); 
    await MenuItem.insertMany(menuData); 
    console.log('🎉 XONG! Toàn bộ thực đơn Mầm BBQ đã lên sóng!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Có lỗi xảy ra:', err);
    process.exit(1);
  });