import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { convertMarkdownToNotionBlocks } from '@/app/lib/functions/md_to_ntn';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    if (!content) {
      throw new Error('Content is required');
    }

    const page_id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
    if (!page_id) {
      throw new Error('Notion page ID is missing');
    }

    // Convert markdown content to Notion blocks
    const notionBlocks = convertMarkdownToNotionBlocks(content);

    // Append blocks to the Notion page
    await notion.blocks.children.append({
      block_id: page_id,
      children: notionBlocks
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in Notion API:', error);
    return NextResponse.json({ error: 'Failed to export to Notion' }, { status: 500 });
  }
}
