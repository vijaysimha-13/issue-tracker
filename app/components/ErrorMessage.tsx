import { Text } from '@radix-ui/themes'
import React from 'react'
import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    return (
        <Text color='red' as='div'>{children}</Text>
    )
}

export default ErrorMessage