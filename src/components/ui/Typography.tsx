import React, { type ReactNode } from 'react'
import { Text, type TextProps } from 'react-native'

interface TypographyProps extends Omit<TextProps, 'className'> {
  children: ReactNode
  className?: string
}

export function H1({ children, className = '', ...rest }: TypographyProps) {
  return (
    <Text className={`text-3xl font-bold text-text ${className}`} {...rest}>
      {children}
    </Text>
  )
}

export function H2({ children, className = '', ...rest }: TypographyProps) {
  return (
    <Text
      className={`text-xl font-semibold text-text ${className}`}
      {...rest}
    >
      {children}
    </Text>
  )
}

export function Body({ children, className = '', ...rest }: TypographyProps) {
  return (
    <Text className={`text-base text-text ${className}`} {...rest}>
      {children}
    </Text>
  )
}

export function Caption({
  children,
  className = '',
  ...rest
}: TypographyProps) {
  return (
    <Text
      className={`text-sm text-text-secondary ${className}`}
      {...rest}
    >
      {children}
    </Text>
  )
}
