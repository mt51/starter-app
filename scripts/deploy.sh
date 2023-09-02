#!/bin/bash

echo "开始更新代码"
rm -rf ~/sourcecode/hawk;

git clone --branch new-arch git@github.com:mt51/hawk.git ~/sourcecode/hawk --depth 1

echo "安装依赖"

cd ~/sourcecode/hawk

echo $(pwd)
# 安装依赖
pnpm i

sleep 2

echo "开始构建"
rm -rf ~/sourcecode/hawk/apps/server/dist
rm -rf ~/sourcecode/hawk/apps/client/dist

# 构建资源
pnpm run build

echo "开始部署"
rm -rf ~/apps/hawk

mkdir ~/apps/hawk

echo "复制资源"
# 复制构建资源
cp -r ~/sourcecode/hawk/apps/server/dist/. ~/apps/hawk
cp -r ~/sourcecode/hawk/apps/client/dist/. ~/apps/hawk
cp -r ~/sourcecode/hawk/apps/server/package.json ~/apps/hawk/package.json
cp -r ~/sourcecode/hawk/pnpm-lock.yaml ~/apps/hawk/pnpm.yaml

# 启动
echo "安装运行时依赖"
cd ~/apps/hawk
pnpm i

# 启动
echo "启动应用"
node ~/apps/hawk/start.js