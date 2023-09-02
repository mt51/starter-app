#!/bin/bash

# 安装依赖
pnpm install
# 构建资源
pnpm run build

echo $(pwd)

mkdir dist

# 复制构建资源
cp -r ./apps/server/dist/* ./dist
cp -r ./apps/client/dist/* ./dist
cp -r ./apps/server/package.json ./dist/package.json
cp -r ./pnpm-lock.yaml ./dist/pnpm.yaml

# 启动
cd ./dist

pnpm i

node ./start.js