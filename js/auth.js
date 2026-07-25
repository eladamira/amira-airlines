const SUPABASE_URL = 'https://gyxxyodzsqcnvgufubpo.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_8bvhhb7cb8VFHbWFaysyKg_fy8w02JJ';
  // Supabase requires an "email" internally, but we let YOU create plain usernames.
  // Whatever username you type (both here at login, and when creating users in the
  // Supabase dashboard) gets this fake domain appended automatically — it's never
  // used to send real email, it just satisfies Supabase's required format.
  const USERNAME_DOMAIN = '@amira-users.local';
  const SESSION_HOURS = 24; // force re-login after this many hours, regardless of Supabase's own token lifetime
  const LOGIN_TIME_KEY = 'amira_login_time';

  const authReady = (function(){
    if(SUPABASE_URL.includes('YOUR_PROJECT')){
      // Not configured yet — fail safe by leaving the login gate up rather than exposing the site.
      document.getElementById('loginGate').classList.remove('checking');
      document.getElementById('loginError').textContent = 'ההתחברות טרם הוגדרה — פנה למנהל האתר.';
      document.getElementById('loginError').classList.add('show');
      return null;
    }
    if(typeof window.supabase === 'undefined'){
      // The auth SDK failed to load (network issue, ad-blocker, etc.) — fail safe, not open.
      document.getElementById('loginGate').classList.remove('checking');
      document.getElementById('loginError').textContent = 'שירות ההתחברות לא נטען. רענן את הדף ונסה שוב.';
      document.getElementById('loginError').classList.add('show');
      return null;
    }
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.amiraDB = client; // exposed so app.js can query the database (reviews, etc.)

    async function forceSignOut(){
      try{ await client.auth.signOut(); }catch(err){ /* ignore */ }
      localStorage.removeItem(LOGIN_TIME_KEY);
      applyAuthState(null);
    }

    // Single source of truth for reflecting auth state into the page. Supabase guarantees
    // onAuthStateChange fires an INITIAL_SESSION event with the correctly-restored session
    // (if any) as soon as the client finishes initializing -- this avoids a race where a
    // separate getSession() call could run too early and miss a persisted session on
    // page load / navigation, which is what was causing the repeated login prompts.
    function applyAuthState(session){
      document.getElementById('loginGate').classList.remove('checking');
      if(!session){
        document.body.classList.remove('authed');
        document.body.classList.remove('is-admin');
        window.amiraIsAdmin = false;
        return;
      }
      const loginTime = parseInt(localStorage.getItem(LOGIN_TIME_KEY) || '0', 10);
      const hoursElapsed = (Date.now() - loginTime) / 3600000;
      if(!loginTime || hoursElapsed > SESSION_HOURS){
        forceSignOut();
        return;
      }
      window.amiraIsAdmin = session.user?.user_metadata?.role === 'admin';
      document.body.classList.toggle('is-admin', window.amiraIsAdmin);
      document.body.classList.add('authed');
      window.dispatchEvent(new CustomEvent('amira-auth-ready'));
    }

    document.getElementById('loginForm').addEventListener('submit', async (e)=>{
      e.preventDefault();
      const username = document.getElementById('login_email').value.trim();
      const email = username.includes('@') ? username : username + USERNAME_DOMAIN;
      const password = document.getElementById('login_password').value;
      const errEl = document.getElementById('loginError');
      errEl.classList.remove('show');
      const btn = e.target.querySelector('button[type=submit]');
      const originalLabel = btn.textContent;
      btn.disabled = true; btn.textContent = 'מתחבר...';
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      btn.disabled = false; btn.textContent = originalLabel;
      if(error){
        console.error('Supabase sign-in error:', error);
        let msg = 'שם פרטי או סיסמה שגויים';
        if(/email not confirmed/i.test(error.message)) msg = 'המשתמש לא מאושר — חסר לסמן "Auto Confirm User" ביצירת המשתמש ב-Supabase.';
        else if(/invalid api key|jwt/i.test(error.message)) msg = 'שגיאת הגדרה (מפתח לא תקין) — בדוק את SUPABASE_URL וה-ANON_KEY בקוד.';
        else if(/failed to fetch|network/i.test(error.message)) msg = 'בעיית תקשורת עם שרת ההתחברות — בדוק חיבור אינטרנט ונסה שוב.';
        errEl.textContent = msg + ' (' + error.message + ')';
        errEl.classList.add('show');
      } else {
        localStorage.setItem(LOGIN_TIME_KEY, String(Date.now()));
        // Use this response's own fresh user data right away, rather than waiting on
        // onAuthStateChange to fire, which can lag a beat behind on first login.
        applyAuthState(data.session);
      }
    });

    // onAuthStateChange fires an INITIAL_SESSION event automatically on setup with
    // the correctly-restored session (if any) -- this is what makes login persist
    // correctly across page refreshes and navigation to admin.html.
    client.auth.onAuthStateChange((_event, session) => applyAuthState(session));

    // Re-check every few minutes while the tab stays open, so the 24h cutoff
    // still kicks in even if nobody reloads the page.
    setInterval(async () => {
      const { data: { session } } = await client.auth.getSession();
      applyAuthState(session);
    }, 5 * 60 * 1000);
    return client;
  })();

  async function amiraSignOut(){
    if(authReady) await authReady.auth.signOut();
    localStorage.removeItem('amira_login_time');
    document.body.classList.remove('authed');
    document.body.classList.remove('is-admin');
  }
