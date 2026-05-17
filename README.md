# 即刻日语 PWA

苹果手机竖屏优先的日语句子主动回忆与听力反推学习软件。当前版本采用：

- GitHub Pages / 静态站点：部署前端、图片、音频、句子数据、PWA 文件。
- Supabase：只保存用户产生的学习进度、复习状态和跨设备设置。
- localStorage：未登录、离线、同步前的本地优先进度层。

静态素材不会写入数据库，数据库也不会重复保存整套句子内容。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173/
```

如果 5173 被占用，Vite 会自动切换到可用端口，终端会显示实际地址。

## 环境变量

复制 `.env.example` 为 `.env.local`，填写 Supabase 的公开配置：

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

只允许放 Supabase Project URL 和 anon key。不要把 service role key 或任何服务端私钥写进前端环境变量。

GitHub Pages 如果部署在 `https://USER.github.io/REPO/`，构建时设置：

```env
VITE_BASE_PATH=/REPO/
```

如果部署在自定义域名根路径，可使用：

```env
VITE_BASE_PATH=/
```

不设置时默认使用 `./`，适合普通静态预览和相对路径部署。

## Supabase 数据库

SQL 文件位于：

```text
supabase/schema.sql
```

执行位置：

1. 打开 Supabase Dashboard。
2. 进入 SQL Editor。
3. 粘贴并运行 `supabase/schema.sql`。
4. 确认三张表 RLS 已开启。

当前表设计：

- `user_learning_state`：用户总学习状态，例如当前句子、当前单元、每日目标、已学数量、已掌握数量、最近活跃时间。
- `sentence_progress`：每句的学习和复习进度，例如掌握状态、复习次数、正确/错误/模糊次数、上次复习、下次复习、高风险标记。
- `user_app_settings`：需要跨设备保存的体验设置，例如背景音乐、自动播放、释义显示策略、每日学习数量。

RLS 策略：

- 每张表都启用 Row Level Security。
- `select / insert / update / delete` 都限制为 `auth.uid() = user_id`。
- 每个用户只能读取和修改自己的进度数据。

## 登录与同步

设置页中新增“账号同步”入口。

同步模式是本地优先：

- 未登录：学习和复习照常使用，进度写入 localStorage。
- 已登录：打开应用后读取云端进度，与本地进度合并，再回写本地和云端。
- 学习操作后：先立即更新本地状态，再异步同步 Supabase。
- 离线：继续写本地，标记为待同步；恢复联网后自动补同步。

合并策略：

- 总学习状态和设置使用 `updatedAt` 判断新旧。
- 单句记录逐条合并，保留更新时间较新的复习日期和状态。
- 计数字段取更大的值，评分历史去重后保留最近 30 条。
- 高风险标记取并集，目标是尽量不丢进度。

## 构建

```bash
npm run build
```

构建产物输出到：

```text
dist/
```

本地预览构建结果：

```bash
npm run preview
```

## GitHub Pages 部署

推荐流程：

1. 在仓库中配置 Supabase 环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BASE_PATH=/REPO/`
2. 执行 `npm ci && npm run build`。
3. 将 `dist/` 发布到 GitHub Pages。

部署注意：

- Vite `base` 已读取 `VITE_BASE_PATH`，适配项目子路径。
- `manifest.webmanifest` 使用相对路径，图标在 GitHub Pages 子路径下也能加载。
- service worker 使用当前部署 scope 注册，避免写死 `/sw.js`。
- 页面使用 hash 路由，例如 `/#study`，刷新不会丢路由。
- 背景图、视频、音频、图标都作为静态资源发布，不进入数据库。

## 第一版功能

- 首页、学习、复习、设置、账号同步
- 25 条句子学习数据与 25 条句子音频
- 背景音乐开关
- 主动回忆模式与听力反向模式
- 轻提示、解析上滑面板、三档评分
- localStorage 复习排程
- Supabase 登录后跨设备同步
- manifest、App icon、service worker 基础离线缓存

## 当前限制

- 登录方式使用 Supabase Magic Link，首次使用需要在 Supabase Auth 中确认邮箱登录配置。
- 当前云端同步是前端直连 Supabase，没有服务端审计层。
- 冲突合并以“不丢进度”为优先，复杂学习算法后续还可以继续细化。
- 静态素材体积较大时，GitHub Pages 首次加载会受网络影响。
