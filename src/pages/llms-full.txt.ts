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
      lines.push(`### ${post.data.title}`, '');
      lines.push(`*${post.data.date.toISOString().split('T')[0]}* — ${post.data.description}`, '');
      if (post.body) {
        lines.push(post.body, '');
      }
      lines.push('---', '');
    }
  }

  if (projects.length > 0) {
    lines.push('## Projects', '');
    for (const project of projects) {
      lines.push(`### ${project.data.title}`, '');
      lines.push(`*${project.data.role} · ${project.data.date}*`, '');
      lines.push(`${project.data.excerpt}`, '');
      if (project.body) {
        lines.push('', project.body, '');
      }
      lines.push('---', '');
    }
  }

  lines.push(
    '## Notes & Mentions',
    '',
    '**Patents**',
    '',
    '- Systems and Methods for Recommending Linear TV Content. US 10986408 · Issued Apr 20, 2021',
    '- System and Method of Retrieving and Conveying Sensitive Information When Using Voice Command Devices. US 10733278 · Issued Aug 4, 2020',
    '- Methods and Systems for Virtualizing a Target Object Within a Mixed Reality Presentation. US 10380803 · Issued Aug 13, 2019',
    '',
    '**Publications**',
    '',
    '- Co-authored "Visualizing Urban Social-Ecological-Technological Systems" in Resilient Urban Futures, 2021',
    '- "Solving Problems with Puzzles" MISC Magazine, 2017',
    '- "Shape Changing Materials: Exploring Applications of Smart Memory Alloy with Fabric and 3D Visualizations", Research Gate, 2016',
    '- "Stickie: Mobile Device Supported Spatial Collaborations", ACM Digital Library, 2016',
    '',
    '**Exhibitions & Talks**',
    '',
    '- Hosted Data-Visualization Workshop, Modelling Complex Urban Environments, WICI, Ontario, 2018',
    '- Speaker at URExSRN Annual All Hands Meeting, Phoenix, 2018',
    '- Speaker, Data-Visualization Seminar at "Resilient Cities, Livable Futures," The New School, New York, 2017',
    '- Exhibited at ACM User Interface Software Technology Conference (UIST), Tokyo, 2016',
    '- Exhibited at ACM Spatial User Interfaces Conference (SUI), Tokyo, 2016',
    '- Exhibited at FabCafe/Loftwork for YouFab Awards, Tokyo, 2016',
    '- Speaker at NYC Media Lab Annual Summit, New York, 2016',
    '- Exhibited at Metropolitan Museum of Art, Media Lab Expo, New York, 2015',
    '- Exhibited at Storefront Gallery for Art & Architecture, New York, 2015',
    '',
    '**Awards**',
    '',
    '- Verizon Spotlight Award for performance excellence, 2019',
    '- Three Verizon Patent Awards for innovative digital experiences, 2018-2022',
    '- Finalist, YouFab Global Creative Awards, Tokyo, 2016',
    '- Verizon Connected Futures Grant, 2015-16',
    '- Departmental Honors, AMT, Parsons School of Design, 2016',
    '- The New Challenge Award for social innovation, The New School, 2016',
    '- NYC Media Lab Combine Grant, 2015',
    '- Dean\'s Merit Scholarship for MFA in Design & Technology, The New School, 2014',
    '',
    '## Links',
    '',
    `- [LinkedIn](https://www.linkedin.com/in/jaskiratr/)`,
    `- [GitHub](https://github.com/jaskiratr)`,
    `- [RSS](${site}/rss.xml)`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
