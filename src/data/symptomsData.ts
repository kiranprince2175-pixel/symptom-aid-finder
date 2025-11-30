export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: "mild" | "moderate" | "severe";
  icon: string;
}

export interface Medication {
  name: string;
  type: "OTC" | "Prescription";
  dosage: string;
  warnings: string[];
}

export interface Remedy {
  title: string;
  description: string;
  icon: string;
}

export interface SymptomResult {
  condition: string;
  description: string;
  severity: "low" | "moderate" | "high" | "emergency";
  medications: Medication[];
  remedies: Remedy[];
  whenToSeekHelp: string[];
}

export const symptoms: Symptom[] = [
  // Head & Neurological
  { id: "headache", name: "Headache", category: "Head & Neurological", severity: "mild", icon: "🤕" },
  { id: "migraine", name: "Migraine", category: "Head & Neurological", severity: "moderate", icon: "😵" },
  { id: "dizziness", name: "Dizziness", category: "Head & Neurological", severity: "moderate", icon: "💫" },
  { id: "confusion", name: "Confusion", category: "Head & Neurological", severity: "severe", icon: "😶‍🌫️" },
  
  // Respiratory
  { id: "cough", name: "Cough", category: "Respiratory", severity: "mild", icon: "🤧" },
  { id: "sore-throat", name: "Sore Throat", category: "Respiratory", severity: "mild", icon: "😷" },
  { id: "runny-nose", name: "Runny Nose", category: "Respiratory", severity: "mild", icon: "🤒" },
  { id: "shortness-breath", name: "Shortness of Breath", category: "Respiratory", severity: "severe", icon: "😮‍💨" },
  { id: "chest-tightness", name: "Chest Tightness", category: "Respiratory", severity: "severe", icon: "💔" },
  
  // Digestive
  { id: "nausea", name: "Nausea", category: "Digestive", severity: "mild", icon: "🤢" },
  { id: "vomiting", name: "Vomiting", category: "Digestive", severity: "moderate", icon: "🤮" },
  { id: "diarrhea", name: "Diarrhea", category: "Digestive", severity: "moderate", icon: "💩" },
  { id: "stomach-pain", name: "Stomach Pain", category: "Digestive", severity: "moderate", icon: "😣" },
  { id: "bloating", name: "Bloating", category: "Digestive", severity: "mild", icon: "🫃" },
  
  // General
  { id: "fever", name: "Fever", category: "General", severity: "moderate", icon: "🌡️" },
  { id: "fatigue", name: "Fatigue", category: "General", severity: "mild", icon: "😴" },
  { id: "body-aches", name: "Body Aches", category: "General", severity: "mild", icon: "🦴" },
  { id: "chills", name: "Chills", category: "General", severity: "mild", icon: "🥶" },
  
  // Skin
  { id: "rash", name: "Skin Rash", category: "Skin", severity: "mild", icon: "🔴" },
  { id: "itching", name: "Itching", category: "Skin", severity: "mild", icon: "✋" },
  { id: "hives", name: "Hives", category: "Skin", severity: "moderate", icon: "🟠" },
  
  // Musculoskeletal
  { id: "back-pain", name: "Back Pain", category: "Musculoskeletal", severity: "moderate", icon: "🔙" },
  { id: "joint-pain", name: "Joint Pain", category: "Musculoskeletal", severity: "moderate", icon: "🦵" },
  { id: "muscle-cramps", name: "Muscle Cramps", category: "Musculoskeletal", severity: "mild", icon: "💪" },
];

export const symptomCategories = [
  "Head & Neurological",
  "Respiratory",
  "Digestive",
  "General",
  "Skin",
  "Musculoskeletal",
];

export function analyzeSymptoms(selectedSymptomIds: string[]): SymptomResult {
  const selectedSymptoms = symptoms.filter(s => selectedSymptomIds.includes(s.id));
  
  // Check for emergency conditions
  const severeSymptoms = selectedSymptoms.filter(s => s.severity === "severe");
  const hasChestSymptoms = selectedSymptomIds.includes("chest-tightness") || selectedSymptomIds.includes("shortness-breath");
  const hasConfusion = selectedSymptomIds.includes("confusion");
  
  if (hasChestSymptoms || hasConfusion) {
    return {
      condition: "Potential Emergency Condition",
      description: "Your symptoms may indicate a serious condition requiring immediate medical attention.",
      severity: "emergency",
      medications: [],
      remedies: [
        { title: "Call Emergency Services", description: "Dial your local emergency number (911) immediately", icon: "🚨" },
        { title: "Stay Calm", description: "Try to remain calm and still while waiting for help", icon: "🧘" },
        { title: "Don't Drive Yourself", description: "Wait for emergency services or have someone drive you", icon: "🚗" },
      ],
      whenToSeekHelp: [
        "Call 911 immediately",
        "Do not wait to see if symptoms improve",
        "If possible, have someone stay with you",
      ],
    };
  }
  
  // Check for cold/flu symptoms
  const coldFluSymptoms = ["cough", "sore-throat", "runny-nose", "fever", "body-aches", "fatigue", "chills"];
  const matchingColdFlu = selectedSymptomIds.filter(id => coldFluSymptoms.includes(id));
  
  if (matchingColdFlu.length >= 3) {
    return {
      condition: "Common Cold or Flu",
      description: "Your symptoms suggest a viral upper respiratory infection such as the common cold or influenza.",
      severity: selectedSymptomIds.includes("fever") ? "moderate" : "low",
      medications: [
        { name: "Acetaminophen (Tylenol)", type: "OTC", dosage: "500-1000mg every 4-6 hours as needed", warnings: ["Do not exceed 4000mg in 24 hours", "Avoid alcohol"] },
        { name: "Ibuprofen (Advil)", type: "OTC", dosage: "200-400mg every 4-6 hours with food", warnings: ["Take with food", "Not for those with stomach ulcers"] },
        { name: "Dextromethorphan (Cough Suppressant)", type: "OTC", dosage: "10-20mg every 4 hours", warnings: ["May cause drowsiness", "Don't combine with other cough medicines"] },
        { name: "Pseudoephedrine (Sudafed)", type: "OTC", dosage: "60mg every 4-6 hours", warnings: ["May increase blood pressure", "Avoid before bedtime"] },
      ],
      remedies: [
        { title: "Rest Well", description: "Get plenty of sleep to help your body recover", icon: "😴" },
        { title: "Stay Hydrated", description: "Drink water, herbal tea, and clear broths", icon: "💧" },
        { title: "Warm Salt Gargle", description: "Mix 1/4 tsp salt in warm water, gargle for sore throat", icon: "🧂" },
        { title: "Honey & Lemon", description: "Mix honey and lemon in warm water to soothe throat", icon: "🍯" },
        { title: "Steam Inhalation", description: "Breathe in steam from hot water to clear congestion", icon: "♨️" },
      ],
      whenToSeekHelp: [
        "Fever above 103°F (39.4°C)",
        "Symptoms lasting more than 10 days",
        "Difficulty breathing or chest pain",
        "Severe headache or neck stiffness",
      ],
    };
  }
  
  // Check for digestive issues
  const digestiveSymptoms = ["nausea", "vomiting", "diarrhea", "stomach-pain", "bloating"];
  const matchingDigestive = selectedSymptomIds.filter(id => digestiveSymptoms.includes(id));
  
  if (matchingDigestive.length >= 2) {
    return {
      condition: "Digestive Upset / Gastroenteritis",
      description: "Your symptoms suggest a digestive system issue, possibly viral gastroenteritis or food-related upset.",
      severity: selectedSymptomIds.includes("vomiting") && selectedSymptomIds.includes("diarrhea") ? "moderate" : "low",
      medications: [
        { name: "Pepto-Bismol", type: "OTC", dosage: "30ml or 2 tablets every 30-60 minutes as needed", warnings: ["May cause black stool", "Don't use for more than 2 days"] },
        { name: "Loperamide (Imodium)", type: "OTC", dosage: "4mg initially, then 2mg after each loose stool", warnings: ["Don't use if fever present", "Max 16mg per day"] },
        { name: "Ondansetron (Zofran)", type: "Prescription", dosage: "4-8mg every 8 hours as needed", warnings: ["May cause headache", "Consult doctor before use"] },
      ],
      remedies: [
        { title: "BRAT Diet", description: "Eat bananas, rice, applesauce, and toast", icon: "🍌" },
        { title: "Clear Fluids", description: "Sip water, clear broth, or electrolyte drinks", icon: "💧" },
        { title: "Ginger Tea", description: "Drink ginger tea to help settle your stomach", icon: "🫚" },
        { title: "Peppermint", description: "Peppermint tea or candy can help with nausea", icon: "🌿" },
        { title: "Avoid Dairy & Fatty Foods", description: "Skip these until symptoms improve", icon: "🚫" },
      ],
      whenToSeekHelp: [
        "Blood in vomit or stool",
        "Signs of dehydration (extreme thirst, dark urine)",
        "Severe abdominal pain",
        "Symptoms lasting more than 3 days",
        "High fever (above 102°F / 38.9°C)",
      ],
    };
  }
  
  // Check for pain/aches
  const painSymptoms = ["headache", "migraine", "back-pain", "joint-pain", "muscle-cramps", "body-aches"];
  const matchingPain = selectedSymptomIds.filter(id => painSymptoms.includes(id));
  
  if (matchingPain.length >= 1) {
    const isMigraine = selectedSymptomIds.includes("migraine");
    return {
      condition: isMigraine ? "Migraine Headache" : "General Pain & Discomfort",
      description: isMigraine 
        ? "Your symptoms suggest a migraine, which may cause severe throbbing pain, often on one side of the head."
        : "Your symptoms indicate musculoskeletal or general pain that can often be managed with rest and appropriate treatment.",
      severity: isMigraine ? "moderate" : "low",
      medications: [
        { name: "Ibuprofen (Advil, Motrin)", type: "OTC", dosage: "200-400mg every 4-6 hours with food", warnings: ["Take with food", "Not for long-term use"] },
        { name: "Acetaminophen (Tylenol)", type: "OTC", dosage: "500-1000mg every 4-6 hours", warnings: ["Do not exceed 4000mg daily", "Avoid with alcohol"] },
        { name: "Naproxen (Aleve)", type: "OTC", dosage: "220mg every 8-12 hours", warnings: ["Take with food", "May cause stomach upset"] },
        ...(isMigraine ? [{ name: "Excedrin Migraine", type: "OTC" as const, dosage: "2 caplets at first sign of migraine", warnings: ["Contains caffeine", "Don't use more than 2 days per week"] }] : []),
      ],
      remedies: [
        { title: "Apply Ice or Heat", description: "Use ice pack for acute pain, heat for muscle tension", icon: "🧊" },
        { title: "Rest in Dark Room", description: "For migraines, rest in a quiet, dark room", icon: "🌙" },
        { title: "Gentle Stretching", description: "Light stretches can help relieve muscle tension", icon: "🧘" },
        { title: "Stay Hydrated", description: "Dehydration can worsen headaches and muscle cramps", icon: "💧" },
        { title: "Massage", description: "Gentle massage can help relieve muscle tension", icon: "💆" },
      ],
      whenToSeekHelp: [
        "Sudden, severe headache unlike any before",
        "Pain accompanied by fever or stiff neck",
        "Pain that doesn't improve with treatment",
        "Numbness, weakness, or vision changes",
      ],
    };
  }
  
  // Check for allergic/skin reactions
  const skinSymptoms = ["rash", "itching", "hives"];
  const matchingSkin = selectedSymptomIds.filter(id => skinSymptoms.includes(id));
  
  if (matchingSkin.length >= 1) {
    return {
      condition: "Allergic Reaction / Skin Irritation",
      description: "Your symptoms suggest an allergic reaction or skin irritation. Monitor for any worsening symptoms.",
      severity: selectedSymptomIds.includes("hives") ? "moderate" : "low",
      medications: [
        { name: "Diphenhydramine (Benadryl)", type: "OTC", dosage: "25-50mg every 4-6 hours", warnings: ["Causes drowsiness", "Don't drive after taking"] },
        { name: "Cetirizine (Zyrtec)", type: "OTC", dosage: "10mg once daily", warnings: ["May cause mild drowsiness", "Take at same time daily"] },
        { name: "Hydrocortisone Cream 1%", type: "OTC", dosage: "Apply thin layer to affected area 2-4 times daily", warnings: ["Don't use on face for extended periods", "Not for deep wounds"] },
        { name: "Calamine Lotion", type: "OTC", dosage: "Apply to affected areas as needed", warnings: ["For external use only", "Avoid eyes and mouth"] },
      ],
      remedies: [
        { title: "Cool Compress", description: "Apply cool, damp cloth to affected areas", icon: "🧊" },
        { title: "Oatmeal Bath", description: "Add colloidal oatmeal to lukewarm bath", icon: "🛁" },
        { title: "Avoid Scratching", description: "Keep nails short and try not to scratch", icon: "✋" },
        { title: "Wear Loose Clothing", description: "Choose soft, breathable fabrics", icon: "👕" },
        { title: "Identify Triggers", description: "Note any new products or foods that may have caused the reaction", icon: "📝" },
      ],
      whenToSeekHelp: [
        "Difficulty breathing or swallowing",
        "Swelling of face, lips, or tongue",
        "Rash spreading rapidly",
        "Fever accompanying the rash",
        "Symptoms not improving after 48 hours",
      ],
    };
  }
  
  // Default general symptoms
  return {
    condition: "General Symptoms",
    description: "Based on your selected symptoms, here are some general recommendations. If symptoms persist or worsen, consult a healthcare provider.",
    severity: "low",
    medications: [
      { name: "Acetaminophen (Tylenol)", type: "OTC", dosage: "500-1000mg every 4-6 hours as needed", warnings: ["Do not exceed 4000mg in 24 hours", "Avoid alcohol"] },
      { name: "Ibuprofen (Advil)", type: "OTC", dosage: "200-400mg every 4-6 hours with food", warnings: ["Take with food", "Not for those with stomach ulcers"] },
    ],
    remedies: [
      { title: "Get Adequate Rest", description: "Allow your body time to recover", icon: "😴" },
      { title: "Stay Hydrated", description: "Drink plenty of water and clear fluids", icon: "💧" },
      { title: "Monitor Symptoms", description: "Keep track of any changes in your symptoms", icon: "📝" },
      { title: "Healthy Diet", description: "Eat nutritious foods to support recovery", icon: "🥗" },
    ],
    whenToSeekHelp: [
      "Symptoms worsen or don't improve",
      "New symptoms develop",
      "High fever develops",
      "You're unsure about your condition",
    ],
  };
}
