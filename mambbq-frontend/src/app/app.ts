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
  private apiUrl = 'http://localhost:5000/api/menu';

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
}