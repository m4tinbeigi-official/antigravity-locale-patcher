# Antigravity 区域与语言修改工具

用于修补和绕过 macOS 上 Google Antigravity 桌面应用程序中位置/区域限制错误的自动化工具。

* [English documentation](README.md)

---

## 介绍
此修补程序修改了 Antigravity 桌面应用程序内部的本地 `app.asar` 归档。它在前端伪造浏览器窗口的时区和区域设置，并将相应的环境变量注入到基于 Go 的语言服务器进程中。这可以防止客户端应用程序抛出区域锁定警告（例如，“抱歉，此帐户不符合使用 Antigravity 的条件，因为它目前在您的位置不可用”）。

## 系统要求
* macOS
* 安装好的 Google Antigravity（位于 `/Applications/Antigravity.app` 或 `~/Applications/Antigravity.app`）
* **不需要预先安装 Node.js**（安装程序会自动调用 Antigravity 内置的 Node.js，或者在需要时自动下载便携版 Node.js）。

## 使用方法

### 方法一：一键快速安装（推荐）
您不需要下载或克隆此仓库。只需打开终端，运行以下命令即可：
```bash
curl -sSL https://raw.githubusercontent.com/m4tinbeigi-official/antigravity-locale-patcher/main/patch.sh | bash
```
*(注意：如果您 macOS 上的应用程序文件夹没有写入权限，安装脚本将自动提示您输入密码，以便使用 sudo 提升权限)。*

### 方法二：手动安装
1. 克隆此仓库：
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. 授予执行权限并运行脚本：
   ```bash
   chmod +x patch.sh
   ./patch.sh
   ```
3. 重新启动你的 Antigravity 应用程序。

## 开源协议
本仓储遵循 MIT 开源协议 - 详情请参阅 [LICENSE](LICENSE) 文件。
