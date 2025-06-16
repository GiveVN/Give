import clsx from 'clsx'
import { Link } from './link'
import { cn } from '@/lib/utils'

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(className, 'text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400')}
    />
  )
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white'
      )}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={clsx(className, 'font-medium text-zinc-950 dark:text-white')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'rounded-sm border border-zinc-950/10 bg-zinc-950/2.5 px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white'
      )}
    />
  )
}

export function Subheading({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={cn(
        'text-sm/6 font-medium text-blue-600',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function Heading({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      className={cn(
        'text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function Lead({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn(
        'text-lg leading-8 text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}
