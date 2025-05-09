#!/bin/bash

# 定义颜色变量
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

# 确保目录存在
ensure_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    print_message "Created directory: $1"
  fi
}

# 创建必要的目录
ensure_dir "content/services"
ensure_dir "content/en/services"
ensure_dir "static/images/services"

# 检查是否有源服务目录
if [ ! -d "../content/services" ]; then
  print_error "Source services directory not found at ../content/services"
  exit 1
fi

# 复制所有服务图片
print_message "Copying service images..."
cp -r ../public/images/services/* static/images/services/ 2>/dev/null || true
print_success "Service images copied successfully"

# 处理中文服务
print_message "Importing Chinese services..."
count_zh=0
for file in ../content/services/*.md; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    # 提取slug作为目录名
    slug="${filename%.md}"
    
    # 确保服务目录存在
    ensure_dir "content/services/$slug"
    
    # 复制并处理内容
    cat "$file" | sed 's/^---/---\ndate: '$(date +%Y-%m-%d)'\n/g' > "content/services/$slug/index.md"
    ((count_zh++))
  fi
done
print_success "Imported $count_zh Chinese services"

# 处理英文服务
print_message "Importing English services..."
count_en=0
if [ -d "../content/en/services" ]; then
  for file in ../content/en/services/*.md; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      # 提取slug作为目录名
      slug="${filename%.md}"
      
      # 确保服务目录存在
      ensure_dir "content/en/services/$slug"
      
      # 复制并处理内容
      cat "$file" | sed 's/^---/---\ndate: '$(date +%Y-%m-%d)'\n/g' > "content/en/services/$slug/index.md"
      ((count_en++))
    fi
  done
else
  print_warning "English services directory not found at ../content/en/services"
fi
print_success "Imported $count_en English services"

# 处理关于页面
print_message "Importing About pages..."
if [ -f "../content/about.md" ]; then
  ensure_dir "content/about"
  cat "../content/about.md" | sed 's/^---/---\ndate: '$(date +%Y-%m-%d)'\nlayout: about\n/g' > "content/about/index.md"
  print_success "Chinese About page imported"
else
  print_warning "Chinese About page not found"
fi

if [ -f "../content/en/about.md" ]; then
  ensure_dir "content/en/about"
  cat "../content/en/about.md" | sed 's/^---/---\ndate: '$(date +%Y-%m-%d)'\nlayout: about\n/g' > "content/en/about/index.md"
  print_success "English About page imported"
else
  print_warning "English About page not found"
fi

print_success "Import completed successfully! Imported $count_zh Chinese services and $count_en English services." 