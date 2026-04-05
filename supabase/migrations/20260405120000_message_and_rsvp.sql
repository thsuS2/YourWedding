-- YourWedding — 축하 메시지(message) · 참석의사(rsvp)
-- Supabase 대시보드 → SQL Editor 에서 전체 실행
--
-- Realtime: message 테이블만 INSERT 구독(useMessages). rsvp는 저장만 사용.

-- ---------------------------------------------------------------------------
-- 1) message — 축하 메시지 (MessageBoard: name, relationship, message)
-- ---------------------------------------------------------------------------
create table if not exists public.message (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship text not null default '친구',
  message text not null,
  created_at timestamptz not null default now()
);

comment on table public.message is '모바일청첩장 축하 메시지';
comment on column public.message.relationship is '작성자와의 관계 등 (UI 고정값 가능)';

create index if not exists message_created_at_idx on public.message (created_at desc);

alter table public.message enable row level security;

drop policy if exists "message_select_public" on public.message;
drop policy if exists "message_insert_public" on public.message;

create policy "message_select_public"
  on public.message
  for select
  to anon, authenticated
  using (true);

create policy "message_insert_public"
  on public.message
  for insert
  to anon, authenticated
  with check (true);

grant select, insert on public.message to anon, authenticated;

-- 실시간 새 글 반영 (재실행 시 중복 등록 방지)
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'message'
  ) then
    alter publication supabase_realtime add table public.message;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 2) rsvp — 참석의사 (RSVPModal: side, name, companion, meal)
-- ---------------------------------------------------------------------------
create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  side text not null,
  name text not null,
  companion integer,
  meal text not null,
  created_at timestamptz not null default now(),
  constraint rsvp_side_check check (side in ('신랑측', '신부측')),
  constraint rsvp_meal_check check (meal in ('예정', '미정')),
  constraint rsvp_companion_nonneg check (companion is null or companion >= 0)
);

comment on table public.rsvp is '참석의사 전달';

create index if not exists rsvp_created_at_idx on public.rsvp (created_at desc);

alter table public.rsvp enable row level security;

drop policy if exists "rsvp_select_public" on public.rsvp;
drop policy if exists "rsvp_insert_public" on public.rsvp;

create policy "rsvp_select_public"
  on public.rsvp
  for select
  to anon, authenticated
  using (true);

create policy "rsvp_insert_public"
  on public.rsvp
  for insert
  to anon, authenticated
  with check (true);

grant select, insert on public.rsvp to anon, authenticated;
