// Public site configuration. Safe to commit: the Supabase "anon" key is meant to be
// public; the database's row-level security rules protect the data.
// NEVER put the Supabase "service_role" key here.
// Leave both empty until the Supabase project exists: the admissions form then
// keeps working through Formspree only.
window.SCHOOL_CONFIG = {
  supabaseUrl: '',      // e.g. 'https://abcdxyz.supabase.co'
  supabaseAnonKey: ''   // the "anon public" key from Project Settings > API
};
