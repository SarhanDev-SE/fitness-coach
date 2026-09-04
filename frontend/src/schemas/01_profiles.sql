-- Profiles
create table profiles (
    -- creating a unique id making it a primary key referencing the auth.users table, on delete cascade means if the user is deleted, the profile is also deleted
    id uuid references auth.users on delete cascade primary key,
    -- creating a username column of type text with a max length of 80 characters
    username text not null check (char_length(username) >= 3)
    -- fitness level column of type text with a default value of intermediate and a max length of 80 characters
    fitness_level text default 'intermediate' check (fitness_level in ('beginner', 'intermediate', 'advanced'))
    -- current streak of workout completed
    current_streak integer default 0 check (current_streak >= 0)
    -- fitness goal of the user
    fitness_goal text default 'lose weight' check (fitness_goal in ('lose weight', 'gain weight', 'gain muscle', 'improve endurance', 'improve flexibility'))
    -- height in cm
    height_cm integer check (height_cm > 0)
    -- weight in kg
    weight_kg integer check (weight_kg > 0)
    -- gender of the user
    gender text check (gender in ('male', 'female', 'other'))
    -- daily workout goal in integer check (daily workout goal > 0), calculated based on user's fitness goal, fitness level, height, weight, gender, age
    daily_workout_goal integer check (daily_workout_goal > 0)
    -- avg form score in integer check (avg form score > 0 and avg form score < 100)
    avg_form_score integer check (avg_form_score > 0 and avg_form_score < 100)
    -- total workout completed
    total_workout_completed integer default 0 check (total_workout_completed >= 0)
    -- total workout time in seconds
    total_workout_time_seconds integer default 0 check (total_workout_time_seconds >= 0)
    -- date of last workout
    last_workout_date date
    -- date of last completed workout
    last_completed_workout_date date
    -- date of last streak
    last_streak_date date
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null, 
)

create table workouts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    exercise text not null check (exercise in ('squat', 'pushup', 'plank', 'lunges')),
    total_reps integer not null check (total_reps > 0),
    started_at timestamp with time zone default timezone('utc'::text, now()) not null,
    completed_at timestamp with time zone not null,
    -- means the duration for which the user holds the pose for pushups and planks
    hold_duration_seconds integer check (hold_duration_seconds > 0),
    -- avg form score calculated by computer vision model
    avg_form_score float check (avg_form_score >=0 and avg_form_score <= 100),
    -- status text
    status text not null 
    default 'active'
    check (status in ('active', 'completed', 'abandoned'))
)

-- storing reps of each exercise performed by the user
create table reps(
    -- primary key
    id uuid primary key default uuid_generate_v4(),
    -- exercise id
    workout_id uuid references workouts(id) on delete cascade not null,
    -- form score for each rep
    form_score integer not null check (form_score >= 0 and form_score <= 100),
    -- timestamps 
    rep_number integer,
    issue text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
)

alter table profiles enable row level security;
alter table workouts enable row level security;
alter table reps enable row level security;

-- creating rls policies - the entire purpose of these policies is to ensure user can only access their own data

-- PROFILES
create policy "users can view their own profile"
on profiles 
for select
to authenticated
using (auth.uid()=id);

create policy "users can update their own profile"
on profiles 
for update
to authenticated
-- check if auth.uid()=id for updating
using (auth.uid()=id)
-- check if auth.uid()=id for inserting
with check (auth.uid()=id);

-- WORKOUTS

-- users can view their own workout
create policy "users can view their own workout"
on workouts
for select
to authenticated
using (auth.uid()=user_id);

create policy "users can create their own workout"
on workouts
for insert
to authenticated
with check (auth.uid()=user_id); -- check if auth.uid() matches to current workout user id

create policy "users can update their own workout"
on workouts
for update
to authenticated
using (auth.uid()=user_id)
with check (auth.uid()=user_id);

-- REPS

create policy "users can create reps for their workout"
on reps
for insert
to authenticated
with check (
    exists(
        -- checking if workout_id has workout user_id which matches the user id
        -- this ensures that user can only create reps for their own workout
        select 1 from workouts 
        where workouts.id = reps.workout_id
        and workouts.user_id = auth.uid()
    )
);

create policy "users can view reps of their workout"
on reps
for select
to authenticated
using (
    exists(
        -- checking if workout_id has workout user_id which matches the user id
        -- this ensures that user can only view reps for their own workout
        select 1 from workouts 
        where workouts.id = reps.workout_id
        and workouts.user_id = auth.uid()
    )
);

