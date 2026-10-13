# eTabeeb patient journey — Pashto narration script and voiceover slots

**Status:** Needs a human Pashto recording. The installed HyperFrames TTS (Kokoro‑82M) has no Pashto voice, so the render carries **no narration**. The music bed and SFX are mixed low (about −30 LUFS integrated) to leave room for the voice. The on-screen captions show the same script word for word.

**Voice brief:** One adult narrator, natural everyday Pakistani/Afghan Pashto (Kandahar/Chaman register). Calm, warm and clear. Not salesy. Do **not** use or clone Dr. Jalaluddin's voice. Record each line as a separate take, mono, 48 kHz, with about 0.3 s of room tone at each end.

**Pace:** About 2.2–2.6 words/s. Each slot below has headroom. If a take runs long, move the next caption's `data-start` rather than speeding up the voice.

| # | Slot (s) | Max length | Pashto line (caption text) | Meaning |
|---|---|---|---|---|
| VO1 | 0.6 – 6.6 | 6.0 s | ډاکټر ته تګ درته ګران دی؟ له ای طبیب سره له خپل ځایه طبي مشوره ترلاسه کولی شئ. | Is travelling to a doctor difficult? With eTabeeb, you can get medical advice from where you are. |
| VO2 | 7.8 – 19.4 | 11.6 s | په واټساپ کې ای طبیب ته پیغام واستوئ او خپل نوم ولیکئ. ستاسو د مشورې غوښتنه ثبتېږي. | Message eTabeeb on WhatsApp and write your name. Your consultation request is registered. |
| VO3 | 20.4 – 33.6 | 13.2 s | اډمین ستاسو معلومات او د فیس ورکړه تاییدوي. بیا د مشورې وخت له ډاکټر سره برابرېږي او تاسو ته په همدې واټساپ کې خبر درکول کېږي. | The admin verifies your information and fee payment. The consultation time is then arranged with the doctor, and you are told in this same WhatsApp chat. |
| VO4 | 35.4 – 47.4 | 12.0 s | په ټاکلي وخت د مشورې لینک خلاص کړئ. له ډاکټر سره ویډیويي مشوره وکړئ؛ که انټرنېټ کمزوری وي، غږیزه مشوره هم کېدای شي. | At the set time, open the consultation link. Have a video consultation with the doctor; if your internet is weak, an audio consultation is also possible. |
| VO5 | 49.2 – 63.3 | 14.1 s | خپلې نښې، پخوانۍ ناروغۍ او کارېدونکي درمل له ډاکټر سره شریک کړئ. که پخواني راپورونه لرئ، هغه هم ورولېږئ. | Share your symptoms, past illnesses and current medicines with the doctor. If you have previous reports, send them too. |
| VO6 | 66.0 – 78.6 | 12.6 s | له مشورې وروسته، ډاکټر نسخه او لازمې لارښوونې چمتو کوي او په همدې واټساپ کې یې ترلاسه کوئ. | After the consultation, the doctor prepares the prescription and necessary guidance, and you receive them in this same WhatsApp chat. |
| VO7 | 80.2 – 87.6 | 7.4 s | د مشورې لپاره ای طبیب ته په واټساپ کې پیغام واستوئ. دا خدمت د بیړنیو حالاتو لپاره نه دی. | For a consultation, message eTabeeb on WhatsApp. This service is not for emergencies. |

## Language review (changes from the supplied script)

- **VO1:** «ګران دي» → **«ګران دی»**. «تګ» is masculine singular, so the standard copula is «دی». Please have a native reviewer confirm. If your house style writes «دي», change caption `#c1` back.
- **VO7:** Ends with «نه دی» (masc. sg., agreeing with «خدمت»). This matches the supplied text.
- **VO4** was reworded to put video first, since video is the main mode and audio is the fallback (confirmed by you).
- All other lines are unchanged. No medical promises, response times, fees or outcomes were added.
- The brand is written **ای طبیب**, exactly as on the official logo, in both captions and narration.

## Adding the recording

Record all seven lines in order, in **one file**, with about **2 seconds of silence** between lines. Send it as WAV or M4A (a phone recording is fine). I will split it at the pauses, place each line in its slot, carve the music under the voice, re-check and render again.
