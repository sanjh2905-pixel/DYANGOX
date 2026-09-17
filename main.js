


let currentStep = 1;


/* =========================================================
   PATIENT DATA
========================================================= */

let patientData = {

    symptoms: "",

    duration: "",

    additionalInfo: "",

    history: "",

    medications: "",

    allergies: "",

    reports: [],

    priority: "NORMAL",

    patientID: "",

    doctorDecision: ""

};


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage = "English";


/* =========================================================
   PATIENT / DOCTOR SWITCH
========================================================= */

function showPatient() {

    const patientFlow =
        document.getElementById("patientFlow");

    const doctorFlow =
        document.getElementById("doctorFlow");

    const patientBtn =
        document.getElementById("patientBtn");

    const doctorBtn =
        document.getElementById("doctorBtn");


    if (!patientFlow || !doctorFlow) return;


    patientFlow.classList.remove("hidden");

    doctorFlow.classList.add("hidden");


    if (patientBtn) {
        patientBtn.classList.add("active");
    }


    if (doctorBtn) {
        doctorBtn.classList.remove("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SHOW DOCTOR
========================================================= */

function showDoctor() {

    const patientFlow =
        document.getElementById("patientFlow");

    const doctorFlow =
        document.getElementById("doctorFlow");

    const patientBtn =
        document.getElementById("patientBtn");

    const doctorBtn =
        document.getElementById("doctorBtn");


    if (!patientFlow || !doctorFlow) return;


    patientFlow.classList.add("hidden");

    doctorFlow.classList.remove("hidden");


    if (patientBtn) {
        patientBtn.classList.remove("active");
    }


    if (doctorBtn) {
        doctorBtn.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PATIENT STEP NAVIGATION
========================================================= */

function nextStep(step) {

    currentStep = step;


    const screens =
        document.querySelectorAll(
            ".patient-screen"
        );


    screens.forEach(
        function(screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            "step" + step
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    updateProgress(step);

    updateStepText(step);

    updatePatientSubtitle(step);


    /* Generate assessment when Step 6 opens */

    if (step === 6) {

        renderAssessment();

    }


    window.scrollTo({

        top:
            document.querySelector(
                ".patient-wrapper"
            )
            ? document.querySelector(
                ".patient-wrapper"
              ).offsetTop - 100
            : 0,

        behavior: "smooth"

    });
}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress(step) {

    const progressItems =
        document.querySelectorAll(
            ".progress-item"
        );


    progressItems.forEach(
        function(item, index) {

            const itemStep =
                index + 1;


            if (itemStep <= step) {

                item.classList.add(
                    "active"
                );

            } else {

                item.classList.remove(
                    "active"
                );

            }

        }
    );
}


/* =========================================================
   STEP TEXT
========================================================= */

function updateStepText(step) {

    const stepText =
        document.getElementById(
            "stepText"
        );


    if (stepText) {

        stepText.innerText =
            "Step " +
            step +
            " of 7";

    }
}


/* =========================================================
   PATIENT SUBTITLE
========================================================= */

function updatePatientSubtitle(step) {

    const subtitle =
        document.getElementById(
            "patientSubtitle"
        );


    const title =
        document.getElementById(
            "patientTitle"
        );


    const content = {


        1: {

            title:
                currentLanguage === "Hindi"
                    ? "आइए समझते हैं कि आप कैसा महसूस कर रहे हैं।"
                    : "Let's understand how you're feeling.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "हमें बताएं कि आपको क्या परेशानी हो रही है।"
                    : "Tell us what you're experiencing."

        },


        2: {

            title:
                currentLanguage === "Hindi"
                    ? "आपको क्या परेशानी हो रही है?"
                    : "Tell Care AI what you're experiencing.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "अपने लक्षण लिखें या आवाज़ से बताएं।"
                    : "Describe your symptoms using text or voice."

        },


        3: {

            title:
                currentLanguage === "Hindi"
                    ? "कुछ छोटे सवाल।"
                    : "A few quick questions.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "आपके जवाब assessment को बेहतर बनाने में मदद करेंगे।"
                    : "Your answers help structure the assessment."

        },


        4: {

            title:
                currentLanguage === "Hindi"
                    ? "आपकी मेडिकल हिस्ट्री महत्वपूर्ण है।"
                    : "Your medical background matters.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "अपनी मेडिकल हिस्ट्री जोड़ें।"
                    : "Add relevant medical history."

        },


        5: {

            title:
                currentLanguage === "Hindi"
                    ? "पुरानी मेडिकल रिपोर्ट जोड़ें।"
                    : "Add supporting reports.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "अगर उपलब्ध हों तो अपनी पुरानी रिपोर्ट अपलोड करें।"
                    : "Upload previous medical documents if available."

        },


        6: {

            title:
                currentLanguage === "Hindi"
                    ? "अपना assessment देखें।"
                    : "Review your assessment.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "Patient ID बनाने से पहले जानकारी जांचें।"
                    : "Check the information before generating your ID."

        },


        7: {

            title:
                currentLanguage === "Hindi"
                    ? "Assessment पूरा हो गया।"
                    : "Assessment successfully completed.",

            subtitle:
                currentLanguage === "Hindi"
                    ? "आपका unique CareFlow Patient ID तैयार है।"
                    : "Your unique CareFlow patient ID is ready."

        }

    };


    if (!content[step]) return;


    if (title) {

        title.innerText =
            content[step].title;

    }


    if (subtitle) {

        subtitle.innerText =
            content[step].subtitle;

    }
}


/* =========================================================
   LANGUAGE SWITCH
========================================================= */

function setLanguage(language, button) {

    currentLanguage =
        language;


    const buttons =
        document.querySelectorAll(
            ".language"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "active"
            );

        }
    );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const symptomsInput =
        document.getElementById(
            "symptomsInput"
        );


    if (symptomsInput) {

        if (language === "Hindi") {

            symptomsInput.placeholder =
                "उदाहरण: मुझे तीन दिनों से बुखार, सिरदर्द और कमजोरी है...";

        } else {

            symptomsInput.placeholder =
                "Example: I have fever, headache and weakness since three days...";

        }

    }


    updatePatientSubtitle(
        currentStep
    );
}


/* =========================================================
   VOICE INPUT
========================================================= */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        showMessage(
            currentLanguage === "Hindi"
                ? "इस browser में voice input supported नहीं है।"
                : "Voice input is not supported in this browser."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    /*
       Hindi + English support
    */

    if (currentLanguage === "Hindi") {

        recognition.lang =
            "hi-IN";

    } else {

        recognition.lang =
            "en-IN";

    }


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    const status =
        document.getElementById(
            "voiceStatus"
        );


    const voiceText =
        document.getElementById(
            "voiceText"
        );


    if (status) {

        status.innerText =
            currentLanguage === "Hindi"
                ? "सुन रहा हूँ..."
                : "Listening...";

    }


    if (voiceText) {

        voiceText.innerText =
            currentLanguage === "Hindi"
                ? "बोलें"
                : "Speak";

    }


    try {

        recognition.start();

    } catch (error) {

        showMessage(
            currentLanguage === "Hindi"
                ? "Voice recording शुरू नहीं हो सकी।"
                : "Voice recording could not be started."
        );

        return;
    }


    recognition.onresult =
        function(event) {

            const transcript =
                event.results[0][0]
                    .transcript;


            const symptomsInput =
                document.getElementById(
                    "symptomsInput"
                );


            if (symptomsInput) {

                symptomsInput.value +=

                    (
                        symptomsInput.value
                            ? " "
                            : ""
                    ) +

                    transcript;

            }


            showMessage(
                currentLanguage === "Hindi"
                    ? "आवाज़ सफलतापूर्वक रिकॉर्ड हुई।"
                    : "Voice captured successfully."
            );
        };


    recognition.onerror =
        function() {

            showMessage(
                currentLanguage === "Hindi"
                    ? "Voice capture नहीं हो पाया। फिर कोशिश करें।"
                    : "Unable to capture voice. Please try again."
            );

        };


    recognition.onend =
        function() {

            if (status) {

                status.innerText =
                    currentLanguage === "Hindi"
                        ? "Voice तैयार है"
                        : "Voice ready";

            }


            if (voiceText) {

                voiceText.innerText =
                    currentLanguage === "Hindi"
                        ? "बोलें"
                        : "Speak";

            }

        };
}


/* =========================================================
   SAVE SYMPTOMS
========================================================= */

function saveSymptoms() {

    const input =
        document.getElementById(
            "symptomsInput"
        );


    if (!input) return;


    const symptoms =
        input.value.trim();


    if (!symptoms) {

        showMessage(
            currentLanguage === "Hindi"
                ? "कृपया कम से कम एक symptom बताएं।"
                : "Please describe at least one symptom."
        );


        input.focus();

        return;
    }


    patientData.symptoms =
        symptoms;


    showMessage(
        currentLanguage === "Hindi"
            ? "Symptoms successfully record हो गए।"
            : "Symptoms recorded successfully."
    );


    nextStep(3);
}


/* =========================================================
   DURATION
========================================================= */

function selectDuration(
    duration,
    button
) {

    const buttons =
        document.querySelectorAll(
            ".answer-grid button"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    if (button) {

        button.classList.add(
            "selected"
        );

    }


    patientData.duration =
        duration;
}


/* =========================================================
   SAVE QUESTIONS
========================================================= */

function saveQuestion() {

    if (!patientData.duration) {

        showMessage(
            currentLanguage === "Hindi"
                ? "कृपया symptoms कितने समय से हैं, select करें।"
                : "Please select how long you've had the symptoms."
        );

        return;
    }


    const additionalInput =
        document.getElementById(
            "additionalInfo"
        );


    patientData.additionalInfo =

        additionalInput
            ? additionalInput.value.trim()
            : "";


    showMessage(
        currentLanguage === "Hindi"
            ? "Answer record हो गया।"
            : "Answer recorded."
    );


    nextStep(4);
}


/* =========================================================
   SAVE MEDICAL HISTORY
========================================================= */

function saveHistory() {

    const historyInput =
        document.getElementById(
            "historyInput"
        );


    const medicationsInput =
        document.getElementById(
            "medicationsInput"
        );


    const allergiesInput =
        document.getElementById(
            "allergiesInput"
        );


    patientData.history =

        historyInput
            ? historyInput.value.trim()
            : "";


    patientData.medications =

        medicationsInput
            ? medicationsInput.value.trim()
            : "";


    patientData.allergies =

        allergiesInput
            ? allergiesInput.value.trim()
            : "";


    showMessage(
        currentLanguage === "Hindi"
            ? "Medical history save हो गई।"
            : "Medical history saved."
    );


    nextStep(5);
}


/* =========================================================
   FILE INPUT
========================================================= */

function setupReportInput() {

    const reportInput =
        document.getElementById(
            "reportInput"
        );


    if (!reportInput) return;


    reportInput.addEventListener(
        "change",
        function(event) {

            handleFiles(
                event.target.files
            );

        }
    );
}


/* =========================================================
   HANDLE FILES
========================================================= */

function handleFiles(files) {

    if (!files) return;


    const fileArray =
        Array.from(files);


    fileArray.forEach(
        function(file) {


            /* Maximum 10 MB */

            if (
                file.size >
                10 * 1024 * 1024
            ) {

                showMessage(
                    file.name +
                    (
                        currentLanguage === "Hindi"
                            ? " 10MB से बड़ी है।"
                            : " is larger than 10MB."
                    )
                );

                return;
            }


            const alreadyExists =
                patientData.reports.some(
                    function(existing) {

                        return (
                            existing.name ===
                            file.name
                        );

                    }
                );


            if (!alreadyExists) {

                patientData.reports.push(
                    file
                );

            }

        }
    );


    renderFileList();
}


/* =========================================================
   RENDER FILE LIST
========================================================= */

function renderFileList() {

    const fileList =
        document.getElementById(
            "fileList"
        );


    if (!fileList) return;


    fileList.innerHTML =
        "";


    patientData.reports.forEach(
        function(file, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "file-item";


            item.innerHTML = `

                <div class="file-info">

                    <div class="file-icon">
                        📎
                    </div>

                    <span class="file-name">
                        ${escapeHTML(file.name)}
                    </span>

                </div>


                <button
                    type="button"
                    class="file-remove"
                    onclick="removeFile(${index})">

                    Remove

                </button>

            `;


            fileList.appendChild(
                item
            );

        }
    );
}


/* =========================================================
   REMOVE FILE
========================================================= */

function removeFile(index) {

    patientData.reports.splice(
        index,
        1
    );


    renderFileList();


    showMessage(
        currentLanguage === "Hindi"
            ? "Report remove कर दी गई।"
            : "File removed."
    );
}


/* =========================================================
   SAVE REPORTS
========================================================= */

function saveReports() {

    if (
        patientData.reports.length
    ) {

        showMessage(
            currentLanguage === "Hindi"
                ? "Reports successfully attach हो गईं।"
                : "Reports attached successfully."
        );

    } else {

        showMessage(
            currentLanguage === "Hindi"
                ? "कोई report upload नहीं की गई।"
                : "No reports added."
        );

    }


    nextStep(6);
}


/* =========================================================
   SKIP REPORTS
========================================================= */

function skipReports() {

    patientData.reports =
        [];


    nextStep(6);
}


/* =========================================================
   DRAG & DROP
========================================================= */

function setupUploadZone() {

    const uploadZone =
        document.getElementById(
            "uploadZone"
        );


    if (!uploadZone) return;


    uploadZone.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            uploadZone.classList.add(
                "dragging"
            );

        }
    );


    uploadZone.addEventListener(
        "dragleave",
        function() {

            uploadZone.classList.remove(
                "dragging"
            );

        }
    );


    uploadZone.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();


            uploadZone.classList.remove(
                "dragging"
            );


            handleFiles(
                event.dataTransfer.files
            );

        }
    );
}


/* =========================================================
   SYMPTOM EXTRACTION
   HINDI + ENGLISH
========================================================= */

function buildSymptoms() {

    const originalText =
        patientData.symptoms.trim();


    if (!originalText) {

        return [
            currentLanguage === "Hindi"
                ? "Symptoms नहीं बताए गए"
                : "Symptoms not specified"
        ];

    }


    const text =
        originalText
            .toLowerCase();


    const symptomMap = [

        /* =========================
           BREATHING
        ========================= */

        {
            keywords: [
                "breathing difficulty",
                "difficulty breathing",
                "shortness of breath",
                "can't breathe",
                "cannot breathe",
                "unable to breathe",
                "सांस लेने में दिक्कत",
                "सांस लेने में परेशानी",
                "सांस नहीं आ रही",
                "सांस नहीं ले पा रहा",
                "सांस नहीं ले पा रही",
                "साँस लेने में दिक्कत",
                "साँस नहीं आ रही"
            ],

            label: "Breathing difficulty"
        },


        /* =========================
           CHEST PAIN
        ========================= */

        {
            keywords: [
                "chest pain",
                "severe chest pain",
                "सीने में दर्द",
                "सीने मे दर्द",
                "सीने में बहुत दर्द"
            ],

            label: "Chest pain"
        },


        /* =========================
           STOMACH PAIN
        ========================= */

        {
            keywords: [
                "stomach pain",
                "abdominal pain",
                "severe stomach pain",
                "पेट दर्द",
                "पेट में दर्द",
                "पेट मे दर्द",
                "बहुत तेज पेट दर्द"
            ],

            label: "Stomach pain"
        },


        /* =========================
           HEADACHE
        ========================= */

        {
            keywords: [
                "headache",
                "head ache",
                "सिरदर्द",
                "सिर दर्द",
                "सर दर्द"
            ],

            label: "Headache"
        },


        /* =========================
           FEVER
        ========================= */

        {
            keywords: [
                "fever",
                "high fever",
                "persistent fever",
                "बुखार",
                "तेज बुखार",
                "बहुत तेज बुखार"
            ],

            label: "Fever"
        },


        /* =========================
           COUGH
        ========================= */

        {
            keywords: [
                "cough",
                "खांसी",
                "खाँसी"
            ],

            label: "Cough"
        },


        /* =========================
           COLD
        ========================= */

        {
            keywords: [
                "cold",
                "common cold",
                "जुकाम",
                "सर्दी"
            ],

            label: "Cold"
        },


        /* =========================
           FATIGUE
        ========================= */

        {
            keywords: [
                "fatigue",
                "tired",
                "very tired",
                "थकान",
                "बहुत थकान",
                "थका हुआ",
                "थकी हुई"
            ],

            label: "Fatigue"
        },


        /* =========================
           WEAKNESS
        ========================= */

        {
            keywords: [
                "weakness",
                "weak",
                "कमजोरी",
                "कमज़ोरी",
                "बहुत कमजोरी"
            ],

            label: "Weakness"
        },


        /* =========================
           VOMITING
        ========================= */

        {
            keywords: [
                "vomiting",
                "vomit",
                "उल्टी",
                "उलटियां",
                "उल्टियां"
            ],

            label: "Vomiting"
        },


        /* =========================
           NAUSEA
        ========================= */

        {
            keywords: [
                "nausea",
                "मतली",
                "जी मिचलाना"
            ],

            label: "Nausea"
        },


        /* =========================
           DIZZINESS
        ========================= */

        {
            keywords: [
                "dizziness",
                "dizzy",
                "चक्कर",
                "चक्कर आना",
                "सिर घूमना"
            ],

            label: "Dizziness"
        },


        /* =========================
           SORE THROAT
        ========================= */

        {
            keywords: [
                "sore throat",
                "throat pain",
                "गले में दर्द",
                "गले का दर्द"
            ],

            label: "Sore throat"
        },


        /* =========================
           BLEEDING
        ========================= */

        {
            keywords: [
                "bleeding",
                "खून बहना",
                "खून निकलना",
                "रक्तस्राव"
            ],

            label: "Bleeding"
        },


        /* =========================
           SEIZURE
        ========================= */

        {
            keywords: [
                "seizure",
                "seizures",
                "convulsion",
                "दौरा",
                "दौरे"
            ],

            label: "Seizure"
        },


        /* =========================
           FAINTING
        ========================= */

        {
            keywords: [
                "fainted",
                "fainting",
                "unconscious",
                "बेहोश",
                "बेहोशी",
                "बेहोश हो गया",
                "बेहोश हो गई"
            ],

            label: "Fainting / unconsciousness"
        }

    ];


    const found = [];


    symptomMap.forEach(
        function(symptom) {

            const matched =
                symptom.keywords.some(
                    function(keyword) {

                        return text.includes(
                            keyword
                        );

                    }
                );


            if (
                matched &&
                !found.includes(
                    symptom.label
                )
            ) {

                found.push(
                    symptom.label
                );

            }

        }
    );


    /*
       Generic pain should not be added
       when specific pain already exists.
    */

    if (
        text.includes("pain") ||
        text.includes("दर्द")
    ) {

        const hasSpecificPain =
            found.includes(
                "Chest pain"
            ) ||
            found.includes(
                "Stomach pain"
            );


        if (
            !hasSpecificPain &&
            !found.includes("Pain")
        ) {

            found.push(
                "Pain"
            );

        }

    }


    /*
       If no known symptom is found,
       show exactly what patient entered.
    */

    if (found.length === 0) {

        return [
            originalText
        ];

    }


    return found;
}


/* =========================================================
   PRIORITY CALCULATION
   HINDI + ENGLISH
========================================================= */

function calculatePriority() {

    /*
       Combine all relevant patient information.
    */

    const text = (

        patientData.symptoms +
        " " +
        patientData.additionalInfo +
        " " +
        patientData.history

    )
        .toLowerCase()
        .trim();


    /* =====================================================
       🔴 HIGH PRIORITY
    ===================================================== */

    const highPriorityKeywords = [

        /* English */

        "chest pain",
        "severe chest pain",

        "difficulty breathing",
        "breathing difficulty",
        "shortness of breath",

        "can't breathe",
        "cannot breathe",
        "unable to breathe",

        "unconscious",
        "fainted",
        "fainting",
        "loss of consciousness",

        "severe bleeding",
        "heavy bleeding",

        "vomiting blood",
        "blood in vomit",

        "coughing blood",
        "cough blood",

        "seizure",
        "seizures",
        "convulsion",

        "stroke",
        "paralysis",

        "severe allergic reaction",

        "severe abdominal pain",
        "severe stomach pain",

        "very severe pain",
        "unbearable pain",

        "blue lips",
        "blue skin",

        "not responding",

        /* Hindi */

        "सीने में दर्द",
        "सीने मे दर्द",
        "सीने में बहुत दर्द",

        "सांस लेने में दिक्कत",
        "सांस लेने में परेशानी",

        "साँस लेने में दिक्कत",
        "साँस लेने में परेशानी",

        "सांस नहीं आ रही",
        "साँस नहीं आ रही",

        "सांस नहीं ले पा रहा",
        "सांस नहीं ले पा रही",

        "बहुत ज्यादा खून",
        "बहुत ज़्यादा खून",

        "खून बहना",
        "ज्यादा खून बहना",
        "ज़्यादा खून बहना",

        "खून की उल्टी",

        "दौरा",
        "दौरे",

        "लकवा",
        "पक्षाघात",

        "बेहोश",
        "बेहोशी",

        "बहुत तेज पेट दर्द",
        "बहुत तेज़ पेट दर्द",

        "बहुत ज्यादा दर्द",
        "बहुत ज़्यादा दर्द",

        "असहनीय दर्द"

    ];


    for (
        let i = 0;
        i < highPriorityKeywords.length;
        i++
    ) {

        if (
            text.includes(
                highPriorityKeywords[i]
            )
        ) {

            return "HIGH";

        }

    }


    /* =====================================================
       🟠 MEDIUM PRIORITY
    ===================================================== */

    const mediumPriorityKeywords = [

        /* English */

        "fever",
        "high fever",
        "persistent fever",

        "headache",
        "severe headache",

        "cough",
        "persistent cough",

        "vomiting",

        "nausea",

        "dizziness",
        "dizzy",

        "weakness",
        "fatigue",

        "dehydration",

        "stomach pain",
        "abdominal pain",

        "infection",

        "swelling",

        "moderate pain",

        "sore throat",

        /* Hindi */

        "बुखार",
        "तेज बुखार",
        "तेज़ बुखार",

        "सिरदर्द",
        "सिर दर्द",
        "सर दर्द",

        "खांसी",
        "खाँसी",

        "उल्टी",
        "उलटियां",
        "उल्टियां",

        "मतली",
        "जी मिचलाना",

        "चक्कर",
        "चक्कर आना",
        "सिर घूमना",

        "कमजोरी",
        "कमज़ोरी",

        "थकान",

        "पेट दर्द",
        "पेट में दर्द",
        "पेट मे दर्द",

        "गले में दर्द",

        "सूजन",

        "संक्रमण"

    ];


    for (
        let i = 0;
        i < mediumPriorityKeywords.length;
        i++
    ) {

        if (
            text.includes(
                mediumPriorityKeywords[i]
            )
        ) {

            return "MEDIUM";

        }

    }


    /* =====================================================
       🟢 NORMAL PRIORITY
    ===================================================== */

    return "NORMAL";
}


/* =========================================================
   RENDER ASSESSMENT
========================================================= */

function renderAssessment() {

    const symptoms =
        buildSymptoms();


    const container =
        document.getElementById(
            "assessmentSymptoms"
        );


    if (!container) return;


    container.innerHTML =
        "";


    symptoms.forEach(
        function(symptom) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "symptom-item";


            item.innerHTML = `

                <span>•</span>

                <strong>
                    ${escapeHTML(symptom)}
                </strong>

            `;


            container.appendChild(
                item
            );

        }
    );


    /*
       Calculate priority
    */

    patientData.priority =
        calculatePriority();


    updatePriorityUI();
}


/* =========================================================
   PRIORITY UI
========================================================= */

function updatePriorityUI() {

    const priority =
        patientData.priority;


    const dot =
        document.querySelector(
            ".priority-dot"
        );


    const strong =
        document.querySelector(
            ".priority-display strong"
        );


    const description =
        document.querySelector(
            ".priority-display p"
        );


    if (
        !dot ||
        !strong ||
        !description
    ) {

        return;

    }


    dot.classList.remove(
        "high",
        "medium",
        "normal",
        "low"
    );


    dot.classList.add(
        priority.toLowerCase()
    );


    strong.innerText =
        priority;


    /* HIGH */

    if (
        priority === "HIGH"
    ) {

        strong.style.color =
            "#e63946";


        dot.style.background =
            "#e63946";


        description.innerText =

            currentLanguage === "Hindi"

                ? "तुरंत clinical review की आवश्यकता हो सकती है।"

                : "Prompt clinical review recommended.";


        return;
    }


    /* MEDIUM */

    if (
        priority === "MEDIUM"
    ) {

        strong.style.color =
            "#f4a261";


        dot.style.background =
            "#f4a261";


        description.innerText =

            currentLanguage === "Hindi"

                ? "Medical review recommended."

                : "Routine medical review recommended.";


        return;
    }


    /* NORMAL */

    strong.style.color =
        "#10b981";


    dot.style.background =
        "#10b981";


    description.innerText =

        currentLanguage === "Hindi"

            ? "कोई urgent indicator detect नहीं हुआ।"

            : "No urgent indicators detected.";
}


/* =========================================================
   GENERATE PATIENT ID
========================================================= */

function generatePatientID() {

    patientData.priority =
        calculatePriority();


    const random =
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const year =
        new Date()
            .getFullYear();


    patientData.patientID =
        `CF-${year}-${random}`;


    const generatedID =
        document.getElementById(
            "generatedID"
        );


    if (generatedID) {

        generatedID.innerText =
            patientData.patientID;

    }


    savePatientData();


    showMessage(

        currentLanguage === "Hindi"

            ? "Patient ID successfully generate हो गई।"

            : "Patient ID generated successfully."

    );


    nextStep(7);
}


/* =========================================================
   SAVE PATIENT DATA
========================================================= */

function savePatientData() {

    const serializableData = {

        symptoms:
            patientData.symptoms,

        duration:
            patientData.duration,

        additionalInfo:
            patientData.additionalInfo,

        history:
            patientData.history,

        medications:
            patientData.medications,

        allergies:
            patientData.allergies,

        reports:
            patientData.reports.map(
                function(file) {

                    return {

                        name:
                            file.name,

                        size:
                            file.size,

                        type:
                            file.type

                    };

                }
            ),

        priority:
            patientData.priority,

        patientID:
            patientData.patientID,

        language:
            currentLanguage,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "careflow_patient",
        JSON.stringify(
            serializableData
        )
    );
}


/* =========================================================
   DOCTOR — LOAD PATIENT
========================================================= */

function loadPatient() {

    const input =
        document.getElementById(
            "patientID"
        );


    if (!input) return;


    const enteredID =
        input.value
            .trim()
            .toUpperCase();


    if (!enteredID) {

        showMessage(

            currentLanguage === "Hindi"

                ? "कृपया Patient ID डालें।"

                : "Please enter a Patient ID."

        );

        return;
    }


    const saved =
        localStorage.getItem(
            "careflow_patient"
        );


    if (!saved) {

        showMessage(

            currentLanguage === "Hindi"

                ? "Patient record नहीं मिला।"

                : "No patient record found."

        );

        return;
    }


    let data;


    try {

        data =
            JSON.parse(saved);

    } catch (error) {

        showMessage(
            "Unable to read patient record."
        );

        return;
    }


    if (

        enteredID !==

        String(
            data.patientID
        )
            .toUpperCase()

    ) {

        showMessage(

            currentLanguage === "Hindi"

                ? "Patient नहीं मिला। ID check करें।"

                : "Patient not found. Check the ID."

        );


        const doctorRecord =
            document.getElementById(
                "doctorRecord"
            );


        const doctorEmpty =
            document.getElementById(
                "doctorEmpty"
            );


        if (doctorRecord) {

            doctorRecord.classList.add(
                "hidden"
            );

        }


        if (doctorEmpty) {

            doctorEmpty.classList.remove(
                "hidden"
            );

        }


        return;
    }


    renderDoctorRecord(
        data
    );
}


/* =========================================================
   DOCTOR RECORD
========================================================= */

function renderDoctorRecord(data) {

    const doctorEmpty =
        document.getElementById(
            "doctorEmpty"
        );


    const doctorRecord =
        document.getElementById(
            "doctorRecord"
        );


    if (doctorEmpty) {

        doctorEmpty.classList.add(
            "hidden"
        );

    }


    if (doctorRecord) {

        doctorRecord.classList.remove(
            "hidden"
        );

    }


    const doctorPatientID =
        document.getElementById(
            "doctorPatientID"
        );


    if (doctorPatientID) {

        doctorPatientID.innerText =
            data.patientID;

    }


    /* =====================================================
       SYMPTOMS
    ===================================================== */

    const symptomContainer =
        document.getElementById(
            "doctorSymptoms"
        );


    if (symptomContainer) {

        symptomContainer.innerHTML =
            "";


        const symptoms =
            extractSymptomsFromText(
                data.symptoms
            );


        symptoms.forEach(
            function(symptom) {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "doctor-symptom";


                element.innerText =
                    symptom;


                symptomContainer.appendChild(
                    element
                );

            }
        );

    }


    /* =====================================================
       HISTORY
    ===================================================== */

    const doctorHistory =
        document.getElementById(
            "doctorHistory"
        );


    if (doctorHistory) {

        doctorHistory.innerHTML = `

            <strong>
                Existing conditions:
            </strong>

            ${escapeHTML(
                data.history ||
                "None provided."
            )}

            <br><br>


            <strong>
                Medications:
            </strong>

            ${escapeHTML(
                data.medications ||
                "None provided."
            )}

            <br><br>


            <strong>
                Allergies:
            </strong>

            ${escapeHTML(
                data.allergies ||
                "None provided."
            )}

            <br><br>


            <strong>
                Symptom duration:
            </strong>

            ${escapeHTML(
                data.duration ||
                "Not specified."
            )}

        `;

    }


    /* =====================================================
       REPORTS
    ===================================================== */

    renderDoctorReports(
        data.reports || []
    );


    /* =====================================================
       AI SUMMARY
    ===================================================== */

    const aiSummary =
        document.getElementById(
            "aiSummary"
        );


    if (aiSummary) {

        aiSummary.innerHTML = `

            Patient reports

            <strong>
                ${escapeHTML(
                    data.symptoms
                )}
            </strong>.

            Symptoms have been reported for

            <strong>
                ${escapeHTML(
                    data.duration ||
                    "an unspecified duration"
                )}
            </strong>.

            Based on the entered information,
            the preliminary CareFlow priority is

            <strong>
                ${escapeHTML(
                    data.priority ||
                    "NORMAL"
                )}
            </strong>.

            ${
                data.additionalInfo

                ? `

                    <br><br>

                    <strong>
                        Additional information:
                    </strong>

                    ${escapeHTML(
                        data.additionalInfo
                    )}

                  `

                : ""
            }

            <br><br>

            The information should be reviewed
            alongside the patient's history and
            uploaded documents.

        `;

    }


    showMessage(

        currentLanguage === "Hindi"

            ? "Patient record successfully load हो गया।"

            : "Patient record loaded successfully."

    );
}


/* =========================================================
   DOCTOR REPORTS
========================================================= */

function renderDoctorReports(
    reports
) {

    const container =
        document.getElementById(
            "doctorReports"
        );


    const count =
        document.getElementById(
            "reportCount"
        );


    if (!container) return;


    container.innerHTML =
        "";


    if (count) {

        count.innerText =
            reports.length;

    }


    if (!reports.length) {

        container.innerHTML = `

            <div class="history-result">

                ${
                    currentLanguage === "Hindi"

                        ? "Patient ने कोई previous report upload नहीं की।"

                        : "No reports uploaded by the patient."

                }

            </div>

        `;

        return;
    }


    reports.forEach(
        function(report) {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "doctor-report";


            element.innerHTML = `

                <div class="doctor-report-left">

                    <div class="doctor-report-icon">
                        📎
                    </div>


                    <span class="doctor-report-name">

                        ${escapeHTML(
                            report.name
                        )}

                    </span>

                </div>


                <button
                    type="button"
                    class="view-report"
                    onclick="previewReport('${escapeHTML(
                        report.name
                    )}')">

                    VIEW

                </button>

            `;


            container.appendChild(
                element
            );

        }
    );
}


/* =========================================================
   REPORT PREVIEW
========================================================= */

function previewReport(name) {

    showMessage(

        currentLanguage === "Hindi"

            ? "Demo preview: " + name

            : "Demo preview: " + name

    );
}


/* =========================================================
   DOCTOR DECISION
========================================================= */

function selectDecision(
    decision,
    button
) {

    const buttons =
        document.querySelectorAll(
            ".decision-option"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    if (button) {

        button.classList.add(
            "selected"
        );

    }


    const selectedDecision =
        document.getElementById(
            "selectedDecision"
        );


    if (selectedDecision) {

        selectedDecision.innerText =

            currentLanguage === "Hindi"

                ? "Selected: " + decision

                : "Selected: " + decision;

    }


    patientData.doctorDecision =
        decision;
}


/* =========================================================
   SAVE DOCTOR DECISION
========================================================= */

function saveDecision() {

    const decision =
        patientData.doctorDecision;


    const notesInput =
        document.getElementById(
            "doctorNotes"
        );


    const notes =
        notesInput
            ? notesInput.value.trim()
            : "";


    if (!decision) {

        showMessage(

            currentLanguage === "Hindi"

                ? "कृपया clinical decision select करें।"

                : "Please select a clinical decision."

        );

        return;
    }


    localStorage.setItem(

        "careflow_doctor_decision",

        JSON.stringify({

            decision:
                decision,

            notes:
                notes,

            savedAt:
                new Date().toISOString()

        })

    );


    showMessage(

        currentLanguage === "Hindi"

            ? "✓ Clinical decision successfully save हो गया।"

            : "✓ Clinical decision saved successfully."

    );
}


/* =========================================================
   PREVIOUS VISIT
========================================================= */

function showPreviousVisit() {

    const saved =
        localStorage.getItem(
            "careflow_patient"
        );


    if (!saved) {

        showMessage(

            currentLanguage === "Hindi"

                ? "इस device पर कोई previous visit नहीं मिली।"

                : "No previous visit found on this device."

        );

        return;
    }


    let data;


    try {

        data =
            JSON.parse(saved);

    } catch (error) {

        showMessage(
            "Unable to load previous visit."
        );

        return;
    }


    showDoctor();


    const patientID =
        document.getElementById(
            "patientID"
        );


    if (patientID) {

        patientID.value =
            data.patientID;

    }


    loadPatient();
}


/* =========================================================
   COPY PATIENT ID
========================================================= */

function copyPatientID() {

    const generatedID =
        document.getElementById(
            "generatedID"
        );


    if (!generatedID) return;


    const id =
        generatedID.innerText;


    if (!id) {

        showMessage(
            "No Patient ID available."
        );

        return;
    }


    if (

        navigator.clipboard &&
        navigator.clipboard.writeText

    ) {

        navigator.clipboard
            .writeText(id)
            .then(
                function() {

                    showMessage(

                        currentLanguage === "Hindi"

                            ? "Patient ID copy हो गई।"

                            : "Patient ID copied."

                    );

                }
            )
            .catch(
                function() {

                    showMessage(
                        "Unable to copy automatically."
                    );

                }
            );

    } else {

        showMessage(
            "Clipboard is not supported."
        );

    }
}


/* =========================================================
   RESET
========================================================= */

function resetAssessment() {

    patientData = {

        symptoms: "",

        duration: "",

        additionalInfo: "",

        history: "",

        medications: "",

        allergies: "",

        reports: [],

        priority: "NORMAL",

        patientID: "",

        doctorDecision: ""

    };


    const fields = [

        "symptomsInput",

        "additionalInfo",

        "historyInput",

        "medicationsInput",

        "allergiesInput"

    ];


    fields.forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.value =
                    "";

            }

        }
    );


    const fileList =
        document.getElementById(
            "fileList"
        );


    if (fileList) {

        fileList.innerHTML =
            "";

    }


    const reportInput =
        document.getElementById(
            "reportInput"
        );


    if (reportInput) {

        reportInput.value =
            "";

    }


    nextStep(1);

    showPatient();
}


/* =========================================================
   TOAST MESSAGE
========================================================= */

let toastTimeout;


function showMessage(text) {

    const toast =
        document.getElementById(
            "message"
        );


    if (!toast) {

        console.log(text);

        return;
    }


    const paragraph =
        toast.querySelector("p");


    if (paragraph) {

        paragraph.innerText =
            text;

    } else {

        toast.innerText =
            text;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },

            2800
        );
}


/* =========================================================
   SYMPTOM EXTRACTION FOR DOCTOR
========================================================= */

function extractSymptomsFromText(
    text
) {

    if (!text) {

        return [
            "Not specified"
        ];

    }


    const lower =
        text.toLowerCase();


    const symptoms =
        buildSymptomsFromText(
            lower,
            text
        );


    return symptoms;
}


/* =========================================================
   SHARED SYMPTOM PARSER
========================================================= */

function buildSymptomsFromText(
    lower,
    original
) {

    const symptomMap = [

        {
            keywords: [
                "breathing difficulty",
                "difficulty breathing",
                "shortness of breath",
                "can't breathe",
                "cannot breathe",
                "unable to breathe",
                "सांस लेने में दिक्कत",
                "सांस लेने में परेशानी",
                "सांस नहीं आ रही",
                "सांस नहीं ले पा रहा",
                "सांस नहीं ले पा रही",
                "साँस लेने में दिक्कत",
                "साँस नहीं आ रही"
            ],

            label: "Breathing difficulty"
        },


        {
            keywords: [
                "chest pain",
                "severe chest pain",
                "सीने में दर्द",
                "सीने मे दर्द",
                "सीने में बहुत दर्द"
            ],

            label: "Chest pain"
        },


        {
            keywords: [
                "stomach pain",
                "abdominal pain",
                "severe stomach pain",
                "पेट दर्द",
                "पेट में दर्द",
                "पेट मे दर्द",
                "बहुत तेज पेट दर्द"
            ],

            label: "Stomach pain"
        },


        {
            keywords: [
                "headache",
                "head ache",
                "सिरदर्द",
                "सिर दर्द",
                "सर दर्द"
            ],

            label: "Headache"
        },


        {
            keywords: [
                "fever",
                "high fever",
                "बुखार",
                "तेज बुखार",
                "तेज़ बुखार"
            ],

            label: "Fever"
        },


        {
            keywords: [
                "cough",
                "खांसी",
                "खाँसी"
            ],

            label: "Cough"
        },


        {
            keywords: [
                "cold",
                "common cold",
                "जुकाम",
                "सर्दी"
            ],

            label: "Cold"
        },


        {
            keywords: [
                "fatigue",
                "tired",
                "थकान",
                "बहुत थकान"
            ],

            label: "Fatigue"
        },


        {
            keywords: [
                "weakness",
                "weak",
                "कमजोरी",
                "कमज़ोरी"
            ],

            label: "Weakness"
        },


        {
            keywords: [
                "vomiting",
                "vomit",
                "उल्टी",
                "उलटियां",
                "उल्टियां"
            ],

            label: "Vomiting"
        },


        {
            keywords: [
                "nausea",
                "मतली",
                "जी मिचलाना"
            ],

            label: "Nausea"
        },


        {
            keywords: [
                "dizziness",
                "dizzy",
                "चक्कर",
                "चक्कर आना",
                "सिर घूमना"
            ],

            label: "Dizziness"
        },


        {
            keywords: [
                "sore throat",
                "throat pain",
                "गले में दर्द"
            ],

            label: "Sore throat"
        },


        {
            keywords: [
                "seizure",
                "seizures",
                "convulsion",
                "दौरा",
                "दौरे"
            ],

            label: "Seizure"
        },


        {
            keywords: [
                "fainted",
                "fainting",
                "unconscious",
                "बेहोश",
                "बेहोशी"
            ],

            label: "Fainting / unconsciousness"
        }

    ];


    const found = [];


    symptomMap.forEach(
        function(item) {

            const matched =
                item.keywords.some(
                    function(keyword) {

                        return lower.includes(
                            keyword
                        );

                    }
                );


            if (
                matched &&
                !found.includes(
                    item.label
                )
            ) {

                found.push(
                    item.label
                );

            }

        }
    );


    if (!found.length) {

        return [
            original
        ];

    }


    return found;
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    if (
        text === undefined ||
        text === null
    ) {

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupReportInput();

        setupUploadZone();

        showPatient();

        updateProgress(1);

        updateStepText(1);

        updatePatientSubtitle(1);

    }
);