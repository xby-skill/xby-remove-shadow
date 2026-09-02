# xby-remove-shadow

DeepSeek Harness (DSH) 的插件：图像去阴影

检测并去除文档或照片中因拍摄角度、光线不均产生的阴影、投影与亮度渐变，输出清晰、干净、亮度均匀的高清效果，便于阅读、OCR识别、存档或后续处理，适用于翻拍文档、证件照与扫描件净化等场景。返回JSON格式数据，包含结果图片下载链接。

## 功能

- **set_xby_apikey** — 在聊天中设置 API 密钥（自动持久化，重启有效）
- **remove_shadow** — 检测并去除文档或照片中因拍摄角度、光线不均产生的阴影、投影与亮度渐变，输出清晰、干净、亮度均匀的高清效果，便于阅读、OCR识别、存档或后续处理，适用于翻拍文档、证件照与扫描件净化等场景。返回JSON格式数据，包含结果图片下载链接。 需要输入图片文件链接。
- **remove_shadow_for_data_base64** — 检测并去除文档或照片中因拍摄角度、光线不均产生的阴影、投影与亮度渐变，输出清晰、干净、亮度均匀的高清效果，便于阅读、OCR识别、存档或后续处理，适用于翻拍文档、证件照与扫描件净化等场景。返回JSON格式数据，包含结果图片下载链接。 需要输入图片文件的BASE64编码。
- **remove_shadow_for_data_file** — 检测并去除文档或照片中因拍摄角度、光线不均产生的阴影、投影与亮度渐变，输出清晰、干净、亮度均匀的高清效果，便于阅读、OCR识别、存档或后续处理，适用于翻拍文档、证件照与扫描件净化等场景。返回JSON格式数据，包含结果图片下载链接。 需要输入图片文件的文件路径。

## 安装

### 方式一：从 GitHub 直接安装（推荐）

```bash
# 格式: dsh plugin --profile <profile> add github:<owner>/<repo>
dsh plugin --profile web add github:xby_skill/xby-remove-shadow
```

### 方式二：从本地目录安装（开发模式）

```bash
# 仅用于本地开发调试
dsh plugin --profile web add /absolute/path/to/xby-remove-shadow
```

### 方式三：通过 cordis.patch.yml 开发调试

```bash
dsh web --profile web --patch /absolute/path/to/dsh-ocr-plugin/cordis.patch.yml
```



## 配置

### 获取 API 密钥

前往 [小笨羊官网](https://xiaobenyang.com) 注册并获取 API 密钥。
