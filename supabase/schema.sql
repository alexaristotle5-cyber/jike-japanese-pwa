-- 即刻日语 PWA 云端学习进度层
-- 静态句子、音频、图片不要进入数据库；数据库只保存用户动态进度。

create table if not exists public.user_learning_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_sentence_id text,
  current_unit text not null default 'n5-n4-0001-0025',
  daily_goal integer not null default 10 check (daily_goal between 1 and 200),
  total_learned integer not null default 0 check (total_learned >= 0),
  total_mastered integer not null default 0 check (total_mastered >= 0),
  last_active_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.sentence_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  sentence_id text not null,
  learned_status text not null default 'new',
  mastery_level integer not null default 0 check (mastery_level >= 0),
  review_count integer not null default 0 check (review_count >= 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  wrong_count integer not null default 0 check (wrong_count >= 0),
  fuzzy_count integer not null default 0 check (fuzzy_count >= 0),
  consecutive_known_count integer not null default 0 check (consecutive_known_count >= 0),
  last_review_at timestamptz,
  next_review_at timestamptz,
  is_high_risk boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, sentence_id)
);

create table if not exists public.user_app_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  music_enabled boolean not null default false,
  auto_play_audio boolean not null default false,
  reveal_translation_by_default boolean not null default false,
  daily_goal integer not null default 10 check (daily_goal between 1 and 200),
  updated_at timestamptz not null default now()
);

create index if not exists sentence_progress_user_next_review_idx
  on public.sentence_progress (user_id, next_review_at)
  where next_review_at is not null;

create index if not exists sentence_progress_user_updated_idx
  on public.sentence_progress (user_id, updated_at desc);

alter table public.user_learning_state enable row level security;
alter table public.sentence_progress enable row level security;
alter table public.user_app_settings enable row level security;

drop policy if exists "Users can read own learning state" on public.user_learning_state;
create policy "Users can read own learning state"
  on public.user_learning_state for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own learning state" on public.user_learning_state;
create policy "Users can insert own learning state"
  on public.user_learning_state for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own learning state" on public.user_learning_state;
create policy "Users can update own learning state"
  on public.user_learning_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own learning state" on public.user_learning_state;
create policy "Users can delete own learning state"
  on public.user_learning_state for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can read own sentence progress" on public.sentence_progress;
create policy "Users can read own sentence progress"
  on public.sentence_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own sentence progress" on public.sentence_progress;
create policy "Users can insert own sentence progress"
  on public.sentence_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own sentence progress" on public.sentence_progress;
create policy "Users can update own sentence progress"
  on public.sentence_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own sentence progress" on public.sentence_progress;
create policy "Users can delete own sentence progress"
  on public.sentence_progress for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can read own app settings" on public.user_app_settings;
create policy "Users can read own app settings"
  on public.user_app_settings for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own app settings" on public.user_app_settings;
create policy "Users can insert own app settings"
  on public.user_app_settings for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own app settings" on public.user_app_settings;
create policy "Users can update own app settings"
  on public.user_app_settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own app settings" on public.user_app_settings;
create policy "Users can delete own app settings"
  on public.user_app_settings for delete
  using (auth.uid() = user_id);

revoke all on public.user_learning_state from anon;
revoke all on public.sentence_progress from anon;
revoke all on public.user_app_settings from anon;
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.user_learning_state to authenticated;
grant select, insert, update, delete on public.sentence_progress to authenticated;
grant select, insert, update, delete on public.user_app_settings to authenticated;
