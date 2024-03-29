create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "username" text,
    "avatar" text,
    "is_guest" boolean default false
);


alter table "public"."profiles" enable row level security;

create table "public"."rooms" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "players" text[] not null,
    "current_player" text not null,
    "is_over" boolean not null default false,
    "last_played_at" timestamp with time zone,
    "board" json not null
);


alter table "public"."rooms" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX rooms_pkey ON public.rooms USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."rooms" add constraint "rooms_pkey" PRIMARY KEY using index "rooms_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.gen_random_text()
 RETURNS text
 LANGUAGE plpgsql
AS $function$DECLARE
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
BEGIN
  FOR i IN 1..6 LOOP
    result := result || chars[1 + floor(random() * (array_length(chars, 1) - 1))];
  END LOOP;
  return result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_random_username()
 RETURNS text
 LANGUAGE plpgsql
AS $function$DECLARE
  numrows int;
  result text;
BEGIN
  result = gen_random_text();
  LOOP
    EXECUTE FORMAT('SELECT 1 FROM %I WHERE %I = %L', 'profiles', 'username', result);
    GET DIAGNOSTICS numrows = ROW_COUNT;
    IF numrows = 0 THEN
      RETURN result; 
    END if;
    result = gen_random_username();
  END loop;
END;$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
  username text := NEW.raw_user_meta_data -> 'username';
BEGIN
  SET SEARCH_PATH = public, auth;
  IF (username IS NULL OR username = '') THEN 
    username := gen_random_username();
  END IF;
  INSERT INTO public.profiles(id, username, is_guest)
  VALUES (
    NEW.id,
    username,
    (NEW.raw_user_meta_data -> 'is_guest')::boolean
  );
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_last_played_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  NEW.last_played_at := NOW();
  RETURN NEW;
END;$function$
;

create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."rooms"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."rooms"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."rooms"
as permissive
for update
to authenticated
using (true)
with check (true);


CREATE TRIGGER update_timestamp_for_room BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION update_last_played_at();


