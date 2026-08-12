document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('stacklyUserEmail')) {
    window.location.replace('signin.html');
    return;
  }

  const spacing = document.createElement('style');
  spacing.textContent = '#dashboard-content > * + * { margin-top: 20px; } .user-chip{white-space:nowrap!important;overflow:visible!important;gap:7px!important;font-size:clamp(.56rem,2.3vw,.76rem)!important}.user-chip [data-user-email]{min-width:0}.logout-link{margin-top:9px!important;color:#ff98b9!important;border-top:1px solid rgba(255,255,255,.1);padding-top:17px!important}.logout-link:hover{background:rgba(244,86,168,.12)!important;color:#fff!important}.logout-modal{position:fixed;inset:0;z-index:20;display:none;place-items:center;padding:20px;background:rgba(4,2,14,.67);backdrop-filter:blur(8px)}.logout-modal.show{display:grid}.logout-dialog{width:min(100%,390px);padding:30px;border:1px solid rgba(255,255,255,.16);border-radius:20px;background:linear-gradient(145deg,#211a3d,#151124);box-shadow:0 26px 70px rgba(0,0,0,.45);text-align:center}.logout-icon{display:grid;place-items:center;width:52px;height:52px;margin:0 auto 15px;border-radius:16px;background:rgba(244,86,168,.15);color:#ff82af;font-size:1.35rem}.logout-dialog h2{margin:0;font:700 1.5rem "Space Grotesk",sans-serif}.logout-dialog p{margin:9px 0 23px;color:#aba5be;font-size:.86rem;line-height:1.55}.logout-actions{display:flex;gap:11px}.logout-actions button{flex:1;height:44px;border-radius:10px;font:600 .84rem "Inter",sans-serif;cursor:pointer}.logout-cancel{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff}.logout-confirm{border:0;background:linear-gradient(90deg,#e84986,#f56a2);color:#fff}@media (max-width:700px) { #dashboard-content > * + * { margin-top: 16px; } }';
  document.head.appendChild(spacing);
  spacing.textContent += '.logout-confirm{background:linear-gradient(90deg,#e84986,#f56ba2)!important}';
  spacing.textContent += '.user-chip{position:relative;min-height:60px;overflow:visible!important;gap:8px!important}.user-chip [data-user-email]{flex:0 0 auto!important;min-width:0!important;max-width:none!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important;display:block!important}.user-chip .online-dot{flex:0 0 8px!important}.user-role{position:absolute;left:63px;bottom:9px;margin:0!important;color:#16d3ef;font-size:.62rem;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}';
  spacing.textContent += '.dash-card{transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}.dash-card:hover{transform:translateY(-4px);border-color:rgba(22,211,239,.38);box-shadow:0 20px 42px rgba(0,0,0,.25)}.project-item,.message-item,.activity,.task,.person,.event{transition:background .2s ease,transform .2s ease}.project-item:hover,.message-item:hover,.activity:hover,.task:hover,.person:hover,.event:hover{transform:translateX(4px);background:rgba(22,211,239,.1)}.round-btn,.date-pill{transition:transform .2s ease,border-color .2s ease,background .2s ease}.round-btn:hover,.date-pill:hover{transform:translateY(-2px);border-color:var(--cyan);background:rgba(22,211,239,.12)}';
  spacing.textContent += 'body,.dash-bg{background:radial-gradient(circle at 12% 18%,rgba(124,58,237,.2),transparent 26%),radial-gradient(circle at 86% 76%,rgba(6,182,212,.14),transparent 27%),#06030f!important}';
  const page = document.body.dataset.dashboardPage || 'dashboard';
  const email = sessionStorage.getItem('stacklyUserEmail') || 'hello@stackly.design';
  const name = sessionStorage.getItem('stacklyUserName') || 'Creative';
  const role = sessionStorage.getItem('stacklyUserRole') || 'Creative';
  document.querySelector('.user-chip').insertAdjacentHTML('beforeend', '<small class="user-role" data-user-role></small>');
  const dashboardLogo = document.querySelector('.dash-logo');
  dashboardLogo.style.cursor = 'pointer';
  dashboardLogo.addEventListener('click', () => { window.location.href = 'index.html'; });
  const navigation = [
    ['dashboard', 'dashboard.html', '⌂', 'Dashboard'],
    ['projects', 'projects.html', '◈', 'Projects'],
    ['analytics', 'analytics.html', '◔', 'Analytics'],
    ['media', 'media.html', '▷', 'Media Hub'],
    ['schedule', 'schedule.html', '◷', 'Schedule'],
    ['team', 'team.html', '♧', 'Team'],
    ['messages', 'messages.html', '✉', 'Messages'],
    ['settings', 'settings.html', '⚙', 'Settings']
  ];
  document.querySelector('.dash-nav').innerHTML = navigation.map(([id, href, icon, label]) =>
    `<a href="${href}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}</a>`
  ).join('');
  const card = (title, content) => `<section class="dash-card chart-card" style="min-height:0"><div class="card-head"><h3>${title}</h3><span>View details</span></div>${content}</section>`;
  const list = (items) => `<div class="project-list">${items.map(([title, note, color]) => `<div class="project-item"><span class="project-art" style="background:${color || 'linear-gradient(135deg,#f456a8,#8759ef)'}"></span><div style="flex:1"><b>${title}</b><small>${note}</small></div></div>`).join('')}</div>`;
  const metrics = (items) => `<div class="metric-row">${items.map(([label, value, note]) => `<article class="dash-card metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join('')}</div>`;

  const content = {
    dashboard: {
      title: `Welcome back, ${name}`,
      sub: 'YOUR CREATIVE WORKSPACE',
      html: `<div class="overview-grid"><section class="dash-card hero-insight"><span class="tiny-tag">CREATIVE PULSE</span><h2>Your ideas are gaining momentum.</h2><p>Three projects are ready for your next creative move. Let’s make today count.</p></section><section class="dash-card donut-card"><div class="card-head"><h3>Project mix</h3><span>This month</span></div><div class="donut"><strong>89%</strong></div><p class="donut-note">Creative goals on track</p></section></div>${metrics([['Active projects','12','Up 18% this month'],['Assets created','248','Up 24% this month'],['Client feedback','94%','Up 8% this month']])}${card('Recent creative activity', `<div class="activity-list"><div class="activity"><span class="online-dot"></span><div><b>Orbit character set moved to review</b><small>Maya updated the final illustration board · 12 min ago</small></div></div><div class="activity"><span class="online-dot"></span><div><b>New client enquiry received</b><small>Northline Studio is looking for a campaign identity · 1 hr ago</small></div></div><div class="activity"><span class="online-dot"></span><div><b>Summer social pack was exported</b><small>12 assets are ready to share · Yesterday</small></div></div></div>`)}`
    },
    projects: {
      title: 'Projects', sub: 'YOUR CREATIVE PIPELINE',
      html: `<div class="task-board"><section class="dash-card task-col"><h3>In discovery</h3><div class="task">Aurora brand world<br><small>Research & moodboard</small></div><div class="task pink">Little Leaf packaging<br><small>Concept direction</small></div><div class="task yellow">Aster editorial<br><small>Client brief</small></div></section><section class="dash-card task-col"><h3>In progress</h3><div class="task pink">Orbit character set<br><small>Illustration · 70%</small></div><div class="task">Kora launch campaign<br><small>Motion storyboard</small></div><div class="task yellow">Melo identity toolkit<br><small>Visual system</small></div></section><section class="dash-card task-col"><h3>Ready to share</h3><div class="task yellow">Summer social pack<br><small>Final export</small></div><div class="task">Noma sticker sheet<br><small>Client review</small></div><div class="task pink">Horizon brand guide<br><small>Approval needed</small></div></section></div>${metrics([['On track','8','Healthy this week'],['Due this week','5','Two need review'],['Completed','31','This quarter']])}${card('Project updates', list([['Aurora brand world','New moodboard shared · 18 min ago'],['Orbit character set','14 of 20 assets approved','linear-gradient(135deg,#16d3ef,#2788f2)'],['Little Leaf packaging','Client feedback received','linear-gradient(135deg,#f4c655,#f456a8)']]))}`
    },
    analytics: {
      title: 'Creative analytics', sub: 'PERFORMANCE OVERVIEW',
      html: `<div class="content-grid"><section class="dash-card chart-card"><div class="card-head"><h3>Audience growth</h3><span>Last 7 days</span></div><div class="bars"><i style="height:35%"></i><i style="height:57%"></i><i style="height:46%"></i><i style="height:73%"></i><i style="height:62%"></i><i style="height:89%"></i><i style="height:78%"></i></div></section><section class="dash-card donut-card"><div class="card-head"><h3>Engagement</h3><span>+14.2%</span></div><div class="donut"><strong>72%</strong></div><p class="donut-note">Best performing: character art</p></section></div>${metrics([['Portfolio visits','8.4K','Up 12.8%'],['New enquiries','36','Up 6.2%'],['Share rate','31%','Up 4.7%']])}${card('Top performing collections', list([['Neon Guardian','4,280 views · 812 saves'],['Little Leaf packaging','3,740 views · 691 saves','linear-gradient(135deg,#16d3ef,#36db92)'],['Orbit character set','2,980 views · 504 saves','linear-gradient(135deg,#f4c655,#f456a8)'],['Summer social pack','2,201 views · 387 saves','linear-gradient(135deg,#8759ef,#f456a8)']]))}`
    },
    media: {
      title: 'Media hub', sub: 'WATCH, SHARE, INSPIRE',
      html: `<div class="content-grid"><section class="dash-card media-feature"><div class="card-head"><h3>Featured reel</h3><span>02:18</span></div><div class="video-frame"><span class="play">▶</span></div><h3 style="margin-top:20px">From sketch to a brand world</h3><p style="font-size:.82rem">A behind-the-scenes look at our newest illustration system.</p></section>${card('Recent assets', list([['Neon textures','PNG collection · Today'],['Flora icons','Vector kit · Yesterday','linear-gradient(135deg,#16d3ef,#36db92)'],['Summer type','Motion pack · Aug 08','linear-gradient(135deg,#f4c655,#f456a8)']]))}</div>${metrics([['Video library','24','6 added this month'],['Storage used','68%','13.6 GB of 20 GB'],['Downloads','1.2K','Up 19% this week']])}${card('Popular collections', list([['Behind the scenes','18 videos · 1,284 saves'],['Character animation loops','42 clips · 842 saves','linear-gradient(135deg,#16d3ef,#2788f2)'],['Brand reveal templates','16 clips · 623 saves','linear-gradient(135deg,#f4c655,#f456a8)']]))}`
    },
    schedule: {
      title: 'Your schedule', sub: 'MAKE SPACE FOR GREAT WORK',
      html: `<div class="content-grid"><section class="dash-card chart-card"><div class="card-head"><h3>Today · Tuesday</h3><span>11 August</span></div><div class="schedule"><div class="time">09:30</div><div class="event"><strong>Orbit illustration review</strong>With Maya & design team</div><div class="time">12:00</div><div class="event" style="border-color:#f456a8"><strong>Client brainstorm</strong>Little Leaf packaging</div><div class="time">15:30</div><div class="event" style="border-color:#f4c655"><strong>Creative focus block</strong>Character explorations</div><div class="time">17:00</div><div class="event" style="border-color:#36db92"><strong>Daily creative wrap</strong>Organise feedback and exports</div></div></section><section class="dash-card hero-insight"><span class="tiny-tag">NEXT UP</span><h2>Keep 90 minutes for deep work.</h2><p>Your creative energy is highest between 3:00 and 5:00 PM.</p></section></div>${metrics([['Meetings today','4','One completed'],['Focus time','3.5h','Booked today'],['This week','16','Events planned']])}${card('Coming up this week', `<div class="activity-list"><div class="activity"><div><b>Wednesday · Client feedback round</b><small>Little Leaf concept deck · 11:00 AM</small></div></div><div class="activity"><div><b>Thursday · Motion storyboard handoff</b><small>Kora launch campaign · 02:30 PM</small></div></div><div class="activity"><div><b>Friday · Weekly creative wrap</b><small>Plan next week’s priorities · 04:00 PM</small></div></div></div>`)}`
    },
    team: {
      title: 'Your team', sub: 'THE PEOPLE MAKING IT HAPPEN',
      html: `<div class="team-grid"><article class="dash-card person"><div class="avatar">MC</div><h3>Maya Chen</h3><p>Art Director · Online</p></article><article class="dash-card person"><div class="avatar" style="background:linear-gradient(135deg,#16d3ef,#2788f2)">JR</div><h3>Jamie Reed</h3><p>Illustrator · Online</p></article><article class="dash-card person"><div class="avatar" style="background:linear-gradient(135deg,#f456a8,#8759ef)">AS</div><h3>Asha Shah</h3><p>Motion Designer</p></article><article class="dash-card person"><div class="avatar" style="background:linear-gradient(135deg,#f4c655,#f456a8)">LT</div><h3>Leo Tran</h3><p>Brand Designer</p></article></div>${metrics([['Available now','6 / 8','Team members online'],['Shared this week','46','New assets and comments'],['Team tasks','18','Due this week']])}${card('Team activity', `<div class="activity-list"><div class="activity"><span class="online-dot"></span><div><b>Maya shared a new moodboard</b><small>Orbit character set · 12 min ago</small></div></div><div class="activity"><span class="online-dot"></span><div><b>Jamie completed 4 illustrations</b><small>Summer social pack · 48 min ago</small></div></div><div class="activity"><span class="online-dot"></span><div><b>Asha uploaded a motion preview</b><small>Kora launch campaign · 1 hr ago</small></div></div></div>`)}`
    },
    messages: {
      title: 'Messages', sub: 'STAY IN THE LOOP',
      html: `<div class="content-grid">${card('Inbox', list([['Maya Chen','That colour direction is exactly right!'],['Jamie Reed','I’ve added the final pose explorations.','linear-gradient(135deg,#16d3ef,#2788f2)'],['Little Leaf','Looking forward to the review today.','linear-gradient(135deg,#f4c655,#f456a8)'],['Leo Tran','The final brand guide is ready.','linear-gradient(135deg,#36db92,#16d3ef)']]))}<section class="dash-card hero-insight"><span class="tiny-tag">QUICK NOTE</span><h2>Good work starts with a good conversation.</h2><p>Reply to your unread messages to keep every project moving.</p></section></div>${metrics([['Unread','3','Need your reply'],['Sent today','12','Across 5 projects'],['Files shared','9','This week']])}${card('Conversation activity', `<div class="activity-list"><div class="activity"><div><b>Little Leaf replied to your concept deck</b><small>“The floral direction feels fresh and exactly on brand.”</small></div></div><div class="activity"><div><b>Maya mentioned you in Orbit character set</b><small>Please take a look at the new expression sheet.</small></div></div><div class="activity"><div><b>Jamie shared a file with you</b><small>summer-campaign-final-v3.mp4</small></div></div></div>`)}`
    },
    settings: {
      title: 'Settings', sub: 'MAKE STACKLY YOURS',
      html: `${card('Workspace preferences', `<div class="settings-list"><div class="setting"><span>Creative activity notifications</span><span class="toggle"><i></i></span></div><div class="setting"><span>Weekly progress summary</span><span class="toggle"><i></i></span></div><div class="setting"><span>Show collaboration status</span><span class="toggle"><i></i></span></div><div class="setting"><span>Dark creative mode</span><span class="toggle"><i></i></span></div><div class="setting"><span>Client review reminders</span><span class="toggle"><i></i></span></div></div>`) }${metrics([['Workspace plan','Studio','18 of 25 seats used'],['Storage','13.6 GB','68% of plan'],['Last backup','Today','04:30 AM']])}${card('Account & security', `<div class="activity-list"><div class="activity"><div><b>${email}</b><small>Primary Stackly workspace email</small></div></div><div class="activity"><div><b>Two-step verification</b><small>Enabled for your account</small></div></div><div class="activity"><div><b>Data protection</b><small>Workspace backup completed today</small></div></div></div>`)}`
    }
  };

  const current = content[page] || content.dashboard;
  document.querySelector('[data-title]').textContent = current.title;
  document.querySelector('[data-sub]').textContent = current.sub;
  document.querySelector('#dashboard-content').innerHTML = current.html;
  const userEmailElements = document.querySelectorAll('[data-user-email]');
  document.querySelectorAll('[data-user-role]').forEach((element) => { element.textContent = role; });
  const fitUserEmail = () => userEmailElements.forEach((element) => {
    element.textContent = email;
    const chip = element.closest('.user-chip');
    const available = chip.clientWidth - 67;
    const fontSize = Math.max(8, Math.min(12, available / Math.max(email.length * 0.55, 1)));
    element.style.fontSize = `${fontSize}px`;
  });
  fitUserEmail();
  window.addEventListener('resize', fitUserEmail);
  document.querySelectorAll('.dash-nav a').forEach((link) => link.classList.toggle('active', link.dataset.page === page));

  const settingsLink = document.querySelector('.dash-nav a[data-page="settings"]');
  settingsLink.insertAdjacentHTML('afterend', '<a class="logout-link" href="#" data-logout><span class="nav-icon">↪</span>Logout</a>');
  document.body.insertAdjacentHTML('beforeend', '<div class="logout-modal" id="logout-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title"><div class="logout-dialog"><div class="logout-icon">↪</div><h2 id="logout-title">Log out of Stackly?</h2><p>You will need to sign in again to access your creative workspace.</p><div class="logout-actions"><button class="logout-cancel" type="button">Cancel</button><button class="logout-confirm" type="button">Yes, Log Out</button></div></div></div>');

  const logoutModal = document.querySelector('#logout-modal');
  document.querySelector('[data-logout]').addEventListener('click', (event) => { event.preventDefault(); logoutModal.classList.add('show'); });
  document.querySelector('.logout-cancel').addEventListener('click', () => logoutModal.classList.remove('show'));
  logoutModal.addEventListener('click', (event) => { if (event.target === logoutModal) logoutModal.classList.remove('show'); });
  document.querySelector('.logout-confirm').addEventListener('click', () => { sessionStorage.removeItem('stacklyUserEmail'); sessionStorage.removeItem('stacklyUserName'); sessionStorage.removeItem('stacklyUserRole'); window.location.href = 'signin.html'; });
});
