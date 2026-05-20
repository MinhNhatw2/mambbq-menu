import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, KeyValuePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  menuData: any = null;
  loading: boolean = true;
  error: string | null = null;

  // Địa chỉ API của Backend
  private apiUrl = 'https://mambbq-menu.onrender.com/api/menu';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMenu();
  }

  fetchMenu(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (data) => {
        this.menuData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi gọi API:', err);
        this.error = 'Không thể kết nối đến máy chủ nhà bếp.';
        this.loading = false;
      }
    });
  }

  // Hàm sắp xếp: Đẩy nhóm Nướng lên vị trí số 1
  sortCategory = (a: any, b: any): number => {
    if (a.key === 'NƯỚNG NGON CHUẨN VỊ') return -1;
    if (b.key === 'NƯỚNG NGON CHUẨN VỊ') return 1;
    return 0; // Giữ nguyên thứ tự các nhóm còn lại
  }
}