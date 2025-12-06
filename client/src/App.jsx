
import React, { useState, useEffect, useRef } from 'react';

// ========== Icons ==========
const Icons = {
  Car: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
    </svg>
  ),
  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33A1.65 1.65 0 0 0 14 21v.09A2 2 0 0 1 12 23a2 2 0 0 1-2-2V21a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.33-1.82L4.21 13.12a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 8.92 11H9a1.65 1.65 0 0 0 1-1.51V9a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.49A1.65 1.65 0 0 0 15 11h.08a1.65 1.65 0 0 0 1.22-.54l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" />
    </svg>
  ),
  History: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6" />
      <path d="M9 10h6" />
      <path d="M9 14h4" />
    </svg>
  ),
  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
};

// Trip types list
const TRIP_TYPES = ['TAXI', 'AIRPORT', 'STANDPLAATS', 'EVENT', 'PRIVATE'];

// ========== UI Helpers ==========
const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-card rounded-3xl ${className}`}>{children}</div>
);

const GlassButton = ({ children, onClick, disabled, variant = 'primary' }) => {
  const base =
    'w-full py-3 rounded-2xl font-bold text-sm shadow-lg backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2';
  let variantClass = '';
  if (variant === 'primary')
    variantClass =
      'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/50';
  else if (variant === 'success')
    variantClass =
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/50';
  else if (variant === 'secondary')
    variantClass =
      'bg-white/10 text-white border border-white/10 hover:bg-white/20';
  else
    variantClass =
      'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClass} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

const GlassInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className
}) => (
  <div className={`mb-3 group ${className || ''}`}>
    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider ml-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-3 glass-input rounded-2xl outline-none font-bold placeholder-slate-600 text-sm ${
        type === 'number' ? 'dir-ltr text-left' : ''
      }`}
    />
  </div>
);

const Logo = ({ companyName }) => (
  <div className="flex items-center gap-3 justify-center mb-6 select-none">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
        <Icons.Car className="text-white w-6 h-6" />
      </div>
    </div>
    <div className="text-right">
      <h1 className="text-2xl font-black tracking-tighter text-white leading-none drop-shadow-md">
        {companyName || 'JOUW DRIVER'}
      </h1>
      <p className="text-[10px] font-bold text-blue-400 tracking-[0.4em] uppercase">
        OS 26
      </p>
    </div>
  </div>
);

// ========== Backend Proxy Helper ==========
const buildChironConfig = (config) => {
  if (!config) return {};
  const isProd = config.env === 'PROD';
  const clientId = isProd ? (config.prodClientId || config.clientId) : (config.testClientId || config.clientId);
  const clientSecret = isProd ? (config.prodClientSecret || config.clientSecret) : (config.testClientSecret || config.clientSecret);
  return {
    ...config,
    clientId,
    clientSecret,
  };
};

const sendChironStatus = async (status, trip, cfg) => {
  const res = await fetch('https://taxi-os-v2.onrender.com/api/chiron/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, trip, cfg })
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(text || 'Chiron proxy error');
  }
  return json;
};

// ========== Helpers ==========
const formatDateTime = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString('nl-BE');
};

const formatGps = (lat, lng) => {
  if (lat == null || lng == null) return '-';
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const calcInvoice = (price, config) => {
  // Treat incoming price as TTC (price paid by client)
  const ttc = Number(price || 0);
  // VAT rate is configurable (default 6% => 0.06)
  const cfgRate = config && typeof config.vatRate === 'number' ? config.vatRate : 0.06;
  const vatRate = cfgRate <= 0 ? 0.06 : cfgRate;
  // Convert TTC -> HT using current VAT
  const net = +(ttc / (1 + vatRate)).toFixed(2);
  const vat = +(ttc - net).toFixed(2);
  const total = ttc;
  return { net, vat, total, vatRate: +(vatRate * 100).toFixed(0) };
};

const openInvoicePrintWindow = (trip, companyConfig) => {
  const invoiceId = `INV-${trip.ritnummer}`;
  const { net, vat, total, vatRate } = calcInvoice(trip.price, companyConfig);

  const win = window.open('', '_blank', 'width=420,height=720');
  if (!win) {
    alert('يرجى السماح بفتح النوافذ المنبثقة (popup) لطباعة الفاتورة.');
    return;
  }

  const html = `
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<title>Invoice ${invoiceId}</title>
<style>
  body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#0f172a; margin:0; padding:20px; direction:rtl; }
  .card { background:#ffffff; border-radius:16px; padding:20px; box-shadow:0 10px 30px rgba(15,23,42,0.25); max-width:420px; margin:0 auto; }
  h1 { margin:0 0 4px 0; font-size:20px; }
  h2 { margin:0 0 16px 0; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; color:#6366f1; }
  .row { display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px; }
  .muted { color:#6b7280; font-size:11px; }
  .divider { border-top:1px solid #e5e7eb; margin:12px 0; }
  .total-row { font-weight:700; font-size:14px; }
  .badge { display:inline-block; padding:3px 8px; border-radius:999px; font-size:10px; background:#ecfdf5; color:#16a34a; }
</style>
</head>
<body>
  <div class="card" id="invoice-window">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <div>
        <h1>${companyConfig.companyName || 'JOUW DRIVER'}</h1>
        <h2>VERVOERBEWIJS / TAXI RECEIPT</h2>
        <div class="muted">KBO: ${companyConfig.kboNumber || '-'}</div>
        <div class="muted">${companyConfig.companyAddress || ''}</div>
        <div class="muted">${companyConfig.companyPhone || ''} · ${companyConfig.companyEmail || ''}</div>
      </div>
      <div style="text-align:left;">
        <div class="muted">Invoice</div>
        <div style="font-weight:600; font-size:12px;">${invoiceId}</div>
        <div class="muted">${new Date().toLocaleDateString('nl-BE')}</div>
        <div class="muted">${trip.tripType || 'TAXI'}</div>
      </div>
    </div>

    <div class="divider"></div>

    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <div>
        <div class="muted">Vehicle</div>
        <div style="font-size:13px; font-weight:600;">Plate: ${companyConfig.defaultPlate || '-'}</div>
        <div class="muted">Driver pass: ${companyConfig.driverCardId || '-'}</div>
      </div>
      <div style="text-align:left;">
        <div class="muted">Trip ID</div>
        <div style="font-size:13px; font-weight:600;">${trip.ritnummer}</div>
        <div class="muted">Date: ${formatDateTime(trip.startTimeIso)}</div>
      </div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="row"><span>Start time</span><span>${formatDateTime(trip.startTimeIso)}</span></div>
      <div class="row"><span>End time</span><span>${formatDateTime(trip.endTimeIso)}</span></div>
      <div class="row"><span>Start GPS</span><span>${formatGps(trip.startLat, trip.startLng)}</span></div>
      <div class="row"><span>End GPS</span><span>${formatGps(trip.endLat, trip.endLng)}</span></div>
      ${trip.startAddress || trip.endAddress ? `
      <div class="row"><span>Start address</span><span>${trip.startAddress || '-'}</span></div>
      <div class="row"><span>End address</span><span>${trip.endAddress || '-'}</span></div>
      ` : ''}
      <div class="row"><span>Distance</span><span>${trip.distanceKm.toFixed(2)} km</span></div>
      <div class="row"><span>Waiting time</span><span>${Math.round((trip.waitingTime || 0) / 60)} min</span></div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="row"><span>Net (HT)</span><span>€ ${net.toFixed(2)}</span></div>
      <div class="row"><span>TVA (${vatRate}%)</span><span>€ ${vat.toFixed(2)}</span></div>
      <div class="divider"></div>
      <div class="row total-row"><span>Total (TTC)</span><span>€ ${total.toFixed(2)}</span></div>
    </div>

    <div class="divider"></div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
      <div class="muted">This receipt is intended for the passenger. A full dienststaat is available to the driver.</div>
      <span class="badge">TAXI RECEIPT</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
  `;
  win.document.write(html);
  win.document.close();
};

const openTestReportPrintWindow = (report, cfg) => {
  const win = window.open('', '_blank', 'width=700,height=900');
  if (!win) {
    alert('يرجى السماح بفتح النوافذ المنبثقة (popup) لطباعة تقرير الاختبار.');
    return;
  }
  const dateStr = new Date(report.createdAt).toLocaleString('nl-BE');
  const rowsHtml = report.trips
    .map((t, idx) => {
      const okLabel = t.ok ? '<span style="color:#16a34a;font-weight:600;">SUCCESS</span>' : '<span style="color:#dc2626;font-weight:600;">ERROR</span>';
      const err = t.error ? `<div class="muted">Error: ${t.error}</div>` : '';
      return `
        <div class="trip">
          <div><strong>Test #${idx + 1}</strong> – ${okLabel}</div>
          <div class="muted">ritnummer: ${t.ritnummer}</div>
          <div class="muted">Type: ${t.tripType || 'TAXI'}</div>
          <div class="muted">Start: ${t.startTime ? t.startTime : '-'}</div>
          <div class="muted">End: ${t.endTime ? t.endTime : '-'}</div>
          <div class="muted">Start GPS: ${t.startGps || '-'}</div>
          <div class="muted">End GPS: ${t.endGps || '-'}</div>
          <div class="muted">Distance: ${t.distance} km · Price: € ${t.price}</div>
          ${err}
        </div>
      `;
    })
    .join('');

  const html = `
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<title>Chiron Test Report</title>
<style>
  body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#0f172a; margin:0; padding:20px; direction:rtl; }
  .card { background:#ffffff; border-radius:16px; padding:20px; box-shadow:0 10px 30px rgba(15,23,42,0.25); max-width:620px; margin:0 auto; }
  h1 { margin:0 0 4px 0; font-size:20px; }
  h2 { margin:0 0 16px 0; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; color:#2563eb; }
  .muted { color:#6b7280; font-size:11px; }
  .divider { border-top:1px solid #e5e7eb; margin:12px 0; }
  .trip { margin-bottom:12px; padding-bottom:8px; border-bottom:1px dashed #e5e7eb; font-size:11px; }
  .badge { display:inline-block; padding:3px 8px; border-radius:999px; font-size:10px; background:#ecfdf5; color:#16a34a; }
</style>
</head>
<body>
  <div class="card" id="invoice-window">
    <h1>${cfg.companyName || 'JOUW DRIVER'}</h1>
    <h2>CHIRON TEST REPORT</h2>
    <div class="muted">KBO: ${cfg.kboNumber || '-'}</div>
    <div class="muted">${cfg.companyAddress || ''}</div>
    <div class="muted">${cfg.companyPhone || ''} · ${cfg.companyEmail || ''}</div>
    <div class="muted">Plate: ${cfg.defaultPlate || '-'} – Driver Pass: ${cfg.driverCardId || '-'}</div>
    <div class="muted">Environment: ${report.env} – Date: ${dateStr}</div>

    <div class="divider"></div>

    <div>
      ${rowsHtml}
    </div>

    <div class="divider"></div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
      <div class="muted">This report confirms that multiple test rides were sent to Chiron according to the technical guidelines (reservatie, vertrek, aankomst).</div>
      <span class="badge">TEST COMPLETED</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
  `;
  win.document.write(html);
  win.document.close();
};

// Reverse Geocode helper (best effort)
const reverseGeocode = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.display_name || null;
  } catch {
    return null;
  }
};

// ========== Taximeter with Persistent Active Trip ==========
const ACTIVE_KEY = 'jouw_taxi_os_active_trip';

const Taximeter = ({ config, onTripFinished, onSaveToHistory, pushChironLog, onActiveChange, t, lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('gps'); // gps / simulation
  const [tripType, setTripType] = useState('TAXI');
  const [stats, setStats] = useState({
    speed: 0,
    distance: 0,
    price: 0,
    waitingTime: 0
  });
  const [manualPrice, setManualPrice] = useState('');
  const [tripInfo, setTripInfo] = useState(null);
  const [statusText, setStatusText] = useState('Ready');
  const lastPosRef = useRef({ lat: null, lng: null });
  const watchId = useRef(null);

  // Initial GPS watcher to keep last position updated (for start/stop)
  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        lastPosRef.current = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      },
      () => {
        // ignore
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  // Restore active trip on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACTIVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || !saved.trip || !saved.stats) return;
      const { trip, stats: savedStats, mode: savedMode, isActive: savedActive, lastTick, tripType: savedType } = saved;

      let updatedStats = savedStats;
      if (savedActive && lastTick) {
        const deltaSec = Math.floor((Date.now() - lastTick) / 1000);
        if (deltaSec > 0) {
          const priceInc = (config.waitRate || 0.5) * (deltaSec / 60);
          updatedStats = {
            ...savedStats,
            waitingTime: (savedStats.waitingTime || 0) + deltaSec,
            price: savedStats.price + priceInc,
            speed: 0
          };
        }
      }
      setTripInfo(trip);
      setStats(updatedStats);
      setMode(savedMode || 'simulation');
      setTripType(savedType || 'TAXI');
      setIsActive(savedActive);
      setStatusText(savedActive ? 'Running (restored)...' : 'Ready');
      onActiveChange?.(!!savedActive);
    } catch (e) {
      console.error('Failed to restore active trip', e);
    }
  }, []);

  // When base fare changes and no active trip => reset price

  const persistActive = (nextStats, nextTrip, activeFlag, type = tripType) => {
    try {
      const payload = {
        trip: nextTrip || tripInfo,
        stats: nextStats,
        mode,
        isActive: activeFlag,
        tripType: type,
        lastTick: Date.now()
      };
      localStorage.setItem(ACTIVE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to persist active trip', e);
    }
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setStats((prev) => {
          let newSpeed = prev.speed;

          if (mode === 'simulation') {
            newSpeed =
              Math.random() > 0.2
                ? Math.floor(Math.random() * 50) + 10
                : 0;
          }

          const distInc = newSpeed / 3600;
          const isWaiting = newSpeed < 5;

          const nextStats = {
            ...prev,
            speed: newSpeed,
            distance: prev.distance + distInc,
            waitingTime: isWaiting
              ? prev.waitingTime + 1
              : prev.waitingTime,
            // price is not auto-updated anymore; it will be provided manually as TTC at the end of the trip
          };

          if (tripInfo) {
            persistActive(nextStats, tripInfo, true);
          }

          return nextStats;
        });
      }, 1000);

      if (isActive && mode === 'gps' && 'geolocation' in navigator) {
        watchId.current = navigator.geolocation.watchPosition(
          (pos) => {
            const speedKm = (pos.coords.speed || 0) * 3.6;
            lastPosRef.current = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };
            setStats((prev) => {
              const nextStats = { ...prev, speed: Math.round(speedKm) };
              if (tripInfo) {
                persistActive(nextStats, tripInfo, true);
              }
              return nextStats;
            });
          },
          () => {
            setStatusText('GPS Error — تم التحويل إلى Simulation');
            setMode('simulation');
          },
          { enableHighAccuracy: true }
        );
      }
    }

    return () => {
      clearInterval(interval);
      if (watchId.current && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [isActive, mode, config.kmRate, config.waitRate, tripInfo]);

  const handleStart = async () => {
    // Require mandatory vehicle + driver identifiers
    if (!config.defaultPlate || !config.driverCardId) {
      alert('يجب تعبئة لوحة السيارة ورقم bestuurderspas في إعدادات النظام قبل بدء الرحلة.');
      return;
    }
    // In TEST environment, real trips are disabled
    if (config.env === 'TEST') {
      alert('لا يمكن تشغيل رحلة في وضع TEST. استخدم أزرار الاختبار فقط أو غيّر الوضع إلى PROD.');
      return;
    }
    // must have trip type
    if (!tripType) {
      alert('يرجى اختيار نوع الرحلة قبل البدء.');
      return;
    }

    const now = new Date();
    const iso = now.toISOString();

    let { lat, lng } = lastPosRef.current;
    // one-shot geolocation if we don't have a last position
    if ((lat == null || lng == null) && 'geolocation' in navigator) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 8000
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        lastPosRef.current = { lat, lng };
      } catch {
        // fallback to 0,0
      }
    }

    const ritnummer = Date.now();

    const trip = {
      ritnummer,
      tripType,
      startTimeIso: iso,
      endTimeIso: null,
      startLat: lat,
      startLng: lng,
      endLat: null,
      endLng: null,
      startAddress: null,
      endAddress: null,
      distanceKm: 0,
      price: 0,
      waitingTime: 0
    };

    setTripInfo(trip);
    const initialStats = {
      speed: 0,
      distance: 0,
      price: 0,
      waitingTime: 0
    };
    setStats(initialStats);
    setIsActive(true);
    setStatusText('Running...');
    onActiveChange?.(true);
    persistActive(initialStats, trip, true, tripType);

    // best-effort reverse geocode for start
    if (lat != null && lng != null) {
      reverseGeocode(lat, lng).then((addr) => {
        if (!addr) return;
        setTripInfo((prev) => {
          if (!prev) return prev;
          const updated = { ...prev, startAddress: addr };
          persistActive(initialStats, updated, true, tripType);
          return updated;
        });
      });
    }

    try {
      setStatusText('Sending reservatie...');
      const res1 = await sendChironStatus('reservatie', trip, buildChironConfig(config));
      pushChironLog('reservatie', res1);

      setStatusText('Sending vertrek...');
      const res2 = await sendChironStatus('vertrek', trip, buildChironConfig(config));
      pushChironLog('vertrek', res2);

      setStatusText('Trip started ✓');
    } catch (e) {
      console.error(e);
      setStatusText('Chiron error on start');
      pushChironLog('START ERROR', e.message);
      alert('Chiron start error: ' + e.message);
    }
  };

  const handleStop = async () => {
    if (!manualPrice || isNaN(Number(manualPrice)) || Number(manualPrice) <= 0) {
      alert('يرجى إدخال المبلغ (TTC) قبل إنهاء الرحلة.');
      return;
    }
    setIsActive(false);
    onActiveChange?.(false);
    const now = new Date();
    const iso = now.toISOString();
    let { lat, lng } = lastPosRef.current;

    if ((lat == null || lng == null) && 'geolocation' in navigator) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 8000
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        lastPosRef.current = { lat, lng };
      } catch {
        // ignore
      }
    }

    const finishedTrip = {
      ...(tripInfo || {}),
      tripType,
      endTimeIso: iso,
      endLat: lat,
      endLng: lng,
      distanceKm: stats.distance,
      price: Number(manualPrice),
      waitingTime: stats.waitingTime
    };

    setTripInfo(finishedTrip);

    let chironOk = false;
    let needsChironSync = false;

    // حاول إرسال aankomst مباشرة إذا كان هناك اتصال
    const hasNavigator = typeof navigator !== 'undefined';
    if (hasNavigator && navigator.onLine) {
      setStatusText('Sending aankomst...');
      try {
        const res = await sendChironStatus('aankomst', finishedTrip, buildChironConfig(config));
        pushChironLog('aankomst', res);
        setStatusText('Trip finished ✓');
        chironOk = true;
      } catch (e) {
        console.error(e);
        // في حالة خطأ شبكة، نضعها في قائمة المزامنة
        if (e.message && e.message.toLowerCase().includes('fetch') || !navigator.onLine) {
          needsChironSync = true;
          setStatusText('سيتم إرسال الرحلة تلقائياً عند توفر الاتصال.');
          pushChironLog('STOP OFFLINE QUEUED', e.message);
        } else {
          setStatusText('Chiron error on stop');
          pushChironLog('STOP ERROR', e.message);
          alert('Chiron stop error: ' + e.message);
        }
      }
    } else {
      // لا يوجد اتصال بالإنترنت حالياً → نؤجل الإرسال
      needsChironSync = true;
      setStatusText('Offline - سيتم إرسال الرحلة تلقائياً عند توفر الاتصال.');
      pushChironLog('STOP OFFLINE', 'Trip queued for later sync.');
    }

    // reverse geocode end address
    if (lat != null && lng != null) {
      try {
        const addr = await reverseGeocode(lat, lng);
        if (addr) {
          finishedTrip.endAddress = addr;
        }
      } catch {
        // ignore
      }
    }

    onTripFinished?.(finishedTrip);
    onSaveToHistory?.({
      ...finishedTrip,
      createdAt: new Date().toISOString(),
      chironOk,
      needsChironSync
    });

    try {
      localStorage.removeItem(ACTIVE_KEY);
    } catch {}

    openInvoicePrintWindow(finishedTrip, config);
  };
  return (
    <GlassCard className="p-5 relative overflow-hidden border border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
      <div className="absolute inset-x-10 -top-10 h-24 bg-emerald-500/20 blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
          <span
            className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
            }`}
          ></span>
          {isActive ? 'METER ON' : 'FREE'}
        </div>
        <button
          onClick={() =>
            setMode((m) => (m === 'gps' ? 'simulation' : 'gps'))
          }
          disabled={isActive}
          className={`text-[10px] px-3 py-1 rounded-full border backdrop-blur-md ${
            mode === 'gps'
              ? 'border-emerald-500 text-emerald-300 bg-emerald-500/10'
              : 'border-slate-500 text-slate-300 bg-black/40'
          } ${isActive ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {mode.toUpperCase()}
        </button>
      </div>

      {/* Trip type selector (only when not active) */}
      {!isActive && (
        <div className="mb-3">
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider ml-1">
            {t('trip_type')}
          </label>
          <div className="flex gap-1 flex-wrap">
            {TRIP_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTripType(t)}
                className={`px-3 py-1 rounded-full text-[10px] border transition-all ${
                  tripType === t
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-black/40 border-white/10 text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative mb-5 mt-2">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-cyan-500/10 blur-xl"></div>
        <div className="relative rounded-3xl border border-emerald-400/40 bg-black/60 px-4 py-4 flex flex-col items-center">
          <div className="font-digital text-6xl md:text-7xl font-bold text-emerald-300 tracking-[0.08em] drop-shadow-[0_0_25px_rgba(16,185,129,0.8)]">
            {manualPrice !== '' ? Number(manualPrice).toFixed(2) : stats.price.toFixed(2)}
          </div>
          <div className="text-[10px] mt-1 tracking-[0.5em] text-emerald-400 font-bold uppercase">
            EUR
          </div>
        </div>
      </div>

      <div className="mt-2 mb-4">
        <GlassInput
          label={t('amount_ttc')}
          type="number"
          value={manualPrice}
          onChange={(e) => setManualPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-black/60 rounded-2xl p-2.5 text-center border border-white/10">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider">
            SPEED
          </p>
          <p className="text-xl font-bold text-white font-mono">
            {Math.round(stats.speed)}
          </p>
          <p className="text-[9px] text-slate-500">km/h</p>
        </div>
        <div className="bg-black/60 rounded-2xl p-2.5 text-center border border-white/10">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider">
            DIST
          </p>
          <p className="text-xl font-bold text-white font-mono">
            {stats.distance.toFixed(2)}
          </p>
          <p className="text-[9px] text-slate-500">km</p>
        </div>
        <div className="bg-black/60 rounded-2xl p-2.5 text-center border border-white/10">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider">
            WAIT
          </p>
          <p className="text-xl font-bold text-white font-mono">
            {(stats.waitingTime / 60).toFixed(0)}
          </p>
          <p className="text-[9px] text-slate-500">min</p>
        </div>
      </div>

      <div className="mb-4 px-3 py-2 rounded-2xl bg-black/60 border border-emerald-500/30 text-[10px] text-emerald-100 flex items-center justify-between gap-2">
        <span className="font-mono opacity-80">
          {statusText}
        </span>
        <span className="text-[9px] text-emerald-400 uppercase tracking-[0.2em]">
          CHIRON LINK
        </span>
      </div>

      {!isActive ? (
        <GlassButton onClick={handleStart} variant="success">
          {t('start_trip')}
        </GlassButton>
      ) : (
        <GlassButton onClick={handleStop} variant="danger">
          {t('stop_trip')}
        </GlassButton>
      )}
    </GlassCard>
  );
};

// ========== Settings Screen ==========
const SettingsScreen = ({ config, setConfig, chironLogs, onTestOne, onTestFive, lastTestReport, onPrintTestReport, t, lang }) => {
  return (
    <div className="space-y-5 pb-28">
      <GlassCard className="p-5">
        <h2 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">
          بيانات الشركة
        </h2>
        <GlassInput
          label="اسم الشركة (يظهر كشعار)"
          value={config.companyName}
          onChange={(e) =>
            setConfig({ ...config, companyName: e.target.value })
          }
          placeholder="JOUW DRIVER"
        />
        <GlassInput
          label="KBO"
          value={config.kboNumber}
          onChange={(e) =>
            setConfig({ ...config, kboNumber: e.target.value })
          }
          placeholder="BE0XXXXXXXXX"
        />
        <GlassInput
          label="عنوان الشركة"
          value={config.companyAddress}
          onChange={(e) =>
            setConfig({ ...config, companyAddress: e.target.value })
          }
          placeholder="Chaussée de Waterloo 200, 1640..."
        />
        <div className="grid grid-cols-2 gap-3">
          <GlassInput
            label="هاتف الشركة"
            value={config.companyPhone}
            onChange={(e) =>
              setConfig({ ...config, companyPhone: e.target.value })
            }
            placeholder="+32..."
          />
          <GlassInput
            label="البريد الإلكتروني"
            value={config.companyEmail}
            onChange={(e) =>
              setConfig({ ...config, companyEmail: e.target.value })
            }
            placeholder="info@..."
          />
        </div>
        <GlassInput
          label="اسم السائق (اختياري)"
          value={config.driverName}
          onChange={(e) =>
            setConfig({ ...config, driverName: e.target.value })
          }
          placeholder="Jalal EZETDIN"
        />
      </GlassCard>

      <GlassCard className="p-5">
        <h2 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">
          {lang === 'ar' ? 'بيانات السيارة' : lang === 'nl' ? 'Voertuiggegevens' : 'Données du véhicule'}
        </h2>
        <GlassInput
          label={lang === 'ar' ? 'لوحة السيارة (Plate)' : lang === 'nl' ? 'Nummerplaat' : 'Plaque d\'immatriculation'}
          value={config.defaultPlate}
          onChange={(e) =>
            setConfig({ ...config, defaultPlate: e.target.value })
          }
          placeholder="1-TXA-260"
        />
        <GlassInput
          label={lang === 'ar' ? 'Driver Pass (bestuurderspasnummer)' : lang === 'nl' ? 'Bestuurderspasnummer' : 'Numéro de carte chauffeur'}
          value={config.driverCardId}
          onChange={(e) =>
            setConfig({ ...config, driverCardId: e.target.value })
          }
          placeholder="1234567890"
        />
        <div className="mt-3">
          <GlassInput
            label={lang === 'ar' ? 'نسبة TVA %' : lang === 'nl' ? 'BTW %' : 'TVA %'}
            type="number"
            value={config.vatRate ? (config.vatRate * 100).toFixed(0) : 6}
            onChange={(e) => {
              const v = Number(e.target.value);
              const rate = isNaN(v) || v <= 0 ? 0.06 : v / 100;
              setConfig({ ...config, vatRate: rate });
            }}
            placeholder="6"
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          {lang === 'ar'
            ? '* يتم حساب TVA تلقائياً في الفاتورة حسب النسبة المحددة في الإعدادات، مع تحويل السعر من TTC إلى HT.'
            : lang === 'nl'
            ? '* De BTW wordt automatisch berekend op de factuur volgens het ingestelde percentage, met omzetting van TTC naar HT.'
            : '* La TVA est calculée automatiquement sur la facture selon le pourcentage défini dans les paramètres, avec conversion du TTC vers le HT.'}
        </p>
      </GlassCard>

      <GlassCard className="p-5">
        <h2 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">
          Chiron OAuth / Environment
        </h2>

        <div className="flex bg-black/30 p-1 rounded-xl mb-3">
          <button
            onClick={() => setConfig({ ...config, env: 'TEST' })}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              config.env !== 'PROD'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400'
            }`}
          >
            TEST
          </button>
          <button
            onClick={() => setConfig({ ...config, env: 'PROD' })}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              config.env === 'PROD'
                ? 'bg-red-600 text-white'
                : 'text-slate-400'
            }`}
          >
            PROD
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-black/40 rounded-2xl p-3 border border-white/10">
            <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">
              TEST CREDENTIALS
            </p>
            <GlassInput
              label="Test Client ID"
              value={config.testClientId || ''}
              onChange={(e) =>
                setConfig({ ...config, testClientId: e.target.value })
              }
              placeholder="Test client id"
            />
            <GlassInput
              label="Test Client Secret"
              value={config.testClientSecret || ''}
              onChange={(e) =>
                setConfig({ ...config, testClientSecret: e.target.value })
              }
              placeholder="Keep this secret"
            />
          </div>

          <div className="bg-black/40 rounded-2xl p-3 border border-white/10">
            <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">
              PROD CREDENTIALS
            </p>
            <GlassInput
              label="Prod Client ID"
              value={config.prodClientId || ''}
              onChange={(e) =>
                setConfig({ ...config, prodClientId: e.target.value })
              }
              placeholder="Prod client id"
            />
            <GlassInput
              label="Prod Client Secret"
              value={config.prodClientSecret || ''}
              onChange={(e) =>
                setConfig({ ...config, prodClientSecret: e.target.value })
              }
              placeholder="Keep this secret"
            />
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <GlassButton onClick={onTestOne}>
            اختبار اتصال واحد مع Chiron (رحلة تجريبية)
          </GlassButton>
          <GlassButton onClick={onTestFive} variant="secondary">
            إرسال 5 رحلات اختبار (متطلبات التفعيل)
          </GlassButton>
          {lastTestReport && (
            <GlassButton onClick={onPrintTestReport} variant="secondary">
              تحميل تقرير اختبار Chiron PDF
            </GlassButton>
          )}
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
            * يُفضل تنفيذ الاختبارات في بيئة TEST.<br />
            * زر 5 رحلات يرسل 5 مرات (reservatie → vertrek → aankomst) كما تطلب Chiron قبل تفعيل PROD.<br />
            * تقرير الاختبار الآن يتضمن نوع الرحلة، التوقيت، GPS، المسافة والسعر، ويمكن تقديمه للبلدية كإثبات.
          </p>
        </div>
      </GlassCard>

      {chironLogs.length > 0 && (
        <GlassCard className="p-4 max-h-56 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-300">
            <Icons.Info className="w-4 h-4" />
            <span>آخر ردود Chiron</span>
          </div>
          {chironLogs.map((log, i) => (
            <div
              key={i}
              className="border-b border-white/10 pb-2 mb-2 text-[11px]"
            >
              <p className="font-bold text-emerald-300">
                [{log.when}] {log.type}
              </p>
              <pre className="whitespace-pre-wrap text-slate-300">
                {log.message}
              </pre>
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
};

// ========== History Screen ==========
const HistoryScreen = ({ history, config, onReprint, onResend, t, lang }) => {
  if (!history.length) {
    return (
      <GlassCard className="p-6">
        <p className="text-sm text-slate-300 text-center">
          {lang === 'ar' ? 'لا يوجد أي رحلات مسجلة بعد.' : lang === 'nl' ? 'Nog geen ritten geregistreerd.' : 'Aucune course enregistrée pour le moment.'}
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3 pb-28">
      {history.map((trip) => {
        const { net, vat, total, vatRate } = calcInvoice(trip.price, config);
        return (
          <GlassCard key={trip.ritnummer} className="p-4">
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs text-slate-400">
                #{trip.ritnummer} · {trip.tripType || 'TAXI'}
              </div>
              <div
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  trip.chironOk
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/40'
                }`}
              >
                {trip.chironOk ? 'CHIRON OK' : 'CHIRON ?'}
              </div>
            </div>
            <div className="text-[11px] text-slate-300 mb-1">
              {formatDateTime(trip.startTimeIso)} → {formatDateTime(trip.endTimeIso)}
            </div>
            <div className="text-[10px] text-slate-400 mb-1">
              Start: {formatGps(trip.startLat, trip.startLng)}
              {trip.startAddress ? ` · ${trip.startAddress}` : ''}
            </div>
            <div className="text-[10px] text-slate-400 mb-2">
              End:&nbsp;&nbsp;{formatGps(trip.endLat, trip.endLng)}
              {trip.endAddress ? ` · ${trip.endAddress}` : ''}
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs text-slate-400">
                {trip.distanceKm.toFixed(2)} km ·{' '}
                {Math.round((trip.waitingTime || 0) / 60)} min<br />
                HT: € {net.toFixed(2)} · TVA {vatRate}%: € {vat.toFixed(2)}
              </div>
              <div className="text-sm font-bold text-emerald-400">
                € {total.toFixed(2)}
              </div>
            </div>
            <div className="flex gap-2">
              <GlassButton
                variant="secondary"
                onClick={() => onReprint(trip)}
              >
                فاتورة للعميل (PDF)
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={() => onResend(trip)}
              >
                إعادة إرسال إلى Chiron
              </GlassButton>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

// ========== Main App ==========
const App = () => {
  const [lang, setLang] = useState('ar'); // 'ar' | 'nl' | 'fr'

  const translations = {
    ar: {
      meter_tab: 'العداد',
      history_tab: 'الرحلات',
      settings_tab: 'الإعدادات',
      start_trip: 'بدء الرحلة',
      stop_trip: 'إيقاف + Chiron + فاتورة',
      trip_type: 'نوع الرحلة',
      amount_ttc: 'المبلغ (TTC)',
    },
    nl: {
      meter_tab: 'METER',
      history_tab: 'Ritten',
      settings_tab: 'Instellingen',
      start_trip: 'Rit starten',
      stop_trip: 'Stop + Chiron + Factuur',
      trip_type: 'Rittype',
      amount_ttc: 'Bedrag (TTC)',
    },
    fr: {
      meter_tab: 'Compteur',
      history_tab: 'Courses',
      settings_tab: 'Paramètres',
      start_trip: 'Démarrer la course',
      stop_trip: 'Stop + Chiron + Facture',
      trip_type: 'Type de course',
      amount_ttc: 'Montant (TTC)',
    },
  };

  const t = (key) => {
    return (translations[lang] && translations[lang][key]) || translations.ar[key] || key;
  };


const [tab, setTab] = useState('meter');
const [settingsUnlocked, setSettingsUnlocked] = useState(false);
const [settingsPin, setSettingsPin] = useState('');
const SETTINGS_PIN = '699381612';

  const [isTripActive, setIsTripActive] = useState(false);

  const [config, setConfig] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jouw_taxi_os_cfg'));
      return {
        companyName: 'JOUW DRIVER',
        kboNumber: '',
        defaultPlate: '',
        driverCardId: '',
        companyPhone: '',
        companyEmail: '',
        companyAddress: '',
        driverName: '',
        baseFare: 4.5,
        kmRate: 2.3,
        waitRate: 0.5,
        env: 'TEST',
        clientId: '',
        clientSecret: '',
        testClientId: '',
        testClientSecret: '',
        prodClientId: '',
        prodClientSecret: '',
        vatRate: 0.06,
        vatRate: 0.06,
        ...saved
      };
    } catch {
      return {
        companyName: 'JOUW DRIVER',
        kboNumber: '',
        defaultPlate: '',
        driverCardId: '',
        companyPhone: '',
        companyEmail: '',
        companyAddress: '',
        driverName: '',
        baseFare: 4.5,
        kmRate: 2.3,
        waitRate: 0.5,
        env: 'TEST',
        clientId: '',
        clientSecret: '',
        testClientId: '',
        testClientSecret: '',
        prodClientId: '',
        prodClientSecret: '',
        vatRate: 0.06
      };
    }
  });
// تحميل إعدادات الشركة الافتراضية من ملف JSON (للإصدارات المخصصة لكل شركة)
useEffect(() => {
  fetch('/company-config.json')
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .then((data) => {
      if (!data) return;
      setConfig((prev) => {
        const merged = { ...prev, ...data };
        try {
          localStorage.setItem('jouw_taxi_os_cfg', JSON.stringify(merged));
        } catch {}
        return merged;
      });
    })
    .catch(() => {
      // إذا لم يوجد الملف أو حدث خطأ، نستمر بالإعدادات الحالية
    });
}, []);
useEffect(() => {
  try {
    const saved = localStorage.getItem('jouw_taxi_os_settings_unlocked');
    if (saved === '1') {
      setSettingsUnlocked(true);
    }
  } catch {}
}, []);


  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jouw_taxi_os_history'));
      return saved || [];
    } catch {
      return [];
    }
  });
  const [chironLogs, setChironLogs] = useState([]);
  const [lastTestReport, setLastTestReport] = useState(null);

  useEffect(() => {
    localStorage.setItem('jouw_taxi_os_cfg', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.
useEffect(() => {
  const syncPending = async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;
    const pending = history.filter((trip) => trip.needsChironSync && !trip.chironOk);
    if (!pending.length) return;

    for (const trip of pending.slice().reverse()) {
      try {
        const cfg = buildChironConfig(config);
        const r1 = await sendChironStatus('reservatie', trip, cfg);
        pushChironLog('SYNC reservatie', r1);
        const r2 = await sendChironStatus('vertrek', trip, cfg);
        pushChironLog('SYNC vertrek', r2);
        const r3 = await sendChironStatus('aankomst', trip, cfg);
        pushChironLog('SYNC aankomst', r3);

        setHistory((prev) =>
          prev.map((t) =>
            t.ritnummer === trip.ritnummer
              ? { ...t, chironOk: true, needsChironSync: false }
              : t
          )
        );
      } catch (e) {
        console.error(e);
        pushChironLog('SYNC ERROR', e.message);
      }
    }
  };

  syncPending();

  const handleOnline = () => {
    syncPending();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleOnline);
  }
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', handleOnline);
    }
  };
}, [history, config]);
setItem('jouw_taxi_os_history', JSON.stringify(history));
  }, [history]);

  const pushChironLog = (type, message) => {
    setChironLogs((prev) => [
      {
        type,
        when: new Date().toLocaleTimeString(),
        message: typeof message === 'string' ? message : JSON.stringify(message)
      },
      ...prev
    ]);
  };

  const handleTestOne = async () => {
    if (!config.defaultPlate || !config.driverCardId) {
      alert('يجب تعبئة لوحة السيارة ورقم bestuurderspas في إعدادات النظام قبل إرسال الرحلات التجريبية.');
      return;
    }
    if (config.env !== 'TEST') {
      alert('من فضلك اختر TEST أولاً قبل إرسال الرحلات التجريبية.');
      return;
    }
    try {
      const now = new Date();
      const startIso = now.toISOString();
      const endIso = new Date(now.getTime() + 5 * 60000).toISOString();
      const dummyTrip = {
        ritnummer: 'TEST_' + Date.now(),
        tripType: 'TAXI',
        startTimeIso: startIso,
        endTimeIso: endIso,
        startLat: 51.054344,
        startLng: 3.717425,
        endLat: 50.999807,
        endLng: 3.710618,
        distanceKm: 2.0,
        price: 10.0
      };
      const r1 = await sendChironStatus('reservatie', dummyTrip, buildChironConfig(config));
      pushChironLog('TEST reservatie', r1);
      const r2 = await sendChironStatus('vertrek', dummyTrip, buildChironConfig(config));
      pushChironLog('TEST vertrek', r2);
      const r3 = await sendChironStatus('aankomst', dummyTrip, buildChironConfig(config));
      pushChironLog('TEST aankomst', r3);

      const trips = [
        {
          ritnummer: dummyTrip.ritnummer,
          ok: true,
          tripType: dummyTrip.tripType,
          startTime: formatDateTime(dummyTrip.startTimeIso),
          endTime: formatDateTime(dummyTrip.endTimeIso),
          startGps: formatGps(dummyTrip.startLat, dummyTrip.startLng),
          endGps: formatGps(dummyTrip.endLat, dummyTrip.endLng),
          distance: dummyTrip.distanceKm.toFixed(2),
          price: dummyTrip.price.toFixed(2)
        }
      ];

      const report = {
        env: config.env,
        createdAt: new Date().toISOString(),
        trips
      };
      setLastTestReport(report);
      openTestReportPrintWindow(report, config);

      alert('تم إرسال رحلة اختبار كاملة (reservatie + vertrek + aankomst).');
    } catch (e) {
      pushChironLog('TEST ERROR', e.message);
      alert('خطأ في الاتصال بـ Chiron: ' + e.message);
    }
  };

  const handleTestFive = async () => {
    if (!config.defaultPlate || !config.driverCardId) {
      alert('يجب تعبئة لوحة السيارة ورقم bestuurderspas في إعدادات النظام قبل إرسال الرحلات التجريبية.');
      return;
    }
    if (config.env !== 'TEST') {
      alert('من فضلك اختر TEST أولاً قبل إرسال الرحلات التجريبية.');
      return;
    }
    const trips = [];
    try {
      for (let i = 0; i < 5; i++) {
        const now = new Date();
        const startIso = now.toISOString();
        const endIso = new Date(now.getTime() + (5 + i) * 60000).toISOString();
        const dummyTrip = {
          ritnummer: 'TEST5_' + Date.now() + '_' + i,
          tripType: 'TAXI',
          startTimeIso: startIso,
          endTimeIso: endIso,
          startLat: 51.054344,
          startLng: 3.717425,
          endLat: 50.999807,
          endLng: 3.710618,
          distanceKm: 3.0 + i,
          price: 12.0 + i
        };
        const r1 = await sendChironStatus('reservatie', dummyTrip, buildChironConfig(config));
        pushChironLog(`TEST5[${i+1}] reservatie`, r1);
        const r2 = await sendChironStatus('vertrek', dummyTrip, buildChironConfig(config));
        pushChironLog(`TEST5[${i+1}] vertrek`, r2);
        const r3 = await sendChironStatus('aankomst', dummyTrip, buildChironConfig(config));
        pushChironLog(`TEST5[${i+1}] aankomst`, r3);

        trips.push({
          ritnummer: dummyTrip.ritnummer,
          ok: true,
          tripType: dummyTrip.tripType,
          startTime: formatDateTime(dummyTrip.startTimeIso),
          endTime: formatDateTime(dummyTrip.endTimeIso),
          startGps: formatGps(dummyTrip.startLat, dummyTrip.startLng),
          endGps: formatGps(dummyTrip.endLat, dummyTrip.endLng),
          distance: dummyTrip.distanceKm.toFixed(2),
          price: dummyTrip.price.toFixed(2)
        });
      }

      const report = {
        env: config.env,
        createdAt: new Date().toISOString(),
        trips
      };
      setLastTestReport(report);
      openTestReportPrintWindow(report, config);

      alert('تم إرسال 5 رحلات اختبار كاملة بنجاح إلى Chiron (TEST).');
    } catch (e) {
      trips.push({
        ritnummer: 'ERROR',
        ok: false,
        error: e.message
      });
      const report = {
        env: config.env,
        createdAt: new Date().toISOString(),
        trips
      };
      setLastTestReport(report);
      openTestReportPrintWindow(report, config);

      pushChironLog('TEST5 ERROR', e.message);
      alert('خطأ أثناء إرسال الرحلات التجريبية: ' + e.message);
    }
  };

  const handleTripFinished = (trip) => {
    pushChironLog(
      'Trip Finished',
      `ritnummer=${trip.ritnummer}, km=${trip.distanceKm.toFixed(
        2
      )}, price=${trip.price.toFixed(2)}`
    );
  };

  const handleSaveToHistory = (trip) => {
    setHistory((prev) => [trip, ...prev].slice(0, 500));
  };

  const handleReprint = (trip) => {
    openInvoicePrintWindow(trip, config);
  };

const handleResend = async (trip) => {
  if (trip.chironOk && !trip.needsChironSync) {
    alert('تم إرسال هذه الرحلة مسبقاً إلى Chiron ولا يمكن إعادة إرسالها.');
    return;
  }
  try {
    const updatedTrip = { ...trip };
    const cfg = buildChironConfig(config);
    const r1 = await sendChironStatus('reservatie', updatedTrip, cfg);
    pushChironLog('RESEND reservatie', r1);
    const r2 = await sendChironStatus('vertrek', updatedTrip, cfg);
    pushChironLog('RESEND vertrek', r2);
    const r3 = await sendChironStatus('aankomst', updatedTrip, cfg);
    pushChironLog('RESEND aankomst', r3);
    setHistory((prev) =>
      prev.map((t) =>
        t.ritnummer === trip.ritnummer ? { ...t, chironOk: true, needsChironSync: false } : t
      )
    );
    alert('تمت إعادة إرسال الرحلة إلى Chiron بنجاح.');
  } catch (e) {
    pushChironLog('RESEND ERROR', e.message);
    alert('خطأ أثناء إعادة الإرسال إلى Chiron: ' + e.message);
  }
};

  const handlePrintTestReport = () => {
    if (lastTestReport) {
      openTestReportPrintWindow(lastTestReport, config);
    }
  };

  const handleTabChange = (target) => {
    if (isTripActive && target !== 'meter') {
      alert('لا يمكن مغادرة شاشة العداد أثناء الرحلة حسب المتطلبات القانونية.\nقم بإنهاء الرحلة أولاً.');
      return;
    }
    setTab(target);
  };

  return (
    <div className="min-h-screen pb-28 px-4 pt-6 max-w-md mx-auto relative">
      <div className="ambient-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="relative z-10">
      <div className="flex justify-end mb-2">
        <div className="inline-flex bg-black/40 rounded-full p-1 border border-white/10 text-[10px] font-bold">
          <button
            onClick={() => setLang('ar')}
            className={`px-2 py-0.5 rounded-full ${lang === 'ar' ? 'bg-white text-black' : 'text-slate-300'}`}
          >
            AR
          </button>
          <button
            onClick={() => setLang('nl')}
            className={`px-2 py-0.5 rounded-full ${lang === 'nl' ? 'bg-white text-black' : 'text-slate-300'}`}
          >
            NL
          </button>
          <button
            onClick={() => setLang('fr')}
            className={`px-2 py-0.5 rounded-full ${lang === 'fr' ? 'bg-white text-black' : 'text-slate-300'}`}
          >
            FR
          </button>
        </div>
      </div>
        <Logo companyName={config.companyName} />

        {tab === 'meter' && (
          <Taximeter
            t={t} lang={lang} config={config}
            onTripFinished={handleTripFinished}
            onSaveToHistory={handleSaveToHistory}
            pushChironLog={pushChironLog}
            onActiveChange={setIsTripActive}
          />
        )}

{tab === 'settings' && (
  !settingsUnlocked ? (
    <div className="space-y-4 pb-28">
      <GlassCard className="p-5">
        <h2 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">
          قفل الإعدادات
        </h2>
        <p className="text-sm text-slate-300 mb-3">
          يرجى إدخال رمز الوصول للإعدادات الخاصة بالشركة.
        </p>
        <GlassInput
          label="رمز الإعدادات"
          value={settingsPin}
          onChange={(e) => setSettingsPin(e.target.value)}
          placeholder="*********"
          type="password"
        />
        <div className="flex justify-end mt-3">
          <GlassButton
            onClick={() => {
              if (settingsPin === SETTINGS_PIN) {
                setSettingsUnlocked(true);
                try {
                  localStorage.setItem('jouw_taxi_os_settings_unlocked', '1');
                } catch {}
              } else {
                alert('رمز غير صحيح. يرجى المحاولة مرة أخرى.');
              }
            }}
          >
            دخول
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  ) : (
    <SettingsScreen
      config={config}
      setConfig={setConfig}
      chironLogs={chironLogs}
      onTestOne={handleTestOne}
      onTestFive={handleTestFive}
      lastTestReport={lastTestReport}
      onPrintTestReport={handlePrintTestReport}
      t={t}
      lang={lang}
    />
  )
)}

        {tab === 'history' && (
          <HistoryScreen
            config={config}
            t={t}
            lang={lang}
            history={history}
            onReprint={handleReprint}
            onResend={handleResend}
          />
        )}
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 glass-card px-7 py-4 rounded-full flex items-center gap-8 z-50">
        <button
          onClick={() => handleTabChange('meter')}
          className={`transition-all duration-300 ${
            tab === 'meter'
              ? 'text-emerald-400 scale-125 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          <Icons.Car className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleTabChange('history')}
          className={`transition-all duration-300 ${
            tab === 'history'
              ? 'text-amber-300 scale-125 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          <Icons.History className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleTabChange('settings')}
          className={`transition-all duration-300 ${
            tab === 'settings'
              ? 'text-blue-400 scale-125 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          <Icons.Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default App;
