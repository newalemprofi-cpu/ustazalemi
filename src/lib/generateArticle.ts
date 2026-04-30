// Server-only — calls OpenAI API. Do not import from client components.
import { buildArticleContent } from "./submissions";

type ArticleFields = {
  title: string;
  fullName: string;
  workplace: string;
  position: string;
  subject: string;
  journalName: string;
  language: string;
  textContent?: string | null;
};

function buildPrompt(fields: ArticleFields): string {
  const { title, fullName, workplace, subject, language } = fields;

  if (language === "russian") {
    return `Напиши научную статью на тему: «${title}».

Статья должна иметь следующую структуру:
- Аннотация
- Ключевые слова
- Введение
- Основная часть
- Заключение

Требования:
- Объём статьи 3000–5000 слов
- Предназначена для учеников и учителей
- Адаптирована к казахстанской системе образования
- Полный текст должен быть единым (заголовки разделов не писать, но структура должна соблюдаться)
- Написана в научном стиле
- В конце привести список из 5 использованных источников

Дополнительная информация:
Автор: ${fullName}
Место работы: ${workplace}
Предмет: ${subject}`;
  }

  // Kazakh (default)
  return `Напиши научную статью на тему: «${title}».

Мақала келесі құрылымда болуы керек:
- Аннотация
- Кілт сөздер
- Кіріспе
- Негізгі бөлім
- Қорытынды

Талаптар:
- Мақала көлемі 3000–5000 сөз
- Оқушыларға және мұғалімдерге арналған
- Қазақстан білім беру жүйесіне бейімделген
- Толық мәтін біртұтас болсын (бөлім атауларын жазбай, бірақ структура сақталсын)
- Ғылыми стильде жазылсын
- Соңында 5 пайдаланылған әдебиеттер тізімі берілсін

Қосымша ақпарат:
Автор: ${fullName}
Жұмыс орны: ${workplace}
Пән: ${subject}`;
}

export async function generateArticleWithAI(fields: ArticleFields): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildArticleContent(fields);
  }

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey });

    const prompt = buildPrompt(fields);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (content) return content;

    return buildArticleContent(fields);
  } catch (err) {
    console.error("OpenAI generation failed, falling back to template:", err);
    return buildArticleContent(fields);
  }
}
