import { prisma } from '@/lib/prisma'; import { cityInput } from '@/lib/validation';
export async function GET(){return Response.json(await prisma.city.findMany({orderBy:{name:'asc'}}));}
export async function POST(request:Request){const parsed=cityInput.safeParse(await request.json());if(!parsed.success)return Response.json({error:'INVALID_INPUT',details:parsed.error.flatten()},{status:400});try{const city=await prisma.city.create({data:parsed.data});return Response.json(city,{status:201});}catch{return Response.json({error:'CITY_ALREADY_EXISTS'},{status:409});}}
