import { Article } from '../types/blog';
import { encodeImageBase64 } from '../utils/encodeImageBase64';
import { formatDate } from '../utils/formatDate';
import { take } from '../utils/take';

const POSITIONS = [
  { x: 0, y: 0 },
  { x: 350, y: 0 },
  { x: 0, y: 320 },
  { x: 350, y: 320 },
];

export async function generateSvgContent(articles: Article[]) {
  const articleCards = await Promise.all(articles.map((post, index) => createArticleCard(post, POSITIONS[index])));

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="750" height="750">
  <defs>
    <clipPath id="imgClip" width="300" height="180" rx="12" ry="12">
      <rect width="300" height="180" rx="12" ry="12"/>
    </clipPath>
    <style>
      .card { font-family: 'Pretendard', sans-serif; }
      .header { font-size: 24px; font-weight: 600; fill: #111827; }
      .title { font-size: 16px; font-weight: 600; fill: #111827; }
      .desc { font-size: 14px; font-weight: 300; fill: #6b7280; }
      .meta { font-size: 12px; font-weight: 300; fill: #9ca3af; }
      a { text-decoration: none; cursor: pointer; }
      image { transition: transform 0.3s ease-in-out; }
      .card:hover image { transform: scale(1.025); }
    </style>
  </defs>

  <!-- 헤더 -->
  <text x="30" y="50" class="header">📝 최신 블로그 글</text>

<g class="card-container" transform="translate(30, 80)">
  ${articleCards.join('')}
  </g>
</svg>`;
}

export async function createArticleCard(article: Article, pos: { x: number; y: number }) {
  const url = `https://until.blog/@${article.blog.username}/${article.urlSlug}`;

  return `<g class="card" transform="translate(${pos.x}, ${pos.y})">
    <!-- 이미지 영역 (border와 둥근 모서리 적용) -->
    ${await getImageOrFallback(article, url)}
    <!-- 제목 -->
    <a href="${url}">
      <text x="0" y="210" class="title">${take(article.title, 25)}</text>
    </a>

    <!-- 설명: 두 줄로 표현 -->
    <a href="${url}">
      <text x="0" y="235" class="desc">
        <tspan x="0" dy="0">${take(article.summary, 30)}</tspan>
      </text>
    </a>

    <!-- 메타 정보 (작성일, 읽는 시간) -->
    <g transform="translate(0,280)">
      <text x="0" y="0" class="meta">${formatDate(article.createdAt)}</text>
      <text x="80" y="0" class="meta">${article.minRead} min read</text>
    </g>
  </g>`;
}

async function getImageOrFallback(article: Article, url: string) {
  if (article.thumbnailUrl !== null) {
    return `<a href="${url}" clip-path="url(#imgClip)">
      <rect x="0" y="0" width="300" height="180" rx="12" ry="12" fill="none" stroke="#d1d5db"/>
      <image x="0" y="0" width="300" height="180" href="data:image/png;base64,${await encodeImageBase64(article.thumbnailUrl)}" preserveAspectRatio="xMidYMid slice"/>
    </a>`;
  }

  // fallback
  return `<a href="${url}" clip-path="url(#imgClip)">
          <rect width="300" height="180" rx="12" ry="12" fill="#262626" stroke="#d1d5db"/>
          <svg stroke="#52525c" fill="none" stroke-width="0" x="144" y="84" viewBox="0 0 24 24" class="text-label-assertive" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.01562 6.98193C7.46334 6.98193 7.01562 7.43285 7.01562 7.98513C7.01562 8.53742 7.46334 8.98833 8.01563 8.98833H15.9659C16.5182 8.98833 16.9659 8.53742 16.9659 7.98513C16.9659 7.43285 16.5182 6.98193 15.9659 6.98193H8.01562Z" fill="#52525c"></path><path d="M7.01562 12C7.01562 11.4477 7.46334 10.9968 8.01562 10.9968H15.9659C16.5182 10.9968 16.9659 11.4477 16.9659 12C16.9659 12.5523 16.5182 13.0032 15.9659 13.0032H8.01563C7.46334 13.0032 7.01562 12.5523 7.01562 12Z" fill="#52525c"></path><path d="M8.0249 15.0122C7.47262 15.0122 7.0249 15.4631 7.0249 16.0154C7.0249 16.5677 7.47262 17.0186 8.0249 17.0186H15.9752C16.5275 17.0186 16.9752 16.5677 16.9752 16.0154C16.9752 15.4631 16.5275 15.0122 15.9752 15.0122H8.0249Z" fill="#52525c"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z" fill="#52525c"></path></svg>
        </a>`;
}
