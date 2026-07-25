(function(){

  const ICON_STAR = '<svg viewBox="0 0 18 17" fill="currentColor"><path d="M9 0.5L11.2 6L17 6.6L12.6 10.4L13.9 16L9 13L4.1 16L5.4 10.4L1 6.6L6.8 6L9 0.5Z"/></svg>';

  function withTimeout(promise, ms, label){
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} — תם הזמן (${ms/1000}s)`)), ms))
    ]);
  }

  // ---------------- tabs ----------------
  document.querySelectorAll('.admin-tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-tab-btn').forEach(b=>b.classList.toggle('active', b===btn));
      document.querySelectorAll('.admin-tab-panel').forEach(p=>p.classList.toggle('active', p.id === tab + 'Tab'));
    });
  });

  // ---------------- reviews ----------------
  async function loadReviews(){
    const list = document.getElementById('adminReviewsList');
    if(!list) return;
    list.innerHTML = '<p class="admin-empty">טוען...</p>';
    if(!window.amiraDB){
      list.innerHTML = '<p class="admin-empty">שגיאה: החיבור למסד הנתונים לא זמין. רענן את הדף ונסה שוב.</p>';
      return;
    }
    let data, error;
    try{
      ({ data, error } = await withTimeout(
        window.amiraDB.from('reviews').select('*')
          .order('status', { ascending: true })
          .order('created_at', { ascending: false }),
        8000, 'טעינת ביקורות'
      ));
    }catch(err){ error = err; }
    if(error){
      list.innerHTML = `<p class="admin-empty">שגיאה בטעינת ביקורות: ${error.message}</p>`;
      console.error('loadReviews error:', error);
      return;
    }
    if(!data || data.length === 0){
      list.innerHTML = '<p class="admin-empty">אין ביקורות עדיין.</p>';
      return;
    }
    list.innerHTML = data.map(r=>{
      const stars = Array.from({length:5}, (_,i)=>`<span style="opacity:${i<r.rating?1:0.25}">${ICON_STAR}</span>`).join('');
      const statusLabel = r.status === 'pending' ? 'ממתין לאישור' : 'מפורסם';
      const approveBtn = r.status === 'pending' ? `<button class="admin-approve-btn" data-approve="${r.id}" type="button">אשר ופרסם</button>` : '';
      return `<div class="admin-review-item ${r.status}">
        <div class="admin-review-top">
          <span class="admin-review-name">${r.name}</span>
          <span class="admin-item-status">${statusLabel}</span>
        </div>
        <div class="admin-review-stars">${stars}</div>
        <p class="admin-review-text">${r.review_text}</p>
        <div class="admin-item-actions">
          ${approveBtn}
          <button class="admin-delete-btn" data-delete-review="${r.id}" type="button">מחק</button>
        </div>
      </div>`;
    }).join('');
  }

  document.getElementById('adminReviewsList').addEventListener('click', (e)=>{
    const approveId = e.target.closest('[data-approve]')?.getAttribute('data-approve');
    const deleteId = e.target.closest('[data-delete-review]')?.getAttribute('data-delete-review');
    if(approveId){
      window.amiraDB.from('reviews').update({ status:'approved' }).eq('id', approveId)
        .then(({error})=>{ if(error) alert('שגיאה: ' + error.message); loadReviews(); });
    }
    if(deleteId){
      if(confirm('למחוק את הביקורת הזו לצמיתות?')){
        window.amiraDB.from('reviews').delete().eq('id', deleteId)
          .then(({error})=>{ if(error) alert('שגיאה: ' + error.message); loadReviews(); });
      }
    }
  });

  // ---------------- bookings ----------------
  let currentBookings = [];

  async function loadBookings(){
    const list = document.getElementById('adminBookingsList');
    if(!list) return;
    list.innerHTML = '<p class="admin-empty">טוען...</p>';
    if(!window.amiraDB){
      list.innerHTML = '<p class="admin-empty">שגיאה: החיבור למסד הנתונים לא זמין. רענן את הדף ונסה שוב.</p>';
      return;
    }
    let data, error;
    try{
      ({ data, error } = await withTimeout(
        window.amiraDB.from('bookings').select('*').order('flight_date', { ascending: true, nullsFirst:false }),
        8000, 'טעינת טיסות'
      ));
    }catch(err){ error = err; }
    if(error){
      list.innerHTML = `<p class="admin-empty">שגיאה בטעינת טיסות: ${error.message}</p>`;
      console.error('loadBookings error:', error);
      return;
    }
    currentBookings = data || [];
    if(currentBookings.length === 0){
      list.innerHTML = '<p class="admin-empty">אין טיסות מוזמנות עדיין.</p>';
      return;
    }
    list.innerHTML = currentBookings.map(b=>{
      const dateLabel = b.flight_date ? new Date(b.flight_date + 'T00:00:00').toLocaleDateString('he-IL') : 'לא צוין תאריך';
      return `<div class="admin-booking-item">
        <div class="admin-booking-top">
          <span class="admin-booking-name">${b.customer_name}</span>
          <span class="admin-booking-date">${dateLabel}</span>
        </div>
        <div class="admin-booking-grid">
          <div>טלפון<b>${b.phone || '—'}</b></div>
          <div>אימייל<b>${b.email || '—'}</b></div>
          <div>מסלול<b>${b.flight_type || '—'}</b></div>
          <div>מטוס<b>${b.aircraft || '—'}</b></div>
          <div>נוסעים<b>${b.passengers || '—'}</b></div>
          <div>משך טיסה<b>${b.duration_hours ? b.duration_hours + ' שעות' : '—'}</b></div>
          <div>יעד<b>${b.destination || '—'}</b></div>
          <div>מחיר משוער<b>${b.estimated_price ? '₪' + Math.round(b.estimated_price).toLocaleString() : '—'}</b></div>
        </div>
        ${b.notes ? `<p class="admin-booking-notes">"${b.notes}"</p>` : ''}
        <div class="admin-item-actions">
          <button class="admin-approve-btn" data-export="${b.id}" type="button">ייצוא ליומן</button>
          <button class="admin-delete-btn" data-delete-booking="${b.id}" type="button">מחק</button>
        </div>
      </div>`;
    }).join('');
  }

  // ---------------- .ics calendar export ----------------
  function icsEscape(str){
    return String(str || '').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
  }
  function bookingToEvent(b){
    const uid = `booking-${b.id}@amira-airlines`;
    const dateStr = (b.flight_date || new Date().toISOString().slice(0,10)).replace(/-/g,'');
    // next-day for DTEND, since this is an all-day placeholder (exact time TBD with the pilot)
    const d = new Date((b.flight_date || new Date().toISOString().slice(0,10)) + 'T00:00:00');
    d.setDate(d.getDate()+1);
    const endStr = d.toISOString().slice(0,10).replace(/-/g,'');
    const summary = icsEscape(`טיסה — ${b.customer_name}`);
    const descParts = [
      `מטוס: ${b.aircraft || '—'}`,
      `נוסעים: ${b.passengers || '—'}`,
      `יעד: ${b.destination || '—'}`,
      `משך טיסה: ${b.duration_hours ? b.duration_hours + ' שעות' : '—'}`,
      `טלפון: ${b.phone || '—'}`,
      `אימייל: ${b.email || '—'}`,
      b.notes ? `הערות: ${b.notes}` : ''
    ].filter(Boolean);
    const description = icsEscape(descParts.join('\n'));
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${endStr}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT'
    ].join('\r\n');
  }
  function downloadICS(events, filename){
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AMIRA AIRLINES//Bookings//HE',
      'CALSCALE:GREGORIAN',
      ...events,
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  document.getElementById('adminBookingsList').addEventListener('click', (e)=>{
    const exportId = e.target.closest('[data-export]')?.getAttribute('data-export');
    const deleteId = e.target.closest('[data-delete-booking]')?.getAttribute('data-delete-booking');
    if(exportId){
      const booking = currentBookings.find(b => String(b.id) === exportId);
      if(booking) downloadICS([bookingToEvent(booking)], `amira-flight-${booking.id}.ics`);
    }
    if(deleteId){
      if(confirm('למחוק את הטיסה הזו לצמיתות?')){
        window.amiraDB.from('bookings').delete().eq('id', deleteId)
          .then(({error})=>{ if(error) alert('שגיאה: ' + error.message); loadBookings(); });
      }
    }
  });

  document.getElementById('exportAllBtn').addEventListener('click', ()=>{
    if(currentBookings.length === 0){ alert('אין טיסות לייצוא.'); return; }
    downloadICS(currentBookings.map(bookingToEvent), 'amira-all-flights.ics');
  });

  // ---------------- init: wait for auth, then decide access + load data ----------------
  function initAdminPage(){
    if(window.amiraIsAdmin){
      loadReviews();
      loadBookings();
    }
  }
  window.addEventListener('amira-auth-ready', initAdminPage);
  // In case auth already resolved before this script attached its listener
  if(document.body.classList.contains('authed')) initAdminPage();

})();
