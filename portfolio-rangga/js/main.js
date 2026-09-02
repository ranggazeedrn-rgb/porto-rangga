/**
 * Main Application Logic & Interactivity
 * Rangga Ramadiyanto Nurhakim - XII RPL 1 SMK Muhammadiyah Kota Tasikmalaya
 */

(function () {
  'use strict';

  // Fallback data in case file:// protocol restricts fetch
  const defaultPortfolioData = {
    projects: [
      {
        id: "mutu-presence",
        title: "MutuPresensi - Presensi QR & Geolocation",
        category: "web",
        categoryLabel: "Web Application",
        featured: true,
        icon: "qr-code",
        emblemColor: "text-sky-400",
        statusBadge: "GPS Geofence v2.0",
        codeSnippet: "Auth::validate(Geofence::inRadius($coord))",
        shortDesc: "Aplikasi presensi berbasis web real-time untuk sekolah dengan validasi radius lokasi GPS dan QR dinamis.",
        fullDesc: "Sistem informasi presensi digital yang dirancang untuk mempermudah pencatatan kehadiran siswa dan guru di lingkungan sekolah SMK Muhammadiyah Tasikmalaya. Dilengkapi dengan validasi lokasi berbasis Geofencing GPS untuk mencegah pemalsuan presensi, generator kode QR dinamis yang berganti tiap 30 detik, serta dashboard rekap kehadiran untuk wali kelas dan admin.",
        tags: ["Laravel 11", "MySQL", "Tailwind CSS", "Leaflet.js", "REST API"],
        demoUrl: "https://demo.example.com/mutupresensi",
        githubUrl: "https://github.com/rangga-ramadiyanto/mutu-presensi",
        metrics: ["99.8% Akurasi Validasi Lokasi", "Mendukung 500+ Pengguna Aktif"]
      },
      {
        id: "school-library-system",
        title: "LibMu - Perpustakaan Digital SMK Mutu",
        category: "web",
        categoryLabel: "Web Application",
        featured: true,
        icon: "book-open",
        emblemColor: "text-emerald-400",
        statusBadge: "Digital Book Catalog",
        codeSnippet: "const loan = await BookService.issueLoan(id)",
        shortDesc: "Platform manajemen sirkulasi buku, peminjaman digital, dan katalog koleksi perpustakaan modern.",
        fullDesc: "Sistem otomasi perpustakaan sekolah yang mengintegrasikan peminjaman buku menggunakan barcode scanner, penghitungan denda otomatis, pencarian buku cerdas dengan filter kategori, serta laporan statistik peminjaman bulanan yang dapat diexport ke PDF/Excel.",
        tags: ["React.js", "Express.js", "PostgreSQL", "Tailwind CSS", "JWT Auth"],
        demoUrl: "https://demo.example.com/libmu",
        githubUrl: "https://github.com/rangga-ramadiyanto/libmu-perpus",
        metrics: ["Katalog 1200+ Judul Buku", "Export Laporan Otomatis"]
      },
      {
        id: "e-commerce-umkm",
        title: "TasikCraft - Marketplace UMKM Bordir & Kerajinan",
        category: "web",
        categoryLabel: "E-Commerce",
        featured: true,
        icon: "shopping-bag",
        emblemColor: "text-amber-300",
        statusBadge: "Midtrans & RajaOngkir API",
        codeSnippet: "$order->calculateShipping(Courier::JNE)",
        shortDesc: "Platform e-commerce katalog produk kerajinan khas Tasikmalaya dengan integrasi checkout WhatsApp & Payment Gateway.",
        fullDesc: "Proyek kolaboratif untuk membantu pelaku UMKM di Kota Tasikmalaya memasarkan produk kerajinan bordir, payung geulis, dan anyaman mendong secara online. Menyediakan antarmuka katalog responsif, keranjang belanja interaktif, integrasi hitung ongkos kirim RajaOngkir API, dan order langsung via WhatsApp / Midtrans Sandbox.",
        tags: ["PHP MVC", "MySQL", "RajaOngkir API", "Midtrans", "Vanilla JS"],
        demoUrl: "https://demo.example.com/tasikcraft",
        githubUrl: "https://github.com/rangga-ramadiyanto/tasikcraft-umkm",
        metrics: ["Integrasi Multi-Kurir", "Desain Liquid Glass Minimalis"]
      },
      {
        id: "rest-api-school",
        title: "SchoolAPI - RESTful Core Services",
        category: "api",
        categoryLabel: "Backend / API",
        featured: false,
        icon: "server",
        emblemColor: "text-indigo-400",
        statusBadge: "25+ Endpoints • Swagger",
        codeSnippet: "app.use('/api/v1/auth', jwtAuthMiddleware)",
        shortDesc: "Layanan REST API modular untuk manajemen data akademik, nilai siswa, dan otentikasi role-based.",
        fullDesc: "Backend API tangguh dengan dokumentasi Swagger/OpenAPI lengkap. Memiliki fitur autentikasi token JWT, sanitasi input, rate-limiting, error logging terstruktur, dan middleware kontrol akses tingkat peran (Admin, Guru, Siswa).",
        tags: ["Node.js", "Express", "Swagger UI", "Jest Testing", "PostgreSQL"],
        demoUrl: "https://api.example.com/docs",
        githubUrl: "https://github.com/rangga-ramadiyanto/school-core-api",
        metrics: ["25+ Endpoint Teruji", "95% Code Coverage"]
      },
      {
        id: "mutu-academic-ui",
        title: "EduPortal Design System & UI Kit",
        category: "uiux",
        categoryLabel: "UI/UX Design",
        featured: false,
        icon: "layout",
        emblemColor: "text-cyan-400",
        statusBadge: "Figma Design System",
        codeSnippet: "tokens: { glassBlur: '20px', text: 'slate-50' }",
        shortDesc: "Rancangan antarmuka portal akademik sekolah bergaya Liquid Glass dengan panduan desain komponen lengkap di Figma.",
        fullDesc: "Konseptualisasi desain UI/UX untuk portal akademik modern. Berisi 40+ komponen reusable, panduan tipografi, token warna netral, varian light/dark mode, serta prototipe interaktif mikro-interaksi tombol dan transisi kartu.",
        tags: ["Figma", "Design System", "Auto-layout", "Liquid Glass", "Prototyping"],
        demoUrl: "https://figma.com/@rangga_rpl",
        githubUrl: "https://github.com/rangga-ramadiyanto/eduportal-uikit",
        metrics: ["40+ Reusable Components", "Auto-Layout & Dark/Light System"]
      },
      {
        id: "mobile-task-tracker",
        title: "TaskRPL - Mobile Task & Project Tracker",
        category: "api",
        categoryLabel: "Mobile / Frontend",
        featured: false,
        icon: "kanban",
        emblemColor: "text-teal-400",
        statusBadge: "Offline Sync • Supabase",
        codeSnippet: "useOfflineStore.syncWithSupabase(tasks)",
        shortDesc: "Aplikasi manajemen tugas produktivitas tim untuk siswa jurusan RPL dengan sinkronisasi cloud real-time.",
        fullDesc: "Aplikasi tracker tugas harian dan proyek kelompok dengan papan Kanban interaktif, pengingat deadline otomatis, attachment file proyek, dan mode offline dengan IndexedDB storage fallback.",
        tags: ["React Native / Web", "Tailwind", "Supabase", "PWA Support"],
        demoUrl: "https://demo.example.com/taskrpl",
        githubUrl: "https://github.com/rangga-ramadiyanto/task-rpl",
        metrics: ["Offline First Sync", "Kanban Drag & Drop"]
      }
    ]
  };

  let allProjects = defaultPortfolioData.projects;

  // Initialize Data
  async function loadData() {
    try {
      const response = await fetch('./assets/data/projects.json');
      if (response.ok) {
        const json = await response.json();
        if (json.projects && json.projects.length) {
          allProjects = json.projects;
        }
      }
    } catch (e) {
      console.info('Using local fallback dataset for offline/local file compatibility.');
    }
    renderProjects('all');
  }

  // Render Project Cards with Clean Live Background
  const projectsContainer = document.getElementById('projects-grid');
  function renderProjects(category) {
    if (!projectsContainer) return;

    const filtered = category === 'all'
      ? allProjects
      : allProjects.filter(p => p.category === category);

    projectsContainer.innerHTML = filtered.map((project, index) => `
      <article class="liquid-glass-card glass-shine flex flex-col justify-between group cursor-pointer" data-tilt data-id="${project.id}" style="animation: fadeInUp 0.4s ease forwards ${index * 0.08}s;">
        <div>
          <!-- Clean Live Graphic Header (Zero Photo Clutter) -->
          <div class="project-live-header">
            <div class="project-live-orb"></div>
            
            <!-- Top Row: Category Badge & Status / Featured -->
            <div class="relative z-10 flex items-center justify-between w-full">
              <span class="liquid-glass-pill px-3 py-1 text-[11px] font-mono tracking-wide uppercase text-slate-200">
                ${project.categoryLabel}
              </span>
              ${project.featured ? `
                <span class="liquid-glass-pill px-2.5 py-0.5 text-[10px] font-mono font-semibold text-sky-300 flex items-center gap-1 border-sky-400/30">
                  <i data-lucide="sparkles" class="w-3 h-3"></i> Featured
                </span>
              ` : `
                <span class="liquid-glass-pill px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
                  ${project.statusBadge || 'v1.0 • Stable'}
                </span>
              `}
            </div>

            <!-- Center Row: Glowing Frosted Glass Emblem Icon -->
            <div class="relative z-10 flex items-center justify-between my-auto pt-2">
              <div class="project-emblem">
                <i data-lucide="${project.icon || 'layers'}" class="w-6 h-6 ${project.emblemColor || 'text-white'}"></i>
              </div>
              <div class="text-right">
                <div class="text-[10px] font-mono text-slate-500 uppercase">Core Stack</div>
                <div class="text-xs font-mono text-slate-200 font-semibold">${project.tags[0]}</div>
              </div>
            </div>

            <!-- Bottom Row: Code Architecture Line -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              <span class="truncate max-w-[210px] text-slate-400/90">$ ${project.codeSnippet || project.tags.slice(0, 2).join(' • ')}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" title="Active Module"></span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1 mb-2">
              ${project.title}
            </h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
              ${project.shortDesc}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-2">
              ${project.tags.slice(0, 3).map(tag => `
                <span class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  ${tag}
                </span>
              `).join('')}
              ${project.tags.length > 3 ? `
                <span class="text-[11px] font-mono px-2 py-1 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-500">
                  +${project.tags.length - 3}
                </span>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 pb-6 pt-2 border-t border-white/[0.05] flex items-center justify-between mt-auto">
          <button type="button" class="view-detail-btn text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all py-1.5 px-3 rounded-lg hover:bg-white/[0.05]" data-id="${project.id}">
            Lihat Detail <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
          <div class="flex items-center gap-2">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all" title="Source Code">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
            ` : ''}
            ${project.demoUrl ? `
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all" title="Live Preview">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach click listener for modal
    document.querySelectorAll('.view-detail-btn, .liquid-glass-card').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Ignore link clicks
        const id = item.getAttribute('data-id') || item.closest('[data-id]')?.getAttribute('data-id');
        if (id) openProjectModal(id);
      });
    });
  }

  // Filter Buttons
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active', 'bg-white/[0.15]', 'border-white/30', 'text-white'));
      btn.classList.add('active', 'bg-white/[0.15]', 'border-white/30', 'text-white');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });

  // Project Detail Modal Dialog
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <!-- Clean Live Header in Modal -->
      <div class="project-modal-live-header">
        <div class="project-live-orb"></div>
        <div class="project-emblem w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0">
          <i data-lucide="${project.icon || 'layers'}" class="w-7 h-7 sm:w-8 sm:h-8 ${project.emblemColor || 'text-white'}"></i>
        </div>
        <div class="relative z-10 space-y-1">
          <div class="flex items-center gap-2">
            <span class="liquid-glass-pill px-3 py-0.5 text-xs font-mono tracking-wide uppercase text-slate-300">
              ${project.categoryLabel}
            </span>
            <span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50"></span> ${project.statusBadge || 'Active Project'}
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white leading-tight">
            ${project.title}
          </h2>
        </div>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <div>
          <h4 class="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2">Deskripsi Proyek</h4>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            ${project.fullDesc}
          </p>
        </div>

        ${project.metrics && project.metrics.length ? `
          <div>
            <h4 class="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2.5">Key Highlights & Capaian</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${project.metrics.map(m => `
                <div class="liquid-glass-card p-3 rounded-xl flex items-center gap-2.5 border-white/[0.08]">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                  <span class="text-xs text-slate-200 font-medium">${m}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div>
          <h4 class="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2.5">Teknologi yang Digunakan</h4>
          <div class="flex flex-wrap gap-2">
            ${project.tags.map(tag => `
              <span class="liquid-glass-pill px-3 py-1 text-xs font-mono text-slate-200">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-end gap-3">
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="liquid-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <i data-lucide="github" class="w-4 h-4"></i> Repository GitHub
            </a>
          ` : ''}
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="liquid-btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <i data-lucide="external-link" class="w-4 h-4"></i> Buka Live Demo
            </a>
          ` : ''}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.close();
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Light dismiss on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuDrawer.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Nav ScrollSpy
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('text-white', 'bg-white/[0.12]', 'border-white/20');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-white', 'bg-white/[0.12]', 'border-white/20');
        link.classList.remove('text-slate-400');
      }
    });
  });

  // Toast Notification Trigger
  const toast = document.getElementById('glass-toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Copy-to-Clipboard Buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Berhasil disalin: ${textToCopy}`);
      } catch (err) {
        showToast(`Teks: ${textToCopy}`);
      }
    });
  });

  // Contact Form Mock Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2"><i data-lucide="loader-2" class="w-4 h-4"></i></span> Mengirim Pesan...
      `;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        showToast('Pesan Anda berhasil dikirim! Rangga akan segera membalas.');
      }, 1200);
    });
  }

  // Initial Execution
  document.addEventListener('DOMContentLoaded', () => {
    loadData();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

})();
