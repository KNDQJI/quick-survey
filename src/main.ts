import { GM_setValue, GM_getValue } from '$'

var heading = document.getElementsByClassName('surveyHeading')[0];
var title = (heading.getElementsByClassName('surveyTitle')[0] as HTMLElement).innerText;
type QType = { started: boolean, type: number, time: number };
var started = GM_getValue<QType>('questionnaire_started');
if (title.includes('SZTE') || title.includes('OMHV')) {
    var types = [
        { text: 'Jó', value: 5 },
        { text: 'Közepes', value: 3 },
        { text: 'Rossz', value: 1 }
    ];
    for (const [_i, { text, value }] of types.entries()) {
        var btn = document.createElement('button');
        btn.innerHTML = text + ' értékelés';
        btn.onclick = (e) => check(e, value);
        heading.appendChild(btn);
    }
}
console.log({ started });
if (started && started.started) {
    check(null, started.type);
}

const $$ = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector));

function check(e: MouseEvent | null, type: number) {
    if (e) {
        e.preventDefault();
    }

    GM_setValue('questionnaire_started', { started: true, type: type, time: Date.now() });

    var nextBtn = document.getElementById("btnNext");

    var end = (document.querySelector('.innerQuestionTitle') as HTMLElement)?.innerText.includes('Köszönjük');
    [...$$('label')].filter(e => e.innerText.includes(started.type.toString())).forEach(e => e.click());
    if (end) {
        GM_setValue('questionnaire_started', { started: false, type: type, time: Date.now() });
        window.close();
    }
    nextBtn?.click();
    return false;
}