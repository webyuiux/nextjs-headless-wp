import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    const type = body?.type as string | undefined
    const slug = body?.slug as string | undefined

    if (type === 'post' && slug) {
      revalidatePath('/blog/' + slug)
      revalidatePath('/blog')
    } else if (type === 'page' && slug) {
      revalidatePath('/' + slug)
      revalidatePath('/')
    } else {
      // Revalidate all common paths
      revalidatePath('/')
      revalidatePath('/blog')
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}