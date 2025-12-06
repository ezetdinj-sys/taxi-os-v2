JOUW TAXI OS 26 – SaaS Ready Edition (v1)

هذه النسخة مبنية مباشرة على:
jouw-taxi-os-26-FINAL-v2
مع الحفاظ على كل شيء في الواجهة (OS 26 UI، العداد، السجل، الفواتير، Chiron، تقرير 5 رحلات اختبارية)
وإضافة طبقة بسيطة تجعلها جاهزة للبيع كمنتج لكل شركة تاكسي.

ما الذي تمت إضافته؟

1) ملف إعدادات شركة مستقل:
   client/public/company-config.json

   هذا الملف يحتوي على:
   - اسم الشركة
   - KBO / TVA
   - عنوان الشركة
   - الهاتف + البريد
   - اسم السائق الافتراضي
   - لوحة السيارة
   - رقم bestuurderspas
   - بيئة Chiron (TEST / PROD)
   - التوكنات الخاصة بـ Chiron (Test + Prod)
   - نسبة TVA (افتراضياً 6%)

2) عند فتح النظام لأول مرة:
   - يقوم App.jsx بقراءة company-config.json (إن وجد)
   - يدمج الإعدادات مع أي إعدادات محفوظة في localStorage
   - يخزن الإعدادات النهائية في localStorage تحت المفتاح:
        jouw_taxi_os_cfg

3) ما زال بإمكانك تعديل الإعدادات من شاشة "Settings" داخل النظام:
   - التغييرات تحفظ محلياً لكل جهاز (localStorage)
   - ملف company-config.json يعمل كـ "إعدادات افتراضية" للنسخة المخصصة لكل شركة.


كيف تستخدم هذه النسخة لبيع اشتراكات لشركات تاكسي؟

1) تجهز نسخة "أساس" على جهاز التطوير:
   - cd client
   - npm install
   - npm run dev  (للاختبار)
   بعد الانتهاء من الإعداد:

2) لكل شركة جديدة:
   - انسخ مجلد المشروع (أو أعمل fork / نسخة جديدة في Git)
   - افتح:
        client/public/company-config.json
   - غيّر فيه:
        companyName        → اسم الشركة
        kboNumber          → رقم KBO
        companyAddress     → العنوان الرسمي
        companyPhone       → هاتف الشركة
        companyEmail       → البريد الرسمي
        driverName         → اسم السائق الرئيسي (اختياري)
        defaultPlate       → لوحة السيارة الأساسية
        driverCardId       → رقم bestuurderspas
        env                → "TEST" أو "PROD"
        testClientId       → Client ID من Chiron (TEST)
        testClientSecret   → Secret من Chiron (TEST)
        prodClientId       → Client ID من Chiron (PROD)
        prodClientSecret   → Secret من Chiron (PROD)
        vatRate            → 0.06 للـ 6%

   - بعد التعديل، يمكنك عمل build وإرسال النسخة:

     داخل مجلد client:
        npm run build

     سيتم إنشاء مجلد dist/ جاهز للنشر على:
        - أي استضافة static (Netlify / Vercel / Nginx / Apache / …)
        - أو داخل server.js الحالي لو تحب تخدمه من Node.

3) تسليم النسخة للعميل:
   - إما تعطيه ملفات build (dist/) ليضعها على سيرفره
   - أو تستضيفها أنت على دومين (مثلاً: companyX.jouwdriver.be)
   - الحسابات وشهادة Chiron تكون مدمجة في company-config.json لتلك الشركة.

4) قانونياً / وظيفياً:
   - العداد، السجل، الفواتير، Chiron integration، تقرير 5 رحلات TEST
     كلها تبقى كما في النسخة الأصلية FINAL v2.
   - الفرق الوحيد أن إعدادات كل شركة أصبحت مفصولة في JSON مستقل.
