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
      document.getElementById('loginGate').classList.remove('checking');
      document.getElementById('loginError').textContent = 'ההתחברות טרם הוגדרה — פנה למנהל האתר.';
      document.getElementById('loginError').classList.add('show');
      return null;
    }
    if(typeof window.supabase === 'undefined'){
      document.getElementById('loginGate').classList.remove('checking');
      document.getElementById('loginError').textContent = 'שירות ההתחברות לא נטען. רענן את הדף ונסה שוב.';
      document.getElementById('loginError').classList.add('show');
      return null;
    }
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.amiraDB = client;

    // ---- Step 1: is there a session at all? This is the ONLY thing that decides
    // whether the site is shown. Nothing else -- no custom timestamp, no extra
    // condition -- is allowed to delay or block this. That separation is what
    // removes the race conditions that were causing inconsistent login behavior.
    function applyAuthState(session){
      document.getElementById('loginGate').classList.remove('checking');
      const loggedIn = !!session;
      document.body.classList.toggle('authed', loggedIn);
      if(!loggedIn){
        document.body.classList.remove('is-admin');
        window.amiraIsAdmin = false;
        return;
      }
      window.amiraIsAdmin = session.user?.user_metadata?.role === 'admin';
      document.body.classList.toggle('is-admin', window.amiraIsAdmin);
      window.dispatchEvent(new CustomEvent('amira-auth-ready'));
    }

    async function forceSignOut(reason){
      console.warn('AMIRA auth: signing out --', reason);
      try{ await client.auth.signOut(); }catch(err){ /* ignore */ }
      localStorage.removeItem(LOGIN_TIME_KEY);
      applyAuthState(null);
    }

    // ---- Step 2: the 24h cutoff is a completely separate, additive check.
    // It can only ever make things MORE restrictive (sign out once genuinely
    // past the cutoff) -- it never participates in deciding whether a fresh,
    // valid session gets shown.
    function enforceSessionAge(){
      const loginTime = parseInt(localStorage.getItem(LOGIN_TIME_KEY) || '0', 10);
      if(!loginTime){
        localStorage.setItem(LOGIN_TIME_KEY, String(Date.now()));
        return;
      }
      if((Date.now() - loginTime) / 3600000 > SESSION_HOURS) forceSignOut(`session older than ${SESSION_HOURS}h (loginTime=${loginTime}, now=${Date.now()})`);
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
        applyAuthState(data.session);
      }
    });

    // This single listener is the one and only place that reacts to auth state,
    // for every case: initial page load, login, logout, and token refresh.
    // Supabase fires it with the correctly-restored session on every fresh page.
    client.auth.onAuthStateChange((_event, session) => applyAuthState(session));

    // The 24h check runs independently, on a periodic timer -- it never blocks
    // or delays the initial view, and only ever makes things more restrictive.
    setInterval(enforceSessionAge, 5 * 60 * 1000);

    return client;
  })();

  async function amiraSignOut(){
    if(authReady) await authReady.auth.signOut();
    localStorage.removeItem('amira_login_time');
    document.body.classList.remove('authed');
    document.body.classList.remove('is-admin');
  }
