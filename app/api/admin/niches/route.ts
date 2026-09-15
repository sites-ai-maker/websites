import { prisma } from '@/lib/prisma'; import { nicheInput } from '@/lib/validation';
export async function GET(){return Response.json(await prisma.niche.findMany({orderBy:[{priority:'desc'},{name:'asc'}]}));}
export async function POST(request:Request){const parsed=nicheInput.safeParse(await request.json());if(!parsed.success)return Response.json({error:'INVALID_INPUT',details:parsed.error.flatten()},{status:400});try{return Response.json(await prisma.niche.create({data:parsed.data}),{status:201});}catch{return Response.json({error:'NICHE_ALREADY_EXISTS'},{status:409});}}
