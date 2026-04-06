import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const projects = (await getCollection('projects'))
    .sort((a, b) => a.data.order - b.data.order);

  const site = context.site!.href.replace(/\/$/, '');

  const lines: string[] = [
    '# Jaskirat Randhawa',
    '',
    '> Senior Product Manager at Fastly, managing developer platforms for edge compute. Previously co-founded a climate tech company and built machines that 3D print glass.',
    '',
  ];

  if (posts.length > 0) {
    lines.push('## Blog Posts', '');
    for (const post of posts) {
      lines.push(`- [${post.data.title}](${site}/blog/${post.id}/): ${post.data.description}`);
    }
    lines.push('');
  }

  if (projects.length > 0) {
    lines.push('## Projects', '');
    for (const project of projects) {
      lines.push(`- [${project.data.title}](${site}/projects/${project.id}/): ${project.data.excerpt}`);
    }
    lines.push('');
  }

  lines.push(
    '## Notes & Mentions',
    '',
    'Patents: 3 US patents in TV content recommendation, voice command privacy, and mixed reality (2019–2021).',
    'Publications: 4 works including ACM, MISC Magazine, and Research Gate (2016–2021).',
    'Exhibitions: 9 talks and exhibitions at ACM UIST, Met Museum, NYC Media Lab, and more (2015–2018).',
    'Awards: Verizon Spotlight Award, YouFab finalist, Dean\'s Merit Scholarship, and others (2014–2022).',
    '',
    '## Links',
    '',
    `- [LinkedIn](https://www.linkedin.com/in/jaskiratr/)`,
    `- [GitHub](https://github.com/jaskiratr)`,
    `- [RSS](${site}/rss.xml)`,
    `- [Full content for AI](${site}/llms-full.txt)`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
