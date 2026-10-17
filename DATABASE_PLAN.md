# Database and Portals Plan

## Choice: Supabase

Supabase gives us a Postgres database, user accounts (login), and per-row security in one free-tier service. The website stays a static site on GitHub Pages and talks to Supabase directly from the browser. No server for us to run.

Why it fits the portals: every future portal is "a person signs in, sees only their own data". Supabase enforces that inside the database (row-level security), so a mistake in the website code cannot leak another family's records.

## Phases

| Phase | What | Status |
| --- | --- | --- |
| 1 | Record admissions inquiries (details, email, phone, consent). Staff accounts. | Schema and form wiring done; needs a Supabase project |
| 2 | Staff inbox: view inquiries, change status, add notes | Next |
| 3 | Parent portal: sign in, see child's profile, announcements, fee status | Later |
| 4 | Teacher portal: classes, attendance, notes, announcements | Later |
| 5 | Student portal: timetable, work, progress | Later |

## Roles

`pending` (just signed up, no access) · `parent` · `student` · `teacher` · `staff` · `admin`.
Nobody can give themselves a role. An admin approves each account.

## Data model

Built now (`database/schema.sql`): `profiles`, `inquiries`.

Planned for phases 3 to 5 (not built yet, shown so Phase 1 choices don't box us in):

- `students`: name, date of birth, class, status (enrolled, alumni)
- `guardians`: links a parent account to one or more students (siblings)
- `teachers`: links a teacher account to classes and subjects
- `classes` and `enrollments`: who is in which class, per academic year
- `announcements`: school-wide or per class, visible by role
- `attendance`, `fees`, `progress notes`: added per portal as needed

An accepted inquiry becomes a `student` plus `guardian` record, so nobody re-enters details.

## What the form records (Phase 1)

Parent/guardian name, student name, date of birth, class applying for, phone, email, how they heard about us, message, consent ticked, date and time, status (new, contacted, visit scheduled, offered, enrolled, declined, closed), staff notes.

The form still emails you through Formspree as well. If the database is down, you still get the inquiry.

## Privacy and legal (needs the school's decision)

This stores children's personal data, so India's DPDP Act applies.

- Collect only what is needed. **Date of birth of a minor is the most sensitive field** here; consider asking for age or birth year at inquiry and the full date only at enrolment.
- The form has a consent tick. A **privacy policy page** is still missing and should be written and linked from the form.
- Parental consent for any child account (student portal) must be recorded.
- Decide a retention period (for example, delete declined inquiries after 12 months) and who can request deletion.
- Admins only can delete records.

## Setup steps (about 10 minutes, owner does these)

1. Create a free project at supabase.com. Choose a region close to India (Mumbai if offered).
2. SQL Editor: paste `database/schema.sql` and run it.
3. Authentication: add yourself as a user, then run the one-line "make me admin" query at the bottom of the schema file.
4. Project Settings, API: copy the **Project URL** and the **anon public key**.
5. Put both in `assets/js/config.js` and push. The anon key is designed to be public. The database rules, not the key, protect the data. **Never** paste the `service_role` key into this repo.

## Known limits of Phase 1

- Anyone can submit the form, so spam is possible. A hidden honeypot field is included. If spam appears, add Cloudflare Turnstile.
- Staff cannot yet view inquiries on the website. Until Phase 2, view them in the Supabase table editor (Table Editor, inquiries) and in the Formspree emails.
