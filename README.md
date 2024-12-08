# 志工打卡系統 (Volunteer Work System)

這是一個專為志工服務設計的打卡系統，提供簡單易用的介面來管理志工的服務時數。

## 功能特點

- 📱 LINE 登入整合
- 🔄 QR Code 快速打卡
- 📊 服務時數統計
- 📝 打卡記錄查詢
- 👥 志工管理
- 📈 數據報表

## 技術架構

### 前端

- React + TypeScript
- Vite
- Material-UI
- React Router
- OpenAPI TypeScript Client

### 後端

- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- OpenAPI/Swagger

## 開始使用

### 前端開發

```bash
# 進入前端目錄
cd frontend

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### 後端開發

```bash
# 進入後端目錄
cd backend

# 安裝依賴
npm install

# 啟動開發服務器
npm run start:dev
```

## LINE LIFF 本地開發設置

為了在本地開發環境中測試 LINE Login 功能，我們需要使用 ngrok 來創建一個可供 LINE Login 重定向的公開 URL。

### 安裝 ngrok

請訪問 [ngrok 官網](https://ngrok.com/) 下載並安裝。

### 啟動 ngrok

```bash
# 啟動 ngrok 並轉發到本地開發服務器
npm run ngrok
```

當前免費 ngrok 網域：[intimate-sharply-hedgehog.ngrok-free.app](intimate-sharply-hedgehog.ngrok-free.app)

## 環境變數設置

### 前端 (.env)
```
VITE_API_URL=http://localhost:3000  # 開發環境
VITE_API_URL=https://volunteer-work-system.zeabur.app  # 生產環境
```

### 後端 (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-jwt-secret
LINE_CLIENT_ID=your-line-client-id
LINE_CLIENT_SECRET=your-line-client-secret
```

## API 文檔

- 開發環境：`http://localhost:3000/api`
- 生產環境：`https://volunteer-work-system.zeabur.app/api`

## 部署

本系統使用 Zeabur 進行部署：
- 前端：`https://volunteer.zeabur.app`
- 後端：`https://volunteer-work-system.zeabur.app`

## 系統架構

(非 monorepo，只是放在相同目錄下)

```
frontend/
├── src/
│   ├── admin/          # 管理員頁面
│   ├── auth/           # 認證相關
│   ├── volunteer/      # 志工相關頁面
│   ├── dataProvider/   # API 調用
│   └── openapi/        # API 類型定義
│
backend/
├── src/
│   ├── auth/           # 認證模組
│   ├── check-ins/      # 打卡模組
│   ├── users/          # 用戶模組
│   └── common/         # 共用模組
```


## 授權

MIT License