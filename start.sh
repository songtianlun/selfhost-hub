#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# 添加执行权限
chmod +x import-services.sh

# 创建必要的目录
print_message "创建必要的目录..."
mkdir -p static/images/services
mkdir -p themes/selfhosthub/static/css

# 安装依赖
if [ ! -d "node_modules" ]; then
  print_message "正在安装依赖..."
  npm install
  print_success "依赖安装完成"
else
  print_message "依赖已安装，跳过此步骤"
fi

# 生成CSS
print_message "正在生成CSS文件..."
npx tailwindcss -i ./themes/selfhosthub/assets/scss/main.scss -o ./themes/selfhosthub/static/css/main.css

print_success "CSS文件生成完成"

# 询问是否导入现有服务
read -p "是否导入现有服务？[y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  print_message "正在导入服务..."
  ./import-services.sh
  print_success "服务导入完成"
fi

# 重新构建项目
print_message "正在重新构建项目..."
hugo --cleanDestinationDir
print_success "项目构建完成"

# 启动开发服务器
print_message "正在启动开发服务器..."
hugo server -D --disableFastRender 