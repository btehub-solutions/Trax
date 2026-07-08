import { redirect } from 'next/navigation'

/** Policy lives under Ecosystem — keep old URLs working without a nav item. */
export default function PolicyPage() {
  redirect('/ecosystem')
}
