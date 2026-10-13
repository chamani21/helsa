# eTabeeb patient journey — timeline, asset manifest and production notes

Format: 1080 × 1920 (9:16), 30 fps (no source video, so no source frame rate to match), 88.0 s, H.264 + AAC.
Built with HyperFrames 0.8.153 (`index.html`). The draft cut was made with the system FFmpeg 6.1.1.

## Story timeline

| Time (s) | Scene | What is on screen | Camera / motion |
|---|---|---|---|
| 0 – 7.4 | Problem and hook | Illustrated fictional patient (older man, white turban, grey beard) at a mud-brick home. Mountains and a long dirt road behind him. He looks at his phone. | 0.8 s fade-in, slow push-in 1.0 → 1.1. Wind and a quiet pad. |
| 6.8 – 20 | Starting the booking | Phone close-up of the eTabeeb WhatsApp chat. Patient: «سلام، له ډاکټر سره مشوره غواړم.» → typing → service: «مهرباني وکړئ خپل نوم ولیکئ.» → patient: «عبدالرحمن» → service: «مننه. ستاسو د مشورې غوښتنه ثبت شوه.» | Phone rises in. Gentle zoom 1.0 → 1.04. Send and receive sounds. |
| 19.8 – 27.8 | Admin review | Admin-side interface view, clearly labelled «اډمین». Name, age, location and fee payment are ticked off. The time is arranged with Dr. Jalaluddin. "The patient is notified in this same WhatsApp chat." | Crossfade. Rows and ticks appear in sequence. |
| 27.6 – 31.4 | Confirmation | Same chat scrolls on: «ستاسو د مشورې وخت تایید شو.» plus a «د مشورې لینک» link card. | Chat scroll, message pops. |
| 31.4 – 35.2 | Pull back | Same patient at home. A small confirmation bubble appears above his phone. | Brief pull-back, slow drift. |
| 35.2 – 47.4 | Joining | Tap on the link opens «د مشورې خونه» in the browser: doctor card, «د خپل انټرنېټ له مخې یو یې وټاکئ», choice of غږیزه / ویډیويي. Audio is chosen, then «ننوځئ». | Tap ripples, screen slide. |
| 46.6 – 64.6 | Speaking with the doctor (key scene) | Dr. Jalaluddin's supplied photo, unmodified, shown as his **profile picture** in an audio-consultation interface. It carries the label «پروفایل انځور». The illustrated patient appears in a small «تاسو» tile. Chips: نښې, پخوانۍ ناروغۍ, کارېدونکي درمل, پخواني راپورونه. | Push-in 1.0 → 1.06. Connect chime. Only the level bars move; the photo itself never animates. |
| 64.6 – 79.4 | Prescription | Back to the same chat: «ستاسو نسخه چمتو ده.» plus an **image** attachment «نسخه · انځور (نمونه)». A tap opens the image viewer with a sample prescription: «نمونه» banner and watermark, no patient data, no medicines or doses. | Hold about 8 s with a slow 1.0 → 1.04 push. |
| 78.8 – 82.6 | Calm review | Same patient, calm, looking at his phone. No claims of recovery. | Soft drift. |
| 82 – 88 | End card | Official eTabeeb logo (full lockup on a white card), Dr. Jalaluddin's photo and name, «په واټساپ پیغام راولېږئ», «دا خدمت د بیړنیو حالاتو لپاره نه دی.» WhatsApp number `+92 310 0006526` (supplied by the user). No URL is shown. | Staggered fade-up. Pad fades out. |

Captions sit in a fixed top band (y 196–about 420 px), clear of the bottom platform controls. The persistent tag «د ښودنې لپاره نمونه · خیالي معلومات» marks every mock-up as an illustrative demonstration.

## Asset manifest

| Asset | Source | Used as | Notes |
|---|---|---|---|
| `assets/doctor/dr-jalaluddin__headshot-white-coat-01.png` | `chamani21/etabeeb` → `apps/web/public/doctors/dr-jalaluddin/`. Same file as Drive `dr-jalaluddin/` (1,887,298 B). | Lobby card, consultation, admin chip, end card | 1254 × 1254 RGB, MD5 `b236d04e1f9e03cbfb0e26febc64a168`. Byte-identical copy. Displayed with `object-fit: cover` in square frames: never stretched, retouched or animated. |
| Patient illustration | Drawn for this video (inline SVG) | Every patient shot and the «تاسو» tile | Fictional person, not based on anyone real. Older, grey beard and white turban, so he is clearly different from Dr. Jalaluddin. |
| Fonts: Noto Naskh Arabic, Noto Sans Arabic, Inter (`assets/fonts/`) | Google Fonts, OFL. Downloaded and embedded locally. | Captions, UI, Latin text | The live eTabeeb site uses the same families (from the repo audit doc). |
| `assets/vendor/gsap.min.js` | npm `gsap@3.14.2` | Animation runtime | Stored locally because the CDN is blocked in this environment. |
| `assets/audio/pad.wav`, `wind.wav`, `pop.wav`, `send.wav`, `tap.wav`, `chime.wav` | Generated with FFmpeg (sine/noise synthesis) | Music bed and SFX | Original, so no licensing issues. |
| `assets/brand/etabeeb-logo-official.png` | Supplied by the user in this session (1254 × 1254, MD5 `a2a792c15700b3c6cd72c76b591b70d0`) | Chat avatar and prescription header (CSS display crop of the emblem only), end card (full lockup) | Byte-identical copy. Never recoloured or redrawn. Its opaque white background is shown on white cards. The end card uses the logo palette (teal `#1aa3a6`, navy `#173f7a`/`#1d5aa0`, gold). |
| Brand colours | `apps/web/tailwind.config.ts` (Stitch tokens): `#0b5a3a`, `#073d28`, `#004128`, gold `#c7a857` / `#d9c58f` | Whole film | |

## Facts verified against the service, and where they came from

- **One WhatsApp identity.** n8n "eTabib - Outbound Sender" sends every patient message (`ASK_PATIENT_NAME`, `PATIENT_ACKNOWLEDGED`, `CONSULTATION_CONFIRMED_PATIENT`, `PRESCRIPTION_READY`, `PRESCRIPTION_IMAGE`…) from a single WhatsApp phone-number ID. The video shows one «eTabeeb» chat throughout. It never shows separate admin or doctor numbers and never shows WhatsApp call buttons.
- **The booking starts by asking for the name** (`ASK_PATIENT_NAME`). The real flow also has an `ASK_PATIENT_PHONE` step, which is omitted for brevity. Admin case review and doctor approval (`ADMIN_NEW_CASE`, `DOCTOR_APPROVAL_REQUEST`) are internal. They appear only in the separate admin view, never as patient messages.
- **Prescription format.** The V1 transport sends the prescription as WhatsApp **text** (`textComplete`) or as an **image** (`PRESCRIPTION_IMAGE`). The workflow states "No PDF yet" and rejects document delivery. So the video shows an **image** attachment, not a PDF.
- **Consultation link and call modes: NOT fully verified.** The repo README describes LiveKit video consultations with a waiting room. The design mock-ups mention audio and video. No V1 source confirms what the patient-facing link opens or which modes it offers. The UI therefore shows both options and the patient picks audio. **Confirm before publishing.** If only one mode exists, remove the other button (`#modeVideo`/`#modeAudio`) and adjust VO4.
- **Doctor's name.** «ډاکټر جلال الدین» comes from the repo how-it-works page, and "Dr. Jalaluddin" from the live Doctors sheet. No qualifications or specialty are shown because none was supplied as approved copy.
- All chat data is illustrative: patient «عبدالرحمن», age ۵۲, Kandahar, and the message times are fictional.

## Missing or unverified assets

1. ~~Official eTabeeb logo~~: **supplied and in use.** The logo spells the brand «ای طبیب» (with a space), and the captions now use that exact form.
2. ~~eTabeeb WhatsApp number~~: **supplied by the user: 00 92 310 0006526.** It is shown on the end card as `+92 310 0006526` (international format, left to right). The chat mock-up still shows only the account name «eTabeeb», as WhatsApp does for a saved business contact.
3. **Pashto narration recording.** See `NARRATION.md`.
4. **Licensed or authorised patient footage.** None exists, so the patient is an illustration, as the brief allows.
5. **Second supplied photo** (Dr. Jalaluddin outdoors, casual clothes, with a training-course badge): not used. He is the doctor, so he cannot stand in for the patient. The clinical white-coat headshot already covers the consultation and end card. Tell me if you want it used somewhere specific.
6. **Authorised doctor video.** None exists in the repos. The Drive folder "Dr jalal uddin" has two `.mov` health-talk clips ("congo virus") that are not consultation footage, so I didn't use them. The film uses the photograph, presented as a profile picture.

## Output verification (final render, measured with ffprobe/ffmpeg)

| File | Check | Result |
|---|---|---|
| `renders/etabeeb-patient-journey-ps-9x16.mp4` | Video | H.264 High, 1080 × 1920, yuv420p, 30/1 fps CFR, 2640 frames |
| | Audio | AAC-LC, 48 kHz stereo, 192 kb/s |
| | Duration / size | 88.000 s / 19.2 MB (about 1.75 Mb/s) |
| | Loudness | −29.8 LUFS integrated, LRA 2.4 LU. Music and SFX only, deliberately low so the Pashto voiceover can sit around −16 LUFS on top. |
| | Full decode | Clean, with no errors |
| `renders/etabeeb-preview.mp4` | Representative preview cut from the final | 35.5 s: booking 7–20 s, doctor connection 45.5–58 s, prescription 66–76 s |
| `renders/etabeeb-patient-journey-thumbnail.jpg` | 1080 × 1920 still at 59.0 s | Consultation scene: Dr. Jalaluddin's photo, the patient tile and all four chips |

`npx hyperframes check`: passed, 0 errors. The remaining warnings are crossfade overlaps, the deliberately cropped phone, and suggestions to split into sub-compositions.
