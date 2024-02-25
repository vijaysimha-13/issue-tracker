import { Button } from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <Button><Link href={"./issues/new"}>Create Issue</Link></Button>
    </div>
  )
}

export default page