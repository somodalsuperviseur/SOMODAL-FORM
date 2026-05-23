import { useState, useEffect } from "react";

const BRAND = {
  primary: "#C8252A",
  dark: "#1a1a2e",
  mid: "#16213e",
  light: "#e8e8e8",
  accent: "#f0a500",
  white: "#ffffff",
  gray: "#6b7280",
  lightGray: "#f4f4f4",
};

const steps = [
  // ── INTRO ──────────────────────────────────────────────
  {
    id: "intro",
    type: "intro",
    section: "",
    title: "استمارة طلب وظيفة\nFormulaire de Candidature",
    subtitle:
      "مرحباً بك في SOMODAL — Solutions Aluminium & Volets Roulants\n\nيُرجى الإجابة بصدق وبشكل كامل. تُستخدم هذه المعلومات لأغراض التوظيف فقط.\nVeuillez répondre avec sincérité. Ces informations sont strictement confidentielles.",
  },

  // ── SECTION 1 : PROFIL ──────────────────────────────────
  {
    id: "fullname",
    type: "text",
    section: "الملف الشخصي — Profil",
    question: "الاسم الكامل — Nom et Prénom *",
    placeholder: "أدخل اسمك الكامل / Entrez votre nom complet",
    required: true,
  },
  {
    id: "phone",
    type: "text",
    section: "الملف الشخصي — Profil",
    question: "رقم الهاتف — Numéro de téléphone *",
    placeholder: "0X XX XX XX XX",
    required: true,
  },
  {
    id: "dob",
    type: "text",
    section: "الملف الشخصي — Profil",
    question: "تاريخ الميلاد — Date de naissance *",
    placeholder: "JJ/MM/AAAA",
    required: true,
  },
  {
    id: "nationality",
    type: "radio",
    section: "الملف الشخصي — Profil",
    question: "الجنسية — Nationalité *",
    options: ["جزائري / Algérien(ne)", "أخرى / Autre"],
    required: true,
  },
  {
    id: "gender",
    type: "radio",
    section: "الملف الشخصي — Profil",
    question: "الجنس — Sexe *",
    options: ["ذكر / Masculin", "أنثى / Féminin"],
    required: true,
  },
  {
    id: "address",
    type: "textarea",
    section: "الملف الشخصي — Profil",
    question: "عنوان الإقامة الحالي — Adresse de résidence actuelle *",
    placeholder: "الولاية، البلدية، الحي / Wilaya, commune, quartier",
    required: true,
  },

  // ── SECTION 2 : SITUATION GÉNÉRALE ─────────────────────
  {
    id: "military",
    type: "radio",
    section: "الوضع العام — Situation générale",
    question: "الخدمة الوطنية — Service National *",
    options: [
      "أنثى (غير معنية) / Je suis une fille",
      "أدّيتها / Accompli",
      "مؤجّلة / Ajourné",
      "إعفاء / Dispensé",
      "لم أُؤدِّها بعد / Pas encore effectué",
    ],
    required: true,
  },
  {
    id: "current_status",
    type: "radio",
    section: "الوضع العام — Situation générale",
    question: "الوضع المهني الحالي — Situation professionnelle actuelle *",
    options: [
      "عاطل / Sans emploi",
      "طالب / Étudiant(e)",
      "موظف في القطاع الخاص / Employé secteur privé",
      "موظف في القطاع العام / Employé secteur public",
      "أعمال حرة / Indépendant(e)",
      "أخرى / Autre",
    ],
    required: true,
  },

  // ── SECTION 3 : CV & FORMATION ─────────────────────────
  {
    id: "education",
    type: "radio",
    section: "المؤهلات — Formation",
    question: "المستوى الدراسي — Niveau de formation *",
    options: [
      "Bac+5 et plus",
      "Bac+4",
      "Bac+3",
      "Bac+2",
      "Bac",
      "Technicien Supérieur",
      "Technicien",
      "Secondaire",
      "Autre",
    ],
    required: true,
  },
  {
    id: "languages",
    type: "matrix",
    section: "المؤهلات — Formation",
    question: "مستوى اللغات — Maîtrise des langues *",
    rows: ["العربية / Arabe", "الفرنسية / Français", "الإنجليزية / Anglais"],
    cols: ["مبتدئ / Débutant", "متوسط / Moyen", "جيد / Bien", "ممتاز / Avancé"],
    required: true,
  },
  {
    id: "it_skills",
    type: "matrix",
    section: "المؤهلات — Formation",
    question: "إتقان أدوات الإعلام الآلي — Compétences informatiques *",
    rows: ["Office - Word", "Office - Excel", "Office - PowerPoint", "Office - Access"],
    cols: ["مبتدئ", "متوسط", "جيد", "ممتاز"],
    required: true,
  },
  {
    id: "other_it",
    type: "textarea",
    section: "المؤهلات — Formation",
    question: "كفاءات إعلام آلي إضافية — Autres compétences informatiques",
    placeholder: "برامج، منصات، أدوات أخرى...",
    required: false,
  },

  // ── SECTION 4 : CANDIDATURE ─────────────────────────────
  {
    id: "position",
    type: "checkbox",
    section: "التقدّم للمنصب — Candidature",
    question: "المناصب التي تستهدفها — Postes souhaités *",
    options: [
      "مشرف مبيعات / Superviseur des ventes",
      "مشرف لوجستيك وتموين / Superviseur logistique et approvisionnement",
      "عون مبيعات / Agent de ventes",
      "مسير مخزن / Gestionnaire de stock",
      "مسير وكالة / Gérant d'agence",
      "عون مخزن / Agent de stock - Magasinier",
      "ساعي / Livreur polyvalent",
      "أخرى / Autre",
    ],
    required: true,
  },
  {
    id: "contract_type",
    type: "radio",
    section: "التقدّم للمنصب — Candidature",
    question: "نوع العقد المرغوب — Type de contrat souhaité *",
    options: [
      "عقد دائم / Emploi permanent",
      "عقد مؤقت / Emploi temporaire",
      "أخرى / Autre",
    ],
    required: true,
  },
  {
    id: "preferred_location",
    type: "checkbox",
    section: "التقدّم للمنصب — Candidature",
    question: "الموقع الجغرافي المفضّل — Lieu de travail préféré *",
    options: ["قسنطينة / Constantine", "عنابة / Annaba", "أخرى / Autre"],
    required: true,
  },
  {
    id: "availability",
    type: "radio",
    section: "التقدّم للمنصب — Candidature",
    question: "متى يمكنك الانطلاق؟ — Disponibilité *",
    options: [
      "فوراً / Immédiatement",
      "خلال أسبوع / Dans une semaine",
      "خلال شهر / Dans un mois",
      "أخرى / Autre",
    ],
    required: true,
  },

  // ── SECTION 5 : CONDITIONS DE TRAVAIL ──────────────────
  {
    id: "salary",
    type: "textarea",
    section: "شروط العمل — Conditions de travail",
    question: "ما هي توقعاتك الأجرية؟ — Quelles sont vos exigences salariales ? *",
    placeholder: "أذكر المبلغ أو المدى بالدينار الجزائري...",
    required: true,
  },
  {
    id: "motivators",
    type: "textarea",
    section: "شروط العمل — Conditions de travail",
    question:
      "ما هي ظروف العمل التي تحفّزك على الأداء الجيد؟ — Quelles conditions de travail vous motivent à performer ? *",
    placeholder: "البيئة، الإدارة، الفريق، المرونة...",
    required: true,
  },
  {
    id: "company_relation",
    type: "textarea",
    section: "شروط العمل — Conditions de travail",
    question:
      "هل لديك علاقة بأحد موظفي الشركة؟ إن وجدت، ما طبيعتها؟ — Avez-vous une relation avec un membre de l'entreprise ?",
    placeholder: "اسم الشخص وطبيعة العلاقة / Nom et nature de la relation",
    required: false,
  },

  // ── SECTION 6 : QUESTIONS ESSENTIELLES ─────────────────
  {
    id: "leave_reason",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "لماذا ترغب في مغادرة وظيفتك الحالية أو تركت وظيفتك السابقة؟ — Pourquoi souhaitez-vous quitter votre emploi actuel / précédent ? *",
    placeholder: "كن صريحاً وموضوعياً...",
    required: true,
  },
  {
    id: "strengths",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "ما هي أبرز نقاط قوتك المهنية؟ — Quelles sont vos plus grandes forces professionnelles ? *",
    placeholder: "مهارات، إنجازات، ميزات تنافسية...",
    required: true,
  },
  {
    id: "weaknesses",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "ما هي نقاط ضعفك أو مجالات التطوير لديك؟ — Quels sont vos axes d'amélioration professionnels ? *",
    placeholder: "كن صريحاً — هذا يُقيّم وعيك الذاتي...",
    required: true,
  },
  {
    id: "leadership",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "هل ترى نفسك قادراً على قيادة فريق وتحمّل مسؤوليات إضافية مستقبلاً؟ — Vous voyez-vous capable de diriger une équipe à l'avenir ? *",
    placeholder: "وضّح رؤيتك المهنية على المدى المتوسط...",
    required: true,
  },
  {
    id: "objectives",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "ما هي أولويات أهدافك الأولى خلال 30 و60 و90 يوماً إذا حصلت على المنصب؟ — Quels seraient vos premiers objectifs pour les 30, 60 et 90 jours ? *",
    placeholder: "30 يوم: ...\n60 يوم: ...\n90 يوم: ...",
    required: true,
  },
  {
    id: "why_us",
    type: "textarea",
    section: "أسئلة جوهرية — Questions essentielles",
    question:
      "لماذا يجب أن نختارك من بين المترشحين؟ — Pourquoi devrions-nous vous choisir parmi les candidats ? *",
    placeholder: "ما الذي يميّزك؟ ما قيمتك المضافة لـ SOMODAL؟",
    required: true,
  },

  // ── OUTRO ───────────────────────────────────────────────
  {
    id: "outro",
    type: "outro",
    section: "",
    title: "شكراً على تقدّمك — Merci pour votre candidature",
    subtitle:
      "تمّ استلام استمارتك بنجاح.\nسيتم التواصل معك في حال تجاوزت مرحلة التصفية.\n\nVotre formulaire a bien été reçu.\nNous vous contacterons si votre profil est retenu pour un entretien.",
  },
];

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", marginBottom: 24 }}>
      <div
        style={{
          height: 3,
          background: "#e2e2e2",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: BRAND.primary,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 11,
          color: BRAND.gray,
          marginTop: 6,
          fontFamily: "monospace",
          letterSpacing: 1,
        }}
      >
        {current}/{total}
      </div>
    </div>
  );
}

function MatrixQuestion({ rows, cols, value = {}, onChange }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 340 }}>
        <thead>
          <tr>
            <th style={{ width: "35%", padding: "6px 8px", textAlign: "right", fontSize: 12, color: BRAND.gray }} />
            {cols.map((c) => (
              <th
                key={c}
                style={{
                  padding: "6px 4px",
                  fontSize: 11,
                  color: BRAND.gray,
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row}
              style={{
                background: ri % 2 === 0 ? "#fafafa" : "#ffffff",
                borderBottom: "1px solid #eee",
              }}
            >
              <td style={{ padding: "10px 8px", fontSize: 13, color: BRAND.dark, textAlign: "right", direction: "rtl" }}>
                {row}
              </td>
              {cols.map((col) => (
                <td key={col} style={{ textAlign: "center", padding: "10px 4px" }}>
                  <input
                    type="radio"
                    name={`matrix-${row}`}
                    checked={value[row] === col}
                    onChange={() => onChange({ ...value, [row]: col })}
                    style={{ accentColor: BRAND.primary, cursor: "pointer", width: 16, height: 16 }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const step = steps[currentStep];
  const totalQuestions = steps.filter((s) => s.type !== "intro" && s.type !== "outro").length;
  const answeredQuestions = steps.filter(
    (s, i) => i < currentStep && s.type !== "intro" && s.type !== "outro"
  ).length;

  const value = answers[step.id];

  function setValue(val) {
    setAnswers((prev) => ({ ...prev, [step.id]: val }));
    setError("");
  }

  function validate() {
    if (!step.required) return true;
    if (step.type === "intro" || step.type === "outro") return true;
    if (!value || (Array.isArray(value) && value.length === 0)) {
      setError("هذا الحقل إلزامي — Ce champ est obligatoire");
      return false;
    }
    if (step.type === "matrix") {
      const missing = step.rows.filter((r) => !value || !value[r]);
      if (missing.length > 0) {
        setError("يُرجى الإجابة على جميع الصفوف — Veuillez répondre à toutes les lignes");
        return false;
      }
    }
    return true;
  }

  function go(dir) {
    if (dir === "next" && !validate()) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      if (dir === "next") {
        if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
      } else {
        if (currentStep > 0) setCurrentStep((s) => s - 1);
      }
      setAnimating(false);
      setError("");
    }, 200);
  }

  const isIntro = step.type === "intro";
  const isOutro = step.type === "outro";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.mid} 60%, #0f3460 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Segoe UI', 'Tahoma', 'Geneva', sans-serif",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: BRAND.white,
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: BRAND.primary,
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
              color: BRAND.white,
              letterSpacing: -1,
            }}
          >
            S
          </div>
          <div>
            <div style={{ color: BRAND.white, fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>
              SOMODAL
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: 0.5 }}>
              Solutions Aluminium & Volets Roulants
            </div>
          </div>
          {!isIntro && !isOutro && (
            <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.85)", fontSize: 12 }}>
              {step.section}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "32px 32px 28px" }}>
          {!isIntro && !isOutro && (
            <ProgressBar current={answeredQuestions} total={totalQuestions} />
          )}

          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "forward" ? 30 : -30}px)`
                : "translateX(0)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            {/* INTRO */}
            {isIntro && (
              <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: BRAND.dark,
                    lineHeight: 1.3,
                    marginBottom: 20,
                    whiteSpace: "pre-line",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: BRAND.gray,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                    marginBottom: 32,
                  }}
                >
                  {step.subtitle}
                </div>
                <button
                  onClick={() => go("next")}
                  style={{
                    background: BRAND.primary,
                    color: BRAND.white,
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 40px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 0.5,
                    boxShadow: `0 4px 20px ${BRAND.primary}55`,
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  ابدأ الاستمارة — Commencer ›
                </button>
              </div>
            )}

            {/* OUTRO */}
            {isOutro && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 28,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: BRAND.dark,
                    marginBottom: 16,
                    whiteSpace: "pre-line",
                    lineHeight: 1.4,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: BRAND.gray,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {step.subtitle}
                </div>
              </div>
            )}

            {/* QUESTION */}
            {!isIntro && !isOutro && (
              <div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: BRAND.dark,
                    marginBottom: 20,
                    lineHeight: 1.5,
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  {step.question}
                </div>

                {/* TEXT */}
                {step.type === "text" && (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={step.placeholder}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      fontSize: 14,
                      border: `2px solid ${error ? BRAND.primary : "#e0e0e0"}`,
                      borderRadius: 10,
                      outline: "none",
                      boxSizing: "border-box",
                      direction: "rtl",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.border
