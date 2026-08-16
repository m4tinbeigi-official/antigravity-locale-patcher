# Antigravity 区域与语言修改工具

用于修补和绕过 macOS 上 Google Antigravity 桌面应用程序中位置/区域限制错误的自动化工具。

* [English documentation](README.md)

---

## 介绍
此修补程序修改了 Antigravity 桌面应用程序内部的本地 `app.asar` 归档。它在前端伪造浏览器窗口的时区和区域设置，并将相应的环境变量注入到基于 Go 的语言服务器进程中。这可以防止客户端应用程序抛出区域锁定警告（例如，“抱歉，此帐户不符合使用 Antigravity 的条件，因为它目前在您的位置不可用”）。

## 系统要求
* macOS
* Node.js & npm（用于解压和重新打包 ASAR 归档）
* 安装在 `/Applications/Antigravity.app` 中的 Google Antigravity

## 使用方法
1. 克隆此仓库：
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. 授予脚本执行权限：
   ```bash
   chmod +x patch.sh
   ```
3. 运行安装程序：
   ```bash
   ./patch.sh
   ```
4. 重新启动你的 Antigravity 应用程序。

## 开源协议
本仓储遵循 MIT 开源协议 - 详情请参阅 [LICENSE](LICENSE) 文件。
