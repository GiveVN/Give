import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import CreateProjectForm from './CreateProjectForm'

export default async function CreateProjectPage() {
  // TODO: Re-enable authentication
  // const session = await getAuth()
  
  // if (!session?.user) {
  //   redirect('/auth/signin?callbackUrl=/projects/create')
  // }

  return <CreateProjectForm />
} 