"""Enrich short meta descriptions by appending service details."""
import os
import re

root = r'c:\Users\lok20\Desktop\NovaHealth'

# Map: file path -> new enriched description
enrichments = {
    'physiotherapy/physiotherapy-parkinson-case.html':
        '柏金遜症上門物理治療個案分享，展示真實康復故事與治療成效。了解專業物理治療師如何透過個人化訓練計劃，幫助柏金遜症患者改善活動能力。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-parkinson-caregiver.html':
        '柏金遜症照顧者實用指南及家居改裝建議。了解如何協助患者日常生活、預防跌倒、減輕照顧者壓力，由專業物理治療師提供實用護理技巧。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-parkinson-advantage.html':
        '柏金遜症上門物理治療的優勢分析：在熟悉環境訓練更有效、一對一專注治療、家居安全評估。助您選擇最適合的康復方案。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-stroke-caregiver.html':
        '中風照顧者家居改裝及護理指南。學習正確扶抱技巧、打造防跌無障礙環境、了解常見併發症預防。專業物理治療師提供實用建議。免費諮詢：5228 2205。',

    'home-care-worker/hcw-exercise.html':
        '香港專業復康運動支援服務。經培訓護理員提供伸展運動、按摩、肌力訓練等一對一指導，配合物理治療師制定的訓練計劃。免費諮詢：5473 6204。',

    'home-care-worker/hcw-nursing.html':
        '香港專業護理支援服務。經培訓護理員提供日常護理、個人衛生照顧、生命體徵監測等服務，由註冊護士督導確保服務質素。免費諮詢：5473 6204。',

    'nursing/post-operation.html':
        '香港上門術後居家護理服務。註冊護士提供專業傷口護理、造口護理、導管照護及復康支援，讓患者安心在家康復。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-copd.html':
        '慢性阻塞性肺病(COPD)上門物理治療。專業肺復康訓練改善呼吸功能、提升運動耐力，由註冊物理治療師提供個人化訓練計劃。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-post-operation-distalradius.html':
        '橈骨遠端骨折術後上門物理治療服務。專業康復訓練恢復手腕功能、握力和活動範圍，由註冊物理治療師制定個人化復康計劃。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-post-operation-knee.html':
        '全膝關節置換術後上門物理治療服務。專業康復訓練恢復膝關節活動範圍和肌力，助您重拾行動自如。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-stroke-case.html':
        '上門物理治療真實中風康復案例分享。展示專業到戶治療如何幫助中風患者恢復肢體功能、改善步態和日常活動能力。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-stroke-severe.html':
        '重度中風下肢物理治療介入方法。適用於只能輔助坐或臥的患者，包括被動關節活動、坐姿平衡訓練及站立訓練。免費諮詢：5228 2205。',

    'home-care-worker/hcw-speech.html':
        '香港專業言語訓練支援服務。經培訓護理員提供口肌訓練、發音練習、PECS溝通訓練等，配合言語治療師制定的訓練計劃。免費諮詢：5473 6204。',

    'occupational-speech-therapy/ot-home-modification.html':
        '上門家居改裝及輔助器具評估建議。職業治療師親身到訪評估家居環境，提供專業改裝方案，提升家居安全及患者獨立生活能力。免費諮詢：5228 2205。',

    'occupational-speech-therapy/ot-parkinson.html':
        '柏金遜症上門職業治療服務。註冊職業治療師協助柏金遜症患者維持日常功能、訓練精細動作、改善認知能力和生活質素。免費諮詢：5228 2205。',

    'occupational-speech-therapy/ot-stroke.html':
        '中風康復上門職業治療服務。註冊職業治療師協助中風患者恢復日常生活功能，包括穿衣、進食、如廁等自理訓練。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-dementia.html':
        '認知障礙症上門物理治療服務。專業運動訓練延緩身體退化，改善平衡力、肌力和日常活動能力，提升認知障礙症患者生活質素。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-muscle-pain.html':
        '肌肉痛症上門物理治療服務。專業評估及治療肩頸痛、腰背痛、關節痛、坐骨神經痛等常見痛症，由註冊物理治療師提供到戶治療。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-post-operation-spine.html':
        '胸腰椎壓迫性骨折術後上門物理治療服務。專業康復訓練恢復脊椎功能，包括核心肌群強化、姿勢矯正和漸進式活動訓練。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-regular-exercise.html':
        '常規運動上門物理治療服務。專業指導長者及慢性病患者進行安全有效的恆常運動計劃，維持體能、預防退化和跌倒。免費諮詢：5228 2205。',

    'physiotherapy/physiotherapy-sarcopenia.html':
        '肌少症上門物理治療服務。專業阻力訓練增強肌力、預防跌倒，由註冊物理治療師為長者制定個人化運動處方，改善活動能力。免費諮詢：5228 2205。',
}

count = 0
for rel_path, new_desc in enrichments.items():
    fpath = os.path.join(root, rel_path)
    if not os.path.exists(fpath):
        print(f'File not found: {fpath}')
        continue

    with open(fpath, 'r', encoding='utf-8-sig') as f:
        html = f.read()

    # Replace name="description" content (handles both single and multi-line)
    new_html = re.sub(
        r'(name="description"[\s\S]*?content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        html, count=1
    )

    # Also replace og:description
    new_html = re.sub(
        r'(og:description"[\s\S]*?content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        new_html, count=1
    )

    # Also replace twitter:description
    new_html = re.sub(
        r'(twitter:description" content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        new_html, count=1
    )

    if new_html != html:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_html)
        count += 1

print(f'Enriched {count} meta descriptions')
