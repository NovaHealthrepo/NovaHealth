# Font Awesome 字体文件

请下载以下文件并放置在此目录：

1. **fa-solid-900.woff2** (Solid 图标字体)

   - 下载地址: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2

2. **fa-brands-400.woff2** (品牌图标字体)
   - 下载地址: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2

## 下载方法

### 方法 1: 使用浏览器

直接在浏览器中打开上述 URL，文件会自动下载

### 方法 2: 使用 PowerShell

在此目录运行以下命令：

```powershell
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" -OutFile "fa-solid-900.woff2"
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2" -OutFile "fa-brands-400.woff2"
```

下载完成后，删除此 README.md 文件即可。
