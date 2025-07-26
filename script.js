// الأسئلة الثلاثون لاختبار الوعي الذاتي
const questions = [
    "من أنا؟ وهل أنا راضٍ فعلاً عن نفسي؟",
    "متى آخر مرة جلست مع نفسك دون هاتف أو ضجيج؟",
    "ما الذي أخشاه أكثر: الفشل أم نظرة الناس؟ ولماذا؟",
    "هل أتحكم في مشاعري، أم أنها تتحكم فيّ؟",
    "ما الذي يجعلني أغضب بسهولة؟ وهل هذا الغضب في محله؟",
    "هل أسامح الآخرين بسهولة؟ ولماذا؟",
    "هل لدي هدف واضح في الحياة أم أعيش فقط لأمر اليوم؟",
    "ما هو أكثر شيء أضيّع وقتي فيه؟ ولماذا لا أتوقف؟",
    "هل أستطيع قول \"لا\" عندما لا أريد شيئًا؟",
    "كيف أصف علاقتي بنفسي في جملة واحدة؟",
    "هل أبحث عن الحقيقة حتى لو خالفت معتقداتي؟",
    "ما هي أكثر كذبة أُقنع بها نفسي؟",
    "هل أحب الناس فعلاً أم فقط أحتاجهم؟",
    "عندما أفشل، من ألوم أولاً؟",
    "هل أُظهر مشاعري الحقيقية للناس أم أرتدي قناعًا؟",
    "هل راحتي النفسية مرتبطة بالمال؟",
    "متى آخر مرة قلت \"أنا غلطت\" دون تبرير؟",
    "هل أنا من يقود حياتي أم أعيش حسب ظروف الناس؟",
    "ما هي الفكرة التي أخاف أن أواجهها عن نفسي؟",
    "هل أستطيع أن أكون سعيدًا وحدي تمامًا؟",
    "كيف أتعامل مع من يختلف عني في الدين أو الفكر؟",
    "هل أعيش الماضي، الحاضر، أم أهرب للمستقبل؟",
    "ما هي العادة التي أعرف أنها تدمرني ولا زلت أكررها؟",
    "هل علاقتي بالوقت صحية؟ أم دائمًا متأخر ومتشتت؟",
    "ما الشيء الذي أهرب منه دائمًا؟",
    "هل أتقبل النقد بصدق؟ أم أبرر كل شيء؟",
    "ما هو الشيء الذي لو فقدته، سأشعر أني ضائع؟",
    "هل أحتاج أن أكون على حق دائمًا؟ ولماذا؟",
    "من الشخص الذي أكون على طبيعتي تمامًا معه؟",
    "هل لو متُ الآن، سأكون راضيًا عمّا فعلته في حياتي؟"
];

// متغيرات التطبيق
let currentQuestionIndex = 0;
let answers = [];
let analysisResults = {};

// عناصر DOM
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    totalQuestionsSpan.textContent = questions.length;
    
    // ربط الأحداث
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    shareBtn.addEventListener('click', shareResult);
    
    // حفظ الإجابة عند الكتابة
    answerInput.addEventListener('input', saveCurrentAnswer);
});

// بدء الاختبار
function startQuiz() {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    answers = [];
    showQuestion();
}

// عرض السؤال الحالي
function showQuestion() {
    questionText.textContent = questions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // تحديث شريط التقدم
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // تحديث الإجابة المحفوظة
    answerInput.value = answers[currentQuestionIndex] || '';
    
    // تحديث حالة الأزرار
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي';
    
    // تركيز على مربع النص
    answerInput.focus();
}

// حفظ الإجابة الحالية
function saveCurrentAnswer() {
    answers[currentQuestionIndex] = answerInput.value.trim();
}

// الانتقال للسؤال التالي
function nextQuestion() {
    saveCurrentAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // إنهاء الاختبار وعرض النتائج
        finishQuiz();
    }
}

// الانتقال للسؤال السابق
function prevQuestion() {
    saveCurrentAnswer();
    
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// إنهاء الاختبار وحساب النتائج
function finishQuiz() {
    analyzeAnswers();
    showResults();
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

// تحليل الإجابات وحساب النتيجة
function analyzeAnswers() {
    let totalScore = 0;
    let selfAwarenessScore = 0;
    let reflectionScore = 0;
    let honestyScore = 0;
    let emotionalScore = 0;
    
    // كلمات مفتاحية للتحليل
    const positiveKeywords = [
        'أعرف', 'أفهم', 'أدرك', 'واعي', 'أتأمل', 'أفكر', 'أحلل', 'أراجع',
        'صادق', 'صريح', 'حقيقي', 'واقعي', 'متوازن', 'هادئ', 'راض',
        'أتحمل', 'مسؤول', 'أتقبل', 'أسامح', 'أتعلم', 'أطور', 'أحسن',
        'هدف', 'خطة', 'رؤية', 'طموح', 'أسعى', 'أعمل', 'أجتهد'
    ];
    
    const reflectionKeywords = [
        'أتأمل', 'أفكر', 'أتساءل', 'أراجع', 'أحلل', 'أستنتج', 'أتدبر',
        'لماذا', 'كيف', 'متى', 'أين', 'ماذا', 'من', 'أي'
    ];
    
    const honestyKeywords = [
        'أعترف', 'أقر', 'صادق', 'حقيقة', 'واقع', 'فعلاً', 'بصراحة',
        'أخطأت', 'غلطت', 'أخطئ', 'لست', 'لا أستطيع', 'أحتاج'
    ];
    
    const emotionalKeywords = [
        'أشعر', 'أحس', 'مشاعر', 'عواطف', 'أحب', 'أكره', 'أخاف',
        'سعيد', 'حزين', 'غاضب', 'قلق', 'مطمئن', 'راض', 'متوتر'
    ];
    
    // تحليل كل إجابة
    answers.forEach((answer, index) => {
        if (!answer || answer.length < 10) {
            // إجابة قصيرة جداً أو فارغة
            return;
        }
        
        const answerLower = answer.toLowerCase();
        const wordCount = answer.split(' ').length;
        let questionScore = 0;
        
        // نقاط أساسية للطول والتفصيل
        if (wordCount >= 10) questionScore += 2;
        if (wordCount >= 20) questionScore += 1;
        if (wordCount >= 30) questionScore += 1;
        
        // نقاط للكلمات الإيجابية
        positiveKeywords.forEach(keyword => {
            if (answerLower.includes(keyword)) {
                questionScore += 1;
                selfAwarenessScore += 1;
            }
        });
        
        // نقاط للتأمل والتفكر
        reflectionKeywords.forEach(keyword => {
            if (answerLower.includes(keyword)) {
                questionScore += 1;
                reflectionScore += 1;
            }
        });
        
        // نقاط للصدق مع النفس
        honestyKeywords.forEach(keyword => {
            if (answerLower.includes(keyword)) {
                questionScore += 2;
                honestyScore += 2;
            }
        });
        
        // نقاط للنضج العاطفي
        emotionalKeywords.forEach(keyword => {
            if (answerLower.includes(keyword)) {
                questionScore += 1;
                emotionalScore += 1;
            }
        });
        
        // نقاط إضافية للأسئلة الحساسة
        const sensitiveQuestions = [0, 2, 6, 10, 13, 18, 22, 29]; // أرقام الأسئلة الحساسة
        if (sensitiveQuestions.includes(index)) {
            questionScore += 1;
        }
        
        // حد أقصى للنقاط لكل سؤال
        questionScore = Math.min(questionScore, 8);
        totalScore += questionScore;
    });
    
    // حساب النسب المئوية
    const maxPossibleScore = questions.length * 8;
    const finalPercentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    // حساب النسب الفرعية
    const maxSubScore = questions.length * 2;
    const selfAwarenessPercentage = Math.round((selfAwarenessScore / maxSubScore) * 100);
    const reflectionPercentage = Math.round((reflectionScore / maxSubScore) * 100);
    const honestyPercentage = Math.round((honestyScore / maxSubScore) * 100);
    const emotionalPercentage = Math.round((emotionalScore / maxSubScore) * 100);
    
    // حفظ النتائج
    analysisResults = {
        total: finalPercentage,
        selfAwareness: selfAwarenessPercentage,
        reflection: reflectionPercentage,
        honesty: honestyPercentage,
        emotional: emotionalPercentage
    };
}

// عرض النتائج
function showResults() {
    const finalScore = document.getElementById('final-score');
    const resultDescription = document.getElementById('result-description');
    
    // عرض النتيجة الإجمالية
    finalScore.textContent = analysisResults.total + '%';
    
    // وصف النتيجة
    let description = '';
    if (analysisResults.total >= 80) {
        description = 'مستوى وعي ذاتي عالي جداً! تتمتع بفهم عميق لنفسك ومشاعرك وأهدافك. تواصل في هذا الطريق وساعد الآخرين على تطوير وعيهم الذاتي.';
    } else if (analysisResults.total >= 65) {
        description = 'مستوى وعي ذاتي جيد جداً. لديك فهم واضح لنفسك في معظم الجوانب، مع وجود مجال للتطوير في بعض المناطق. استمر في التأمل والنمو الشخصي.';
    } else if (analysisResults.total >= 50) {
        description = 'مستوى وعي ذاتي متوسط. تفهم نفسك في بعض الجوانب، لكن هناك مناطق تحتاج لمزيد من الاستكشاف والتأمل. خصص وقتاً أكثر للتفكر في أهدافك ومشاعرك.';
    } else if (analysisResults.total >= 35) {
        description = 'مستوى وعي ذاتي أقل من المتوسط. قد تحتاج لقضاء وقت أكثر مع نفسك والتأمل في أهدافك وقيمك. ابدأ بأسئلة بسيطة عن نفسك واستكشف إجاباتك بعمق.';
    } else {
        description = 'مستوى وعي ذاتي منخفض. هذا ليس عيباً، بل نقطة بداية للنمو! ابدأ رحلة اكتشاف الذات من خلال التأمل اليومي وطرح أسئلة عميقة على نفسك.';
    }
    
    resultDescription.textContent = description;
    
    // عرض التفاصيل مع تأثيرات بصرية
    setTimeout(() => {
        updateAnalysisBar('self-awareness', analysisResults.selfAwareness);
        updateAnalysisBar('reflection', analysisResults.reflection);
        updateAnalysisBar('honesty', analysisResults.honesty);
        updateAnalysisBar('emotional', analysisResults.emotional);
    }, 500);
}

// تحديث أشرطة التحليل التفصيلي
function updateAnalysisBar(type, percentage) {
    const bar = document.getElementById(type + '-bar');
    const score = document.getElementById(type + '-score');
    
    bar.style.width = percentage + '%';
    score.textContent = percentage + '%';
}

// إعادة تشغيل الاختبار
function restartQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    analysisResults = {};
    
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    // إعادة تعيين شريط التقدم
    progressBar.style.width = '0%';
    
    // إعادة تعيين أشرطة التحليل
    const analysisTypes = ['self-awareness', 'reflection', 'honesty', 'emotional'];
    analysisTypes.forEach(type => {
        document.getElementById(type + '-bar').style.width = '0%';
        document.getElementById(type + '-score').textContent = '0%';
    });
}

// مشاركة النتيجة
function shareResult() {
    const resultText = `حصلت على ${analysisResults.total}% في اختبار الوعي الذاتي!
    
التفاصيل:
• الوعي بالذات: ${analysisResults.selfAwareness}%
• التأمل والتفكر: ${analysisResults.reflection}%
• الصدق مع النفس: ${analysisResults.honesty}%
• النضج العاطفي: ${analysisResults.emotional}%

جرب الاختبار بنفسك واكتشف مستوى وعيك الذاتي!`;

    if (navigator.share) {
        navigator.share({
            title: 'نتيجة اختبار الوعي الذاتي',
            text: resultText
        });
    } else {
        // نسخ النص للحافظة
        navigator.clipboard.writeText(resultText).then(() => {
            alert('تم نسخ النتيجة للحافظة!');
        }).catch(() => {
            // عرض النتيجة في نافذة منبثقة
            alert(resultText);
        });
    }
}

// تحسينات إضافية للتفاعل
document.addEventListener('keydown', function(e) {
    if (quizScreen.classList.contains('active')) {
        if (e.key === 'Enter' && e.ctrlKey) {
            nextQuestion();
        } else if (e.key === 'ArrowLeft') {
            nextQuestion();
        } else if (e.key === 'ArrowRight') {
            prevQuestion();
        }
    }
});

// حفظ التقدم في التخزين المحلي
function saveProgress() {
    const progress = {
        currentQuestionIndex,
        answers,
        timestamp: Date.now()
    };
    localStorage.setItem('awarenessQuizProgress', JSON.stringify(progress));
}

// استرجاع التقدم المحفوظ
function loadProgress() {
    const saved = localStorage.getItem('awarenessQuizProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        // التحقق من أن البيانات ليست قديمة جداً (أكثر من يوم)
        if (Date.now() - progress.timestamp < 24 * 60 * 60 * 1000) {
            currentQuestionIndex = progress.currentQuestionIndex;
            answers = progress.answers;
            return true;
        }
    }
    return false;
}

// حفظ التقدم عند تغيير الإجابة
answerInput.addEventListener('input', function() {
    saveCurrentAnswer();
    saveProgress();
});

// تحميل التقدم عند بدء التطبيق
document.addEventListener('DOMContentLoaded', function() {
    if (loadProgress() && answers.length > 0) {
        // عرض خيار استكمال الاختبار
        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'استكمال الاختبار السابق';
        continueBtn.className = 'btn-secondary';
        continueBtn.style.marginTop = '10px';
        continueBtn.addEventListener('click', function() {
            welcomeScreen.classList.remove('active');
            quizScreen.classList.add('active');
            showQuestion();
        });
        
        document.querySelector('.welcome-content').appendChild(continueBtn);
    }
});

